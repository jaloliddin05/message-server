import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateMessageDto {
  @ApiProperty({
    description: `title`,
    example: 'Task 6',
  })
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @ApiProperty({
    description: `body`,
    example: 'link',
  })
  @IsNotEmpty()
  @IsString()
  readonly body: string;

  @ApiProperty({
    description: `from user`,
    example: 'uuid',
  })
  @IsNotEmpty()
  @IsString()
  readonly from: string;

  @ApiProperty({
    description: `to user`,
    example: 'Kaneki',
  })
  @IsNotEmpty()
  @IsString()
  to: string;
}

export default CreateMessageDto;
