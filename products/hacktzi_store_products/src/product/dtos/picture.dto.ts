import { ApiProperty } from "@nestjs/swagger"
import { IsNumber, IsOptional, IsString } from "class-validator"

export class PictureDto {
    @ApiProperty({
        required: false        
    })
    @IsNumber()
    @IsOptional()
    id?: number

    @ApiProperty()
    @IsString()
    picture_id: string

    @ApiProperty()
    @IsString()
    permalink: string
    
    @ApiProperty()
    @IsString()
    tumbnail: string

    @ApiProperty()
    @IsString()
    mime_type: string
}