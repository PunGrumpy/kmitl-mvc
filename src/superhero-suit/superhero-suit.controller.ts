import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger'
import { SuperheroSuit } from '@prisma/client'

import {
  CreateSuitDto,
  RepairSuitDto,
  SuitStatsDto,
  SuitStatusResponse
} from './superhero-suit.dto'
import { SuperheroSuitService } from './superhero-suit.service'

@Controller('suits')
@ApiTags('🦸🏻Superhero Suits')
export class SuperheroSuitController {
  constructor(private readonly suitService: SuperheroSuitService) {}

  @Get()
  @ApiOperation({ summary: 'Find all superhero suits' })
  @ApiResponse({
    status: 200,
    description: 'Returns list of all superhero suits'
  })
  async findAll(): Promise<SuperheroSuit[]> {
    return this.suitService.findAll()
  }

  @Get(':code')
  @ApiOperation({ summary: 'Find a superhero suit by code' })
  @ApiResponse({
    status: 200,
    description: 'Returns superhero suit data'
  })
  async findOne(@Param('code') code: string): Promise<SuperheroSuit> {
    return this.suitService.findOne(code)
  }

  @Get(':code/status')
  @ApiOperation({
    summary: 'Check suit status including durability validation'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns suit data with validation status'
  })
  async checkStatus(@Param('code') code: string): Promise<SuitStatusResponse> {
    return this.suitService.checkSuitStatus(code)
  }

  @Post()
  @ApiOperation({ summary: 'Create a new superhero suit' })
  @ApiResponse({
    status: 201,
    description: 'The suit has been successfully created'
  })
  async createSuit(@Body() data: CreateSuitDto): Promise<SuperheroSuit> {
    return this.suitService.createSuit(data)
  }

  @Patch('repair')
  @ApiOperation({
    summary: 'Attempt to repair a suit by increasing durability'
  })
  @ApiResponse({
    status: 200,
    description: 'Returns updated suit data and repair status'
  })
  async repairSuit(@Body() data: RepairSuitDto): Promise<{
    suit: SuperheroSuit
    validation: { isValid: boolean; message: string }
    wasRepaired: boolean
  }> {
    return this.suitService.repairSuit(data.code)
  }

  @Get('stats/repairs')
  @ApiOperation({ summary: 'Get repair statistics for all suit types' })
  @ApiResponse({
    status: 200,
    description: 'Returns repair statistics'
  })
  async getRepairStats(): Promise<SuitStatsDto> {
    return this.suitService.getRepairStats()
  }
}
