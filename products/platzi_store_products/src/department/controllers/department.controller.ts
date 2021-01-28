import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CategoryDto, UpdateCategoryDto } from '../dtos/category.dto';
import { DepartmentDto, getByIdParamDto, UpdateDepartmentDto } from '../dtos/departmet.dto';
import { Category } from '../entities/category.entity';
import { Department } from '../entities/department.entity';
import { CategoryService } from '../services/category.service';
import { DepartmentService } from '../services/department.service';

@ApiTags('Departments/categories')
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

    @Put(':id')
    updateDepartmentById(@Param() params: getByIdParamDto, @Body() body: UpdateDepartmentDto): Promise<DepartmentDto>{
        return this.departmentService.updateOne(params.id, body)
    }

    @Delete(':id')
    deleteDepartmetById(@Param() params: getByIdParamDto): Promise<any>{
        return this.departmentService.deleteOne(params.id)
    }

    /**
    * categories
    */
    @Get('/categories')
    GetAllCategories(): Promise<Category[]>{
        return this.categoryService.findAll()
    }

    @Post('/category')
    saveCategory(@Body() body: CategoryDto): Promise<CategoryDto>{
        return this.categoryService.create(body)
    }
    @Get('/category')
    getDepartmentsAndCategories(): Promise<Department[]>{
        return this.departmentService.findAllWithCategories()
    }

    @Get('/category/:id')
    getCategoryById(@Param() params: getByIdParamDto) {
        return this.categoryService.findOne(params.id)
    }

    @Get(':id/category')
    getDepartmentsAndCategoriesById(@Param() params: getByIdParamDto): Promise<DepartmentDto>{
        return this.departmentService.findWithCategoriesById(params.id)
    }
    @Put('category/:id')
    updateCategoryById(@Param() params: getByIdParamDto, @Body() body: UpdateCategoryDto): Promise<CategoryDto>{
        return this.categoryService.updateOne(params.id, body)
    }

    @Delete('category/:id')
    deleteCategoryById(@Param() params: getByIdParamDto): Promise<any>{
        return this.categoryService.deleteOne(params.id)
    }

}
