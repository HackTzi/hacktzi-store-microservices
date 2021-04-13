import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNumber,
  IsOptional,
  IsString,
  IsNotEmptyObject,
  ValidateNested,
} from 'class-validator';

export class AttributeDtoV {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  value: string;
}

export class VariationAttributeDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  available_quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  sold_quantity?: number;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'A picture_id form pictures Array',
  })
  @IsString()
  @IsOptional()
  picture_id: string;

  @ApiProperty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => AttributeDtoV)
  attribute: AttributeDtoV;
}
