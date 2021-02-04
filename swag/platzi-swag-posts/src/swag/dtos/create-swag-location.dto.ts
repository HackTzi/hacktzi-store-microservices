import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { LocationType } from '../enums/location-type.enum';

export class CreateSwagLocationDto {
  @ApiProperty({
    enum: Object.keys(LocationType),
    default: LocationType.Point,
  })
  @IsOptional()
  @IsEnum(LocationType, {
    message: `type should be one of [${Object.keys(LocationType).join(', ')}]`,
  })
  type: LocationType;

  @ApiProperty({
    description: 'Location Name',
  })
  @IsString()
  name: string;

  @IsArray()
  @ArrayMinSize(2)
  @IsNumber(undefined, { each: true })
  coordinates: [number];
}
