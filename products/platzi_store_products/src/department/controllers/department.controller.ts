import { Body, Controller, Get, Req, Post, Param } from '@nestjs/common';
import { CategoryDto } from '../dtos/category.dto';
import { DepartmentDto, getByIdParamDto } from '../dtos/departmet.dto';
import { Department } from '../entities/department.entity';
import { CategoryService } from '../services/category.service';
import { DepartmentService } from '../services/department.service';


@Controller('department')
export class DepartmentController {
    constructor(
        private departmentService: DepartmentService, 
        private categoryService: CategoryService
    ){

    }
    @Post()
    saveDepartment(@Body() body: DepartmentDto): Promise<DepartmentDto> {
        return this.departmentService.create(body)
    }

    @Get()
    getAllDepartment(): Promise<DepartmentDto[]>{
        return this.departmentService.findAll()
    }

    @Get(':id')
    getOneDepartmentById(@Param() params: getByIdParamDto): Promise<DepartmentDto>{
        return this.departmentService.findOne(params.id)
    }

    /**
    * categories
    */

    @Post('/category')
    saveCategory(@Body() body: CategoryDto): Promise<CategoryDto>{
        return this.categoryService.create(body)
    }
    @Get('/category')
    getDepartmentsAndCategories(): Promise<Department[]>{
        return this.departmentService.findAllWithCategories()
    }

    @Get('/category/:id')
    getDepartmentsAndCategoriesById(@Param() params: getByIdParamDto): Promise<DepartmentDto>{
        return this.departmentService.findWithCategoriesById(params.id)
    }
}
