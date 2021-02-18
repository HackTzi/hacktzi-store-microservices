import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { AttributeDto, getById, getByType } from "../dtos/attribute.dto";
import { Attribute } from "../entities/attributes.entity";
import { Product } from "../entities/product.entity";
import { AttributeService } from "../services/attributes.service";

@ApiTags('attributes')
@Controller('attributes')
export class AttributeCOntroller {
    constructor(
        private attributeService: AttributeService
    ){

    }

    @Post()
    saveAttribute(@Body() attribute: AttributeDto): Promise<Attribute>{
        return this.attributeService.create(attribute)
    }

    @Get()
    getAllAttributes(): Promise<{count: number, attributes: Attribute[]}> {
        return this.attributeService.findAll()
    }

    @Get('type/:type')
    getByType(@Param() params: getByType): Promise<Attribute[]>{
        return this.attributeService.findAllByType(params.type)
    }

    @Get(':id')
    getById(@Param() params: getById): Promise<Attribute>{
        return this.attributeService.findAllById(params.id)
    }
}