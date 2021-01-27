import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository, QueryFailedError } from 'typeorm';
import { Category } from '../entities/category.entity';
import { PG_FOREIGN_KEY_VIOLATION  } from '@drdgvhbh/postgres-error-codes'
import { log } from 'console';
import { CategoryDto } from '../dtos/category.dto';

@Injectable()
export class CategoryService {
    constructor(
        @InjectRepository(Category)
        private categoryRepository: Repository<Category>
    ){
    }

    findAll(): Promise<Category[]> {
        return this.categoryRepository.find()
    }

    findOne(id: number): Promise<Category>{
        return this.categoryRepository.findOne(id)
    }

    async create(category: CategoryDto): Promise<Category> {
        // console.log('Code: ', a)
        try {
            const newDepartment = this.categoryRepository.create(category)
            const categoryCreated = await this.categoryRepository.save(newDepartment)
            return categoryCreated
        }catch(err) {
            log(err)
            switch(err.code){
                case PG_FOREIGN_KEY_VIOLATION:// TODO change custom message and code error for constrains
                    throw new BadRequestException(err.detail)
                default:
                    throw new InternalServerErrorException(err)
            }
        }
    }

}