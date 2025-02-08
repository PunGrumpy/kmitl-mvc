import { OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { PrismaClient } from '@prisma/client'

export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error']
    })
  }

  /**
   * Connect to the database when the application starts
   */
  async onModuleInit() {
    await this.$connect()
  }

  /**
   * Disconnect from the database when the application stops
   */
  async onModuleDestroy() {
    await this.$disconnect()
  }
}
