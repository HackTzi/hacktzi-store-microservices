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
import { CreateSwagLocationDto } from './create-swag-location.dto';

export class CreateSwagDto {
  @ApiProperty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @ApiProperty()
  @Type(() => CreateSwagImageDto)
  @ValidateNested()
  image: CreateSwagImageDto;

  @ApiPropertyOptional({
    default: true,
    description: 'Whether or not users can comment in this swag',
  })
  @IsOptional()
  @IsBoolean()
  commentsEnabled: boolean;

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  linkedProducts: number[];

  @ApiProperty()
  @ValidateNested()
  @Type(() => CreateSwagLocationDto)
  location: CreateSwagLocationDto;
}
