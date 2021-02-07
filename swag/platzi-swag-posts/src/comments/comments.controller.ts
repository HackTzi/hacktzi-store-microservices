import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../swag/pipes/parse-objectid.pipe';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';

@Controller('swags/:swagId/comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @Param('swagId', ParseObjectIdPipe) swagId,
    @Body() data: CreateCommentDto,
  ) {
    return this.commentsService.create(swagId, data);
  }

  @Get()
  async find(@Param('swagId', ParseObjectIdPipe) swagId) {
    return this.commentsService.find(swagId);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(
    @Param('swagId', ParseObjectIdPipe) swagId,
    @Param('id', ParseObjectIdPipe) commentId,
  ) {
    return this.commentsService.deleteById(swagId, commentId);
  }
}
