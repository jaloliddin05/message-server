import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class UpdateMessageDto {
  @ApiProperty({
    description: `title`,
    example: 'Task 6',
  })
  @IsOptional()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `body`,
    example: 'link',
  })
  @IsOptional()
  @IsString()
  readonly body: string;

  @ApiProperty({
    description: `isViewed`,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isViewed: boolean;

  @ApiProperty({
    description: `isFromTagged`,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isFromTagged: boolean;

  @ApiProperty({
    description: `isToTagged`,
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  readonly isToTagged: boolean;
}

export default UpdateMessageDto;
