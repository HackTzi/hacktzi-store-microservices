import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class PictureDto {
  //TODO: add
  @ApiProperty({
    required: false,
  })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  picture_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  permalink: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  thumbnail: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  mime_type: string;
}
