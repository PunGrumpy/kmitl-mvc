import { PrismaClient } from '@prisma/client'
import { Elysia } from 'elysia'

import {
  CreateMilkProductionInput,
  MilkProductionReport
} from '@/src/models/MilkProductionModel'

const prisma = new PrismaClient()

// Create the Milk Production Service working with Prisma
export const MilkProductionService = new Elysia({
  name: 'Service.MilkProduction'
}).decorate('MilkProduction', {
  // Create a new milk production record
  async create(data: CreateMilkProductionInput) {
    return prisma.milkProduction.create({ data })
  },
  // Get the milk production report (grouped by milk type)
  async getReport(): Promise<MilkProductionReport> {
    const result = await prisma.milkProduction.groupBy({
      by: ['milkType'],
      _sum: {
        quantity: true
      }
    })

    return result.reduce(
      (acc, item) => {
        acc[item.milkType as keyof MilkProductionReport] =
          item._sum.quantity || 0
        return acc
      },
      {
        regular: 0,
        sour: 0,
        chocolate: 0,
        soy: 0,
        almond: 0
      } as MilkProductionReport
    )
  }
})
