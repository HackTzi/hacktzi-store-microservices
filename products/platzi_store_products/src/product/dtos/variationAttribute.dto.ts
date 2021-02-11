import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"
import { IsNumber, IsOptional, IsString, IsNotEmptyObject, ValidateNested } from "class-validator"
import { AttributeDto } from "./attribute.dto"

export class VariationAttributeDto{
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    id?: number

    @ApiProperty()
    @IsNumber()
    price: number

    @ApiProperty()
    @IsNumber()
    available_quantity: number
    
    @ApiProperty()
    @IsNumber()
    sold_quantity: number

    @ApiProperty()
    @IsString()
    name: string

    @ApiProperty({
        description: "A picture_id form pictures Array"
    })
    @IsString()
    @IsOptional()
    picture_id: string

    @ApiProperty()
    @IsNotEmptyObject()
    @ValidateNested()
    @Type(() => AttributeDto)
    attribute: AttributeDto
}