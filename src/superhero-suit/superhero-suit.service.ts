import { BadRequestException, Injectable } from '@nestjs/common'
import { SuitType, SuperheroSuit } from '@prisma/client'
import { CatchPrismaError } from 'libs/decorators/catch-prisma.decorator'
import { PrismaService } from 'libs/prisma/prisma.service'

import {
  CreateSuitDto,
  SuitStatsDto,
  SuitValidationResult
} from './superhero-suit.dto'

@Injectable()
export class SuperheroSuitService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Validates suit durability based on type-specific rules
   * Returns validation result instead of throwing error for validation checks
   */
  private validateSuitDurability(
    type: SuitType,
    durability: number
  ): SuitValidationResult {
    const result: SuitValidationResult = {
      isValid: true,
      message: 'Suit meets durability requirements',
      currentDurability: durability
    }

    switch (type) {
      case SuitType.POWER:
        if (durability < 70) {
          result.isValid = false
          result.message = `Power suit durability must be at least 70 (current: ${durability})`
        }
        break
      case SuitType.STEALTH:
        if (durability < 50) {
          result.isValid = false
          result.message = `Stealth suit durability must be at least 50 (current: ${durability})`
        }
        break
      case SuitType.CONCEALMENT:
        if (durability % 10 === 3 || durability % 10 === 7) {
          result.isValid = false
          result.message = `Concealment suit durability cannot end in 3 or 7 (current: ${durability})`
        }
        break
    }

    return result
  }

  /**
   * Finds all superhero suits
   * @returns Promise<SuperheroSuit[]> Array of all suits ordered by code
   */
  @CatchPrismaError()
  async findAll(): Promise<SuperheroSuit[]> {
    return this.prisma.superheroSuit.findMany({
      orderBy: { id: 'asc' }
    })
  }

  /**
   * Finds a suit by code
   */
  @CatchPrismaError({
    notFoundMessage: 'Suit not found'
  })
  async findOne(code: string): Promise<SuperheroSuit> {
    return this.prisma.superheroSuit.findUniqueOrThrow({
      where: { code }
    })
  }

  /**
   * Finds a suit by code and checks its durability status
   */
  @CatchPrismaError({
    notFoundMessage: 'Suit not found'
  })
  async checkSuitStatus(code: string): Promise<{
    suit: SuperheroSuit
    validation: SuitValidationResult
  }> {
    const suit = await this.prisma.superheroSuit.findUniqueOrThrow({
      where: { code }
    })

    const validation = this.validateSuitDurability(suit.type, suit.durability)

    return { suit, validation }
  }

  /**
   * Creates a new superhero suit with validation
   */
  @CatchPrismaError()
  async createSuit(data: CreateSuitDto): Promise<SuperheroSuit> {
    const validation = this.validateSuitDurability(data.type, data.durability)
    if (!validation.isValid) {
      throw new BadRequestException(validation.message)
    }
    return this.prisma.superheroSuit.create({ data })
  }

  /**
   * Repairs a suit by increasing its durability
   */
  @CatchPrismaError()
  async repairSuit(code: string): Promise<{
    suit: SuperheroSuit
    validation: SuitValidationResult
    wasRepaired: boolean
  }> {
    const { suit, validation: initialValidation } =
      await this.checkSuitStatus(code)

    // Only repair if validation failed and durability < 100
    if (!initialValidation.isValid && suit.durability < 100) {
      const newDurability = Math.min(suit.durability + 25, 100)
      const updatedSuit = await this.prisma.superheroSuit.update({
        where: { code },
        data: {
          durability: newDurability,
          repairCount: { increment: 1 }
        }
      })

      const newValidation = this.validateSuitDurability(
        updatedSuit.type,
        updatedSuit.durability
      )
      return {
        suit: updatedSuit,
        validation: newValidation,
        wasRepaired: true
      }
    }

    return {
      suit,
      validation: initialValidation,
      wasRepaired: false
    }
  }

  /**
   * Gets repair statistics for all suit types
   */
  @CatchPrismaError()
  async getRepairStats(): Promise<SuitStatsDto> {
    const stats = await this.prisma.superheroSuit.groupBy({
      by: ['type'],
      _sum: {
        repairCount: true
      }
    })

    return {
      powerSuitsRepaired:
        stats.find(s => s.type === SuitType.POWER)?._sum.repairCount ?? 0,
      stealthSuitsRepaired:
        stats.find(s => s.type === SuitType.STEALTH)?._sum.repairCount ?? 0,
      concealmentSuitsRepaired:
        stats.find(s => s.type === SuitType.CONCEALMENT)?._sum.repairCount ?? 0
    }
  }
}
