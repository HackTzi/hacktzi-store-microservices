import { Body, Controller, Get, Post, Param, Put, Delete } from '@nestjs/common';
import { ApiOperation, ApiProperty, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CategoryDto, UpdateCategoryDto } from './dtos/category.dto';
import { CreateDepartmentDto, DepartmentDto, DepartmentWithCategoriesDto, getByIdParamDto, UpdateDepartmentDto } from './dtos/departmet.dto';
import { Category } from './entities/category.entity';
import { Department } from './entities/department.entity';
import { CategoryService } from './services/category.service';
import { DepartmentService } from './services/department.service';

@ApiTags('Departments/categories')
@Controller('department')
export class DepartmentController {
    constructor(
        private departmentService: DepartmentService, 
        private categoryService: CategoryService
    ){

    }

    @ApiOperation({description: 'Create a department'})
    @ApiResponse({status: 201, description: 'Department created', type: DepartmentDto})
    @Post()
    saveDepartment(@Body() body: CreateDepartmentDto): Promise<DepartmentDto> {
        return this.departmentService.create(body)
    }

    @ApiOperation({description: 'Get all department'})
    @ApiResponse({status: 200, description: 'All departments', type: DepartmentDto, isArray:true})
    @Get()
    getAllDepartment(): Promise<DepartmentDto[]>{
        return this.departmentService.findAll()
    }

    @ApiOperation({description: 'get a department by id'})
    @ApiResponse({status: 200, description: 'Department', type: DepartmentDto})
    @Get(':id')
    getOneDepartmentById(@Param() params: getByIdParamDto): Promise<DepartmentDto>{
        return this.departmentService.findOne(params.id)
    }

    @ApiOperation({description: 'update a department by id'})
    @ApiResponse({status: 201, description: 'Department', type: DepartmentDto})
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
    @ApiOperation({description: 'Get all categories'})
    @ApiResponse({status: 200, description: 'Categories', type: CategoryDto, isArray: true})
    @Get('/categories')
    GetAllCategories(): Promise<CategoryDto[]>{
        return this.categoryService.findAll()
    }

    @ApiOperation({description: 'Create a category'})
    @ApiResponse({status: 201, description: 'Category created', type: CategoryDto})
    @Post('/category')
    saveCategory(@Body() body: CategoryDto): Promise<CategoryDto>{
        return this.categoryService.create(body)
    }

    @ApiOperation({description: 'Get all departments with categories'})
    @ApiResponse({status: 200, description: 'All departments with categories', type: DepartmentWithCategoriesDto, isArray: true})
    @Get('/category')
    getDepartmentsAndCategories(): Promise<Department[]>{
        return this.departmentService.findAllWithCategories()
    }

    @ApiOperation({description: 'Get a category by id'})
    @ApiResponse({status: 200, description: 'Category', type: CategoryDto})
    @Get('/category/:id')
    getCategoryById(@Param() params: getByIdParamDto): Promise<Category> {
        return this.categoryService.findOne(params.id)
    }

    @ApiOperation({description: 'Get a department with categories'})
    @ApiResponse({status: 200, description: 'department with categories', type: DepartmentWithCategoriesDto})
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
