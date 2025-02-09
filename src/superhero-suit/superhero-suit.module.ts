import { Module } from '@nestjs/common'

import { SuperheroSuitController } from './superhero-suit.controller'
import { SuperheroSuitService } from './superhero-suit.service'

@Module({
  controllers: [SuperheroSuitController],
  providers: [SuperheroSuitService]
})
export class SuperheroSuitModule {}
