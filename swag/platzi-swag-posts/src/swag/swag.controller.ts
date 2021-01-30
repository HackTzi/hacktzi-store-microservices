import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseArrayPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateSwagDto } from './dtos/create-swag.dto';
import { SwagService } from './swag.service';
import { UpdateSwagDto } from './dtos/update-swag.dto';
import { ParseTagsPipe } from './pipes/parse-tags.pipe';

@ApiTags('Swags')
@Controller('swags')
export class SwagController {
  constructor(private readonly swagService: SwagService) {}

  @Post()
  async create(@Body() data: CreateSwagDto) {
    return this.swagService.create(data);
  }

  @Get()
  async find(
    @Query('tags', new ParseTagsPipe({ optional: true })) tags: string[],
    @Query('by') by: string,
  ) {
    return this.swagService.find({
      tags,
      by,
    });
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
