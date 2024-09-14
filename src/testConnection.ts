import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function testConnection() {
  try {
    await prisma.$connect()
    console.log('Successfully connected to the database')

    // Test query
    const cowCount = await prisma.cow.count()
    const milkCount = await prisma.milkProduction.count()

    console.log(`Number of cows in the database: ${cowCount}`)
    console.log(
      `Number of milk production records in the database: ${milkCount}`
    )
  } catch (error) {
    console.error('Error connecting to the database:', error)
  } finally {
    await prisma.$disconnect()
  }
}

testConnection()
