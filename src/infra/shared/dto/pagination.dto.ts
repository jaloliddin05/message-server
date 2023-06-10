import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

function parsePaginationQuery({ key, value }: TransformFnParams) {
  const int = parseInt(value);
  if (isNaN(int) || `${int}`.length !== value.length) {
    throw new BadRequestException(
      `${key} should be integer. Or pagination query string may be absent, then the page=1, limit=10 will be used.`,
    );
  }
  return int;
}

function parseStringToBoolean({ key, value }: TransformFnParams) {
  const bool = value == 'false' ? false : value == 'true' ? true : '';
  if (`${bool}`.length !== value.length) {
    throw new BadRequestException(`${key} should be boolean`);
  }
  return bool;
}

class PaginationDto {
  @ApiProperty({
    description: `Limit`,
    example: 20,
  })
  @IsOptional()
  @IsNumber()
  @Transform(parsePaginationQuery)
  readonly limit: number;

  @ApiProperty({
    description: `Page`,
    example: 1,
  })
  @IsOptional()
  @IsNumber()
  @Transform(parsePaginationQuery)
  readonly page: number = 1;

  @ApiProperty({
    description: `from`,
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly from: string;

  @ApiProperty({
    description: `to`,
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly to: string;

  @ApiProperty({
    description: `isFromTagged`,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(parseStringToBoolean)
  readonly isFromTagged: boolean;

  @ApiProperty({
    description: `isToTagged`,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(parseStringToBoolean)
  readonly isToTagged: boolean;

  @ApiProperty({
    description: `firstId`,
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly firstId: string;

  @ApiProperty({
    description: `secondName`,
    example: '',
    required: false,
  })
  @IsOptional()
  @IsString()
  readonly secondName: string;

  constructor() {
    this.limit = this.limit ? this.limit : 10;
    this.page = this.page ? this.page : 1;
  }
}

export default PaginationDto;
