import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
import { DepartmentDto } from '../dtos/departmet.dto';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentService {
    constructor(
        @InjectRepository(Department)
        private departmentRepository: Repository<Department>
    ){
    }

    findAll(): Promise<Department[]> {
        return this.departmentRepository.find()
    }

    async findOne(id: number): Promise<Department>{
        const departments = await this.departmentRepository.findOne(id)
        if(!departments) throw new NotFoundException(`Department id 1 doesn't exist`)
        return departments
    }

    create(deparment: DepartmentDto): Promise<Department> {
        const newDepartment = this.departmentRepository.create(deparment)
        return this.departmentRepository.save(newDepartment)
    }

    /**
    * With categories
    */
    findAllWithCategories(): Promise<Department[]>{
        return this.departmentRepository.find({relations: ["categories"]})
    }

    findWithCategoriesById(id: number): Promise<Department>{
        return this.departmentRepository.findOne(id, {relations: ["categories"]})
    }

}
