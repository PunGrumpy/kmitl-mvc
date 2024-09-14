import { PrismaClient } from '@prisma/client'
import { Elysia } from 'elysia'

import {
  CreateMilkProductionInput,
  MilkProductionReport
} from '../models/MilkProductionModel'

const prisma = new PrismaClient()

export const MilkProductionService = new Elysia({
  name: 'Service.MilkProduction'
}).decorate('MilkProduction', {
  async create(data: CreateMilkProductionInput) {
    return prisma.milkProduction.create({ data })
  },
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
      { regular: 0, chocolate: 0, soy: 0, almond: 0 } as MilkProductionReport
    )
  }
})
