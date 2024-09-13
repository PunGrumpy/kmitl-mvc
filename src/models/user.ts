import { PrismaClient } from '@prisma/client'

import type { CreateUserInput, UpdateUserInput } from '@/src/types/user'

const prisma = new PrismaClient()

export class User {
  static async findMany() {
    return await prisma.user.findMany()
  }

  static async create(data: CreateUserInput) {
    return await prisma.user.create({ data })
  }

  static async findUnique(id: number) {
    return await prisma.user.findUnique({ where: { id } })
  }

  static async update(id: number, data: UpdateUserInput) {
    return await prisma.user.update({ where: { id }, data })
  }

  static async delete(id: number) {
    return await prisma.user.delete({ where: { id } })
  }
}
