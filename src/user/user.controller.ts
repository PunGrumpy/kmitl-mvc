import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { User } from '@prisma/client'

import { CreateUserDto } from './user.dto'
import { UserService } from './user.service'

@Controller('user')
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async getAll(): Promise<User[]> {
    return this.userService.findAll()
  }

  @Get(':id')
  async getById(@Param('id', ParseIntPipe) id: number): Promise<User | null> {
    return this.userService.findById(id)
  }

  @Post()
  async create(@Body() data: CreateUserDto): Promise<User> {
    return this.userService.create(data)
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() data: CreateUserDto
  ): Promise<User> {
    return this.userService.update(id, data)
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.userService.delete(id)
  }
}
