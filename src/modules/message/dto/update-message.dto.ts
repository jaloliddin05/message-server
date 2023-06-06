import { IsOptional, IsString } from 'class-validator';
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
}

export default UpdateMessageDto;
