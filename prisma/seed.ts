import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateRandomCode(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString()
}

function generateRandomAge(): { years: number; months: number } {
  const totalMonths = Math.floor(Math.random() * 121) // 0-10 years in months
  return {
    years: Math.floor(totalMonths / 12),
    months: totalMonths % 12
  }
}

async function main() {
  const cowColors = ['white', 'brown']
  const cows = []

  for (let i = 0; i < 10; i++) {
    const color = cowColors[i % 2] // Alternate between white and brown
    const { years, months } = generateRandomAge()
    const cow = {
      code: generateRandomCode(),
      color: color,
      age: years,
      ageMonths: months
    }
    cows.push(cow)
  }

  for (const cow of cows) {
    await prisma.cow.create({
      data: cow
    })
  }

  console.log('Seed data inserted successfully.')
}

main()
  .catch(e => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
