import { Module } from '@nestjs/common';
import { DepartmentService } from './services/department.service';
import { DepartmentController } from './controllers/department.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity'
import { Category } from './entities/category.entity';
import { CategoryService } from './services/category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Department, Category])],
  providers: [DepartmentService, CategoryService],
  controllers: [DepartmentController]
})
export class DepartmentModule {}
