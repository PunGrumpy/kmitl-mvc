import { User } from '@/src/models/user'
import type { CreateUserInput, UpdateUserInput } from '@/src/types/user'

export class UserService {
  async getAllUsers() {
    return await User.findMany()
  }

  async createUser(data: CreateUserInput) {
    return await User.create(data)
  }

  async getUserById(id: number) {
    return await User.findUnique(id)
  }

  async updateUser(id: number, data: UpdateUserInput) {
    return await User.update(id, data)
  }

  async deleteUser(id: number) {
    return await User.delete(id)
  }
}
