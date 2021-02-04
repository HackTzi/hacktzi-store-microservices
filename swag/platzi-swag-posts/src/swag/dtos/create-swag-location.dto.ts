import { IsArray, IsNumber, IsString } from 'class-validator';
import { LocationType } from '../enums/location-type.enum';

export class CreateSwagLocationDto {
  @IsString()
  type: LocationType;

  @IsString()
  name: string;

  @IsArray()
  @IsNumber(undefined, { each: true })
  coordinates: [number];
}
