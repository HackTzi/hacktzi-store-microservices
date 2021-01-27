import { IsNotEmpty, IsEmail, IsNumber, IsNumberString, IsString, IsOptional } from "class-validator";

export class DepartmentDto {
    @IsNumber()
    @IsOptional()
    id?: number;

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    description: string
}

export class getByIdParamDto {
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}