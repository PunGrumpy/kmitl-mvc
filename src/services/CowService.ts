import { PrismaClient } from '@prisma/client'
import { Elysia } from 'elysia'

import { CreateCowInput, UpdateCowInput } from '@/src/models/CowModel'

const prisma = new PrismaClient()

// Create the Cow Service working with Prisma
export const CowService = new Elysia({ name: 'Service.Cow' }).decorate('Cow', {
  // Find all cows
  async findMany() {
    return prisma.cow.findMany()
  },
  // Create a new cow
  async create(data: CreateCowInput) {
    return prisma.cow.create({ data })
  },
  // Find a cow by code
  async findByCode(code: string) {
    return prisma.cow.findUnique({ where: { code } })
  },
  // Update a cow by code
  async update(code: string, data: UpdateCowInput) {
    return prisma.cow.update({
      where: { code },
      data: {
        ...data,
        hasEatenLemon: data.hasEatenLemon ?? undefined
      }
    })
  },
  // Reset all cows' BSOD status
  async resetAllBSOD() {
    return prisma.cow.updateMany({
      where: { isBSOD: true },
      data: { isBSOD: false }
    })
  }
})
