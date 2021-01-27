import { Type } from "class-transformer";
import { IsNotEmptyObject, IsNumber, IsNotEmpty, IsString, IsOptional, IsNumberString, ValidateNested } from "class-validator";

class DepartmentCategoryDtop {
    @IsNotEmpty()
    @IsNumber()
    id: number
}

export class CategoryDto{
    @IsNumber()
    @IsOptional()
    id: number

    @IsNotEmpty()
    @IsString()
    name: string

    @IsString()
    description: string

    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => DepartmentCategoryDtop)
    department: DepartmentCategoryDtop

}

