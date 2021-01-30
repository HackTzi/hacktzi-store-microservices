import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { CreateSwagImageDto } from './create-swag-image.dto';

export class CreateSwagDto {
  @ApiPropertyOptional({
    default: '',
  })
  @IsOptional()
  @IsString()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => CreateSwagImageDto)
  @ValidateNested()
  image: CreateSwagImageDto;

  @ApiPropertyOptional({
    default: true,
    description: 'Whether or not users can comment in this post',
  })
  @IsOptional()
  @IsBoolean()
  commentsEnabled: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  linkedProducts: number[];
}
