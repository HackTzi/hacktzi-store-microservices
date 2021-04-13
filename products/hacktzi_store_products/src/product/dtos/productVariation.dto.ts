import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { VariationAttributeDto } from './variationAttribute.dto';

export class ProductVariationDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  type: string;

  @IsOptional()
  productId?: number;

  @IsArray()
  @ApiProperty({ type: VariationAttributeDto })
  @ValidateNested()
  @Type(() => VariationAttributeDto)
  variation_attributes: VariationAttributeDto[];
}
