import { Injectable } from '@nestjs/common'
import { User } from '@prisma/client'
import { CatchPrismaError } from 'libs/decorators/catch-prisma.decorator'
import { PrismaService } from 'libs/prisma/prisma.service'

import { CreateUserDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find all users
   * @returns {Promise<User[]>} - A promise that resolves to an array of users
   * @throws {Error} - If an unexpected error occurs
   * @throws {CatchPrismaError} - If a Prisma error occurs
   */
  @CatchPrismaError()
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({})
  }

  /**
   * Find a user by id
   * @param {number} id - The user's id
   * @returns {Promise<User>} - A promise that resolves to a user or null
   * @throws {Error} - If an unexpected error occurs
   * @throws {CatchPrismaError} - If a Prisma error occurs
   */
  @CatchPrismaError({
    notFoundMessage: 'User not found'
  })
  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  /**
   * Create a new user
   * @param {CreateUserDto} data - The user's data
   * @returns {Promise<User>} - A promise that resolves to the created user
   * @throws {Error} - If an unexpected error occurs
   * @throws {CatchPrismaError} - If a Prisma error occurs
   */
  @CatchPrismaError()
  async create(data: CreateUserDto): Promise<User> {
    return this.prisma.user.create({ data })
  }

  /**
   * Update a user
   * @param {number} id - The user's id
   * @param {UpdateUserDto} data - The user's data
   * @returns {Promise<User>} - A promise that resolves to the updated user
   * @throws {Error} - If an unexpected error occurs
   * @throws {CatchPrismaError} - If a Prisma error occurs
   */
  @CatchPrismaError()
  async update(id: number, data: UpdateUserDto): Promise<User> {
    return this.prisma.user.update({
      where: { id },
      data
    })
  }

  /**
   * Delete a user
   * @param {number} id - The user's id
   * @returns {Promise<User>} - A promise that resolves to the deleted user
   * @throws {Error} - If an unexpected error occurs
   * @throws {CatchPrismaError} - If a Prisma error occurs
   */
  @CatchPrismaError()
  async delete(id: number): Promise<User> {
    return this.prisma.user.delete({
      where: { id }
    })
  }
}
