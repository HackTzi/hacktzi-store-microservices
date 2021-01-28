import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsEmail, IsNumber, IsNumberString, IsString, IsOptional } from "class-validator";

export class DepartmentDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id?: number;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
}

export class UpdateDepartmentDto {

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    name: string

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string
}

export class getByIdParamDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsNumberString()
    id: number;
}