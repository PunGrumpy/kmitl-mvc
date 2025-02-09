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
          durability: Math.floor(Math.random() * 101)
        })),
      ...Array(15)
        .fill(null)
        .map(() => ({
          code: generateSuitCode(),
          type: SuitType.STEALTH,
          durability: Math.floor(Math.random() * 101)
        })),
      ...Array(15)
        .fill(null)
        .map(() => ({
          code: generateSuitCode(),
          type: SuitType.CONCEALMENT,
          durability: Math.floor(Math.random() * 101)
        }))
    ]

    // Create all suits in the database as a transaction
    const suits = await prisma.$transaction(
      suitsData.map(suitData => prisma.superheroSuit.create({ data: suitData }))
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
