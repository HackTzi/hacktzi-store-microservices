import {
  Body, Controller, Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch, Post
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSwagDto } from './dtos/create-swag.dto';
import { SwagService } from './swag.service';
import { UpdateSwagDto } from './dtos/update-swag.dto';

@ApiTags('Swags')
@Controller('swags')
export class SwagController {
  constructor(private readonly swagService: SwagService) {}


  @Post()
  async create(@Body() data: CreateSwagDto) {
    return this.swagService.create(data);
  }

  @Get()
  async find() {
    return this.swagService.find();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.swagService.findById(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdateSwagDto) {
    return this.swagService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.swagService.deleteById(id);
  }
}
