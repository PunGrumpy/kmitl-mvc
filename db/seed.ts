import { PrismaClient, SuitType } from '@prisma/client'

const prisma = new PrismaClient()
const usedCodes = new Set<string>()

/**
 * Generate a unique 6-digit suit code where the first digit is not 0.
 * @returns {string} A unique 6-digit code.
 */
function generateSuitCode(): string {
  let code: string
  do {
    // Generate the first digit (1-9)
    const firstDigit = Math.floor(Math.random() * 9) + 1
    // Generate the remaining 5 digits (0-9)
    const remainingDigits = Array.from({ length: 5 }, () =>
      Math.floor(Math.random() * 10)
    ).join('')
    code = `${firstDigit}${remainingDigits}`
  } while (usedCodes.has(code)) // Ensure uniqueness

  usedCodes.add(code)
  return code
}

/**
 * Generate durability for a suit based on its type.
 * @param {SuitType} type - The type of the suit.
 * @returns {number} The durability value.
 */
function generateDurability(type: SuitType): number {
  switch (type) {
    case SuitType.POWER:
      // Power suits must have durability between 70 and 100
      return Math.floor(Math.random() * 31) + 70
    case SuitType.STEALTH:
      // Stealth suits must have durability between 50 and 100
      return Math.floor(Math.random() * 51) + 50
    case SuitType.CONCEALMENT: {
      // Concealment suits must have durability between 0 and 100, excluding values that end with 3 or 7
      let durability: number
      do {
        durability = Math.floor(Math.random() * 101)
      } while (durability % 10 === 3 || durability % 10 === 7)
      return durability
    }
  }
}

async function seed() {
  try {
    // Clear existing data
    await prisma.superheroSuit.deleteMany()

    // Create suits data array:
    // - 20 Power Suits
    // - 15 Stealth Suits
    // - 15 Concealment Suits
    const suitsData = [
      ...Array(20)
        .fill(null)
        .map(() => ({
          code: generateSuitCode(),
          type: SuitType.POWER,
          durability: generateDurability(SuitType.POWER)
        })),
      ...Array(15)
        .fill(null)
        .map(() => ({
          code: generateSuitCode(),
          type: SuitType.STEALTH,
          durability: generateDurability(SuitType.STEALTH)
        })),
      ...Array(15)
        .fill(null)
        .map(() => ({
          code: generateSuitCode(),
          type: SuitType.CONCEALMENT,
          durability: generateDurability(SuitType.CONCEALMENT)
        }))
    ]

    const invalidSuitsData = [
      {
        code: generateSuitCode(),
        type: SuitType.POWER,
        durability: 50 // invalid for POWER (must be 70-100)
      },
      {
        code: generateSuitCode(),
        type: SuitType.STEALTH,
        durability: 40 // invalid for STEALTH (must be 50-100)
      },
      {
        code: generateSuitCode(),
        type: SuitType.CONCEALMENT,
        durability: 73 // invalid ending in 3
      }
    ]

    const allSuitsData = [...suitsData, ...invalidSuitsData]

    // Create all suits in the database as a transaction
    const suits = await prisma.$transaction(
      allSuitsData.map(suitData =>
        prisma.superheroSuit.create({ data: suitData })
      )
    )

    // Log results
    console.log(`Created ${suits.length} superhero suits:`)
    console.log(
      `- Power Suits: ${suits.filter(s => s.type === SuitType.POWER).length}`
    )
    console.log(
      `- Stealth Suits: ${suits.filter(s => s.type === SuitType.STEALTH).length}`
    )
    console.log(
      `- Concealment Suits: ${suits.filter(s => s.type === SuitType.CONCEALMENT).length}`
    )
  } catch (error) {
    console.error('Error seeding database:', error)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

seed().catch(error => {
  console.error('Seeding failed:', error)
  process.exit(1)
})
