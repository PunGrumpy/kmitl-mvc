import { Module } from '@nestjs/common'
import { SuitDurabilityValidator } from 'libs/validators/suit-durability.validator'

import { SuperheroSuitController } from './superhero-suit.controller'
import { SuperheroSuitService } from './superhero-suit.service'

@Module({
  controllers: [SuperheroSuitController],
  providers: [SuperheroSuitService, SuitDurabilityValidator]
})
export class SuperheroSuitModule {}
