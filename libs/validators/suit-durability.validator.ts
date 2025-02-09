import { Injectable } from '@nestjs/common'
import { SuitType } from '@prisma/client'
import {
  CompleteSuitValidation,
  ValidationResult
} from 'libs/interfaces/suit-validation.interface'

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
export class SuitDurabilityValidator implements CompleteSuitValidation {
  public isValidPowerSuit(durability: number): boolean {
    return durability >= 70
  }

  public getPowerSuitMessage(durability: number): string {
    return this.isValidPowerSuit(durability)
      ? 'Power suit passed validation'
      : `Power suits must have durability of at least 70 (current: ${durability})`
  }

  public isValidStealthSuit(durability: number): boolean {
    return durability >= 50
  }

  public getStealthSuitMessage(durability: number): string {
    return this.isValidStealthSuit(durability)
      ? 'Stealth suit passed validation'
      : `Stealth suits must have durability of at least 50 (current: ${durability})`
  }

  public isValidConcealmentSuit(durability: number): boolean {
    const lastDigit = durability % 10
    return lastDigit !== 3 && lastDigit !== 7
  }

  public getConcealmentSuitMessage(durability: number): string {
    return this.isValidConcealmentSuit(durability)
      ? 'Concealment suit passed validation'
      : `Concealment suits must have durability that doesn't end in 3 or 7 (current: ${durability})`
  }

  /**
   * Validates durability based on suit type
   * @param {SuitType} type - The type of the suit
   * @param {number} durability - The durability value
   * @returns {ValidationResult} The validation result
   * @throws {Error} Invalid suit type
   */
  public validateDurability(
    type: SuitType,
    durability: number
  ): ValidationResult {
    switch (type) {
      case SuitType.POWER:
        return {
          isValid: this.isValidPowerSuit(durability),
          message: this.getPowerSuitMessage(durability),
          currentDurability: durability
        }
      case SuitType.STEALTH:
        return {
          isValid: this.isValidStealthSuit(durability),
          message: this.getStealthSuitMessage(durability),
          currentDurability: durability
        }
      case SuitType.CONCEALMENT:
        return {
          isValid: this.isValidConcealmentSuit(durability),
          message: this.getConcealmentSuitMessage(durability),
          currentDurability: durability
        }
      default:
        throw new Error('Invalid suit type')
    }
  }
}
