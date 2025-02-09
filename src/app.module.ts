import { Module } from '@nestjs/common'
import { PrismaModule } from 'libs/prisma/prisma.module'

import { SuperheroSuitModule } from './superhero-suit/superhero-suit.module'

@Module({
  imports: [PrismaModule, SuperheroSuitModule]
})
export class AppModule {}
