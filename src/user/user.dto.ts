import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsOptional, IsString } from 'class-validator'

export class CreateUserDto {
  @ApiProperty()
  @IsEmail()
  email: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string
}

export class UpdateUserDto {
  @ApiProperty()
  @IsEmail()
  @IsOptional()
  email?: string

  @ApiProperty()
  @IsString()
  @IsOptional()
  name?: string
}
