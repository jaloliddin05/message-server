import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateUserDto {
  @ApiProperty({
    description: `name`,
    example: 'John Doe',
  })
  @IsOptional()
  @IsString()
  readonly name: string;

  @ApiProperty({
    description: `socketId`,
    example: 'id',
  })
  @IsOptional()
  @IsString()
  readonly socketId: string;
}

export default UpdateUserDto;
