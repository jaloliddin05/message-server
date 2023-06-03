import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
class CreateUserDto {
  @ApiProperty({
    description: `name`,
    example: 'John Doe',
  })
  @IsNotEmpty()
  @IsString()
  readonly name: string;
}

export default CreateUserDto;
