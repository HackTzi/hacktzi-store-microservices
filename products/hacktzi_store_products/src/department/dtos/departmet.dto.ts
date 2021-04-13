import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsString,
  IsOptional,
  ValidateNested,
  IsNotEmptyObject,
} from 'class-validator';
import { CategoryDto } from './category.dto';

export class DepartmentDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class DepartmentWithCategoriesDto {
  @ApiProperty({ required: false })
  @IsNumber()
  @IsOptional()
  id?: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({
    isArray: true,
  })
  @IsNotEmptyObject()
  @Type(() => CategoryDto)
  @ValidateNested()
  categories: CategoryDto;
}

export class CreateDepartmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class UpdateDepartmentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  description: string;
}

export class getByIdParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumberString()
  id: number;
}
