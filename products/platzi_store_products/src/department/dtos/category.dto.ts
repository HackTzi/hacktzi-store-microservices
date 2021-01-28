import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsNotEmptyObject, IsNumber, IsNotEmpty, IsString, IsOptional, IsNumberString, ValidateNested } from "class-validator";

class DepartmentCategoryDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    id: number
}

export class CategoryDto{
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id: number

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string

    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => DepartmentCategoryDto)
    department: DepartmentCategoryDto

}

export class UpdateCategoryDto{
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    description: string

}

