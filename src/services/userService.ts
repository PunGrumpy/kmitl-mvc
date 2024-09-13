import { PrismaClient } from '@prisma/client'
import { Elysia } from 'elysia'

import type { CreateUserInput, UpdateUserInput } from '@/src/types/user'

const prisma = new PrismaClient()

export const UserService = new Elysia({ name: 'Service.User' })
  .derive({ as: 'scoped' }, () => {
    return {
      User: {
        async findMany() {
          return await prisma.user.findMany()
        },
        async create(data: CreateUserInput) {
          return await prisma.user.create({ data })
        },
        async findUnique(id: number) {
          return await prisma.user.findUnique({ where: { id } })
        },
        async update(id: number, data: UpdateUserInput) {
          return await prisma.user.update({ where: { id }, data })
        },
        async delete(id: number) {
          return await prisma.user.delete({ where: { id } })
        }
      }
    }
  })
  .onError(({ error }) => {
    console.error('🚨 Database error:', error)
    return new Response('An unexpected error occurred', { status: 500 })
  })
