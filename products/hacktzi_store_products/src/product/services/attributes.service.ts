import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { AttributeDto } from "../dtos/attribute.dto";
import { Attribute } from "../entities/attributes.entity";


@Injectable()
export class AttributeService {
    constructor(
        @InjectRepository(Attribute)
        private attributeRepository: Repository<Attribute>
    ){
    }

    async create(attribute: AttributeDto): Promise<Attribute>{
        const newAttribute = this.attributeRepository.create(attribute)
        return this.attributeRepository.save(newAttribute)
    }

    /** Find */
    async findAll(): Promise<{count: number, attributes:  Attribute[]}> {
        const attributesRes = await this.attributeRepository.findAndCount()
        return {count: attributesRes[1] ,attributes: attributesRes[0]}
    }

    /** Find path fiter */
    
    async findAllByType(type: string): Promise<Attribute[]>{
        const attributesRes = await this.attributeRepository.find({type})
        return attributesRes
    }

    async findAllById(id: number): Promise<Attribute>{
        const attributesRes = await this.attributeRepository.findOne({id})
        return attributesRes
    }



}
