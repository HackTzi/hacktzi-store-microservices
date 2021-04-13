import { PG_FOREIGN_KEY_VIOLATION } from '@drdgvhbh/postgres-error-codes';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { log } from 'console';
import { Repository } from 'typeorm';
import { DepartmentDto, UpdateDepartmentDto } from '../dtos/departmet.dto';
import { Department } from '../entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department)
    private departmentRepository: Repository<Department>,
  ) {}

  findAll(): Promise<Department[]> {
    return this.departmentRepository.find();
  }

  async findOne(id: number): Promise<Department> {
    const departments = await this.departmentRepository.findOne(id);
    if (!departments)
      throw new NotFoundException(`Department id: ${id} doesn't exist`);
    return departments;
  }

  create(deparment: DepartmentDto): Promise<Department> {
    const newDepartment = this.departmentRepository.create(deparment);
    return this.departmentRepository.save(newDepartment);
  }

  async updateOne(id: number, body: UpdateDepartmentDto): Promise<Department> {
    const department = await this.departmentRepository.findOne(id);
    if (!department)
      throw new NotFoundException(`Department id: ${id} doesn't exist`);
    const editedDepartment = Object.assign(department, body);
    return this.departmentRepository.save(editedDepartment);
  }

  async deleteOne(id: number): Promise<any> {
    try {
      const deleted = await this.departmentRepository.delete(id);
      return deleted;
    } catch (err) {
      log(err);
      switch (err.code) {
        case PG_FOREIGN_KEY_VIOLATION: // TODO change custom message and code error for constrains
          throw new BadRequestException(err.detail);
        default:
          throw new InternalServerErrorException(err);
      }
    }
  }

  /**
   * With categories
   */
  findAllWithCategories(): Promise<Department[]> {
    return this.departmentRepository.find({ relations: ['categories'] });
  }

  findWithCategoriesById(id: number): Promise<Department> {
    return this.departmentRepository.findOne(id, { relations: ['categories'] });
  }
}
