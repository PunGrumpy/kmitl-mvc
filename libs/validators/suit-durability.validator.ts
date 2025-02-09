import { Injectable } from '@nestjs/common'
import { SuitType } from '@prisma/client'

/**
 * Validation result for suit durability
 */
export interface ValidationResult {
  isValid: boolean
  message: string
  currentDurability: number
}

/**
 * Suit durability validator
 * Validates durability based on suit type
 * - Power suits must have durability of at least 70
 * - Stealth suits must have durability of at least 50
 * - Concealment suits must have durability that doesn't end in 3 or 7
 * @returns {ValidationResult} The validation result
 * @throws {Error} Invalid suit type
 */
@Injectable()
export class SuitDurabilityValidator {
  validateDurability(type: SuitType, durability: number): ValidationResult {
    switch (type) {
      case SuitType.POWER:
        return this.validatePowerSuit(durability)
      case SuitType.STEALTH:
        return this.validateStealthSuit(durability)
      case SuitType.CONCEALMENT:
        return this.validateConcealmentSuit(durability)
      default:
        throw new Error('Invalid suit type')
    }
  }

  private validatePowerSuit(durability: number): ValidationResult {
    const isValid = durability >= 70
    return {
      isValid,
      message: isValid
        ? 'Power suit passed validation'
        : `Power suit must have a durability of at least 70 (current: ${durability})`,
      currentDurability: durability
    }
  }

  private validateStealthSuit(durability: number): ValidationResult {
    const isValid = durability >= 50
    return {
      isValid,
      message: isValid
        ? 'Stealth suit passed validation'
        : `Stealth suit must have a durability of at least 50 (current: ${durability})`,
      currentDurability: durability
    }
  }

  private validateConcealmentSuit(durability: number): ValidationResult {
    const lastDigit = durability % 10
    const isValid = lastDigit !== 3 && lastDigit !== 7
    return {
      isValid,
      message: isValid
        ? 'Concealment suit passed validation'
        : `Concealment suit must have a durability that doesn't end in 3 or 7 (current: ${durability})`,
      currentDurability: durability
    }
  }
}
