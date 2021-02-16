import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateSwagImageDto {
  @ApiProperty()
  @IsString()
  original: string;
}
