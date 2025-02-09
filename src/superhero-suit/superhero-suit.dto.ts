import { ApiProperty } from '@nestjs/swagger'
import { SuitType, SuperheroSuit } from '@prisma/client'
import { IsEnum, IsInt, Matches, Max, Min } from 'class-validator'

export class CreateSuitDto {
  @ApiProperty({
    description: 'Six-digit code starting with non-zero digit',
    example: '123456'
  })
  @Matches(/^[1-9]\d{5}$/, {
    message: 'Code must be a 6-digit number starting with a non-zero digit'
  })
  code: string

  @ApiProperty({
    enum: SuitType,
    description: 'Type of superhero suit'
  })
  @IsEnum(SuitType)
  type: SuitType

  @ApiProperty({
    description: 'Durability level (0-100)',
    minimum: 0,
    maximum: 100
  })
  @IsInt()
  @Min(0)
  @Max(100)
  durability: number
}

export class RepairSuitDto {
  @ApiProperty({
    description: 'Six-digit suit code',
    example: '123456'
  })
  @Matches(/^[1-9]\d{5}$/, {
    message: 'Code must be a 6-digit number starting with a non-zero digit'
  })
  code: string
}

export class SuitValidationResult {
  @ApiProperty()
  isValid: boolean

  @ApiProperty()
  message: string

  @ApiProperty()
  currentDurability: number
}

export class SuitStatusResponse {
  @ApiProperty()
  suit: SuperheroSuit

  @ApiProperty()
  validation: SuitValidationResult
}

export class SuitStatsDto {
  @ApiProperty()
  powerSuitsRepaired: number

  @ApiProperty()
  stealthSuitsRepaired: number

  @ApiProperty()
  concealmentSuitsRepaired: number
}
