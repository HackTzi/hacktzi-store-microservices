import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsNumberString, IsOptional, IsString } from "class-validator"

export class getByType {
    @ApiProperty()
    @IsString()
    type: string
}

export class getById {
    @ApiProperty()
    @IsNumberString()
    id: number
}


export class AttributeDto {
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id?: number

    @ApiProperty()
    @IsString()
    @IsOptional()
    type: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    name: string

    @ApiProperty()
    @IsString()
    @IsOptional()
    value: string
} 