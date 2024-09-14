import { PrismaClient } from '@prisma/client'
import { Elysia } from 'elysia'

import { CreateCowInput, UpdateCowInput } from '@/src/models/CowModel'

const prisma = new PrismaClient()

export const CowService = new Elysia({ name: 'Service.Cow' }).decorate('Cow', {
  async findMany() {
    return prisma.cow.findMany()
  },
  async create(data: CreateCowInput) {
    return prisma.cow.create({ data })
  },
  async findByCode(code: string) {
    return prisma.cow.findUnique({ where: { code } })
  },
  async update(code: string, data: UpdateCowInput) {
    return prisma.cow.update({ where: { code }, data })
  },
  async resetAllBSOD() {
    return prisma.cow.updateMany({
      where: { isBSOD: true },
      data: { isBSOD: false }
    })
  }
})
