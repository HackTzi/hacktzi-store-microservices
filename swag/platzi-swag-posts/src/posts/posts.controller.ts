import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() data: CreatePostDto) {
    return this.postsService.create(data);
  }

  @Get()
  async find() {
    return this.postsService.find();
  }

  @Get('/:id')
  async findById(@Param('id') id: string) {
    return this.postsService.findById(id);
  }

  @Patch('/:id')
  async update(@Param('id') id: string, @Body() data: UpdatePostDto) {
    return this.postsService.update(id, data);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string) {
    return this.postsService.deleteById(id);
  }
}
