import { Global, Module } from '@nestjs/common'
import { PrismaService } from 'libs/prisma/prisma.service'

/**
 * The PrismaModule is a global module that exports the PrismaService
 */
@Global()
@Module({
  providers: [PrismaService],
  exports: [PrismaService]
})
export class PrismaModule {}
