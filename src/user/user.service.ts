import { BadRequestException, Injectable } from '@nestjs/common'
import { User } from '@prisma/client'

import { PrismaService } from '@/lib/prisma/prisma.service'

import { CreateUserDto, UpdateUserDto } from './user.dto'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Find all users
   * @returns {Promise<User[]>} - A promise that resolves to an array of users
   */
  async findAll(): Promise<User[]> {
    return this.prisma.user.findMany({})
  }

  /**
   * Find a user by id
   * @param {number} id - The user's id
   * @returns {Promise<User | null>} - A promise that resolves to a user or null
   */
  async findById(id: number): Promise<User | null> {
    return this.prisma.user.findUnique({
      where: { id }
    })
  }

  /**
   * Create a new user
   * @param {CreateUserDto} data - The user's data
   * @returns {Promise<User>} - A promise that resolves to the created user
   * @throws {BadRequestException} - If the user cannot be created
   * @throws {Error} - If an unexpected error occurs
   */
  async create(data: CreateUserDto): Promise<User> {
    try {
      return this.prisma.user.create({ data })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  /**
   * Update a user
   * @param {number} id - The user's id
   * @param {UpdateUserDto} data - The user's data
   * @returns {Promise<User>} - A promise that resolves to the updated user
   * @throws {BadRequestException} - If the user cannot be updated
   * @throws {Error} - If an unexpected error occurs
   */
  async update(id: number, data: UpdateUserDto): Promise<User> {
    try {
      return this.prisma.user.update({
        where: { id },
        data
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  /**
   * Delete a user
   * @param {number} id - The user's id
   * @returns {Promise<User>} - A promise that resolves to the deleted user
   * @throws {BadRequestException} - If the user cannot be deleted
   * @throws {Error} - If an unexpected error occurs
   */
  async delete(id: number): Promise<User> {
    try {
      return this.prisma.user.delete({
        where: { id }
      })
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
