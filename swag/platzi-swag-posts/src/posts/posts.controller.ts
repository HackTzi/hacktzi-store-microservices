import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PostsService } from './posts.service';

@ApiTags('Posts')
@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  async create(@Body() data: CreatePostDto) {
    console.log('🤫 Dante ➤ PostsController ➤ create ➤ data', data);
    return this.postsService.create(data);
  }
}
