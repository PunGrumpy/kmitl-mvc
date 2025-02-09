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
 * Suit durability validation interface
 */
export interface SuitValidation {
  validateDurability(type: SuitType, durability: number): ValidationResult
}

/**
 * Power suit validation interface
 * - Power suits must have durability of at least 70
 */
export interface PowerSuitValidation {
  isValidPowerSuit(durability: number): boolean
  getPowerSuitMessage(durability: number): string
}

/**
 * Stealth suit validation interface
 * - Stealth suits must have durability of at least 50
 */
export interface StealthSuitValidation {
  isValidStealthSuit(durability: number): boolean
  getStealthSuitMessage(durability: number): string
}

/**
 * Concealment suit validation interface
 * - Concealment suits must have durability that doesn't end in 3 or 7
 */
export interface ConcealmentSuitValidation {
  isValidConcealmentSuit(durability: number): boolean
  getConcealmentSuitMessage(durability: number): string
}

/**
 * Complete suit validation interface
 */
export interface CompleteSuitValidation
  extends SuitValidation,
    PowerSuitValidation,
    StealthSuitValidation,
    ConcealmentSuitValidation {}
