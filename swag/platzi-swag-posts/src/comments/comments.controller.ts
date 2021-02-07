import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { ApiOkResponse, ApiParam } from '@nestjs/swagger';
import { ReactionReqDto } from 'src/shared/dtos/reaction-req.dto';
import { ReactionResDto } from 'src/shared/dtos/reaction-res.dto';
import { ParseObjectIdPipe } from '../shared/pipes/parse-objectid.pipe';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
import { SortBy } from './enums/sort-by.enum';
import { ParseSortPipe } from './pipes/parse-sort-pipe';

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
  async find(
    @Param('swagId', ParseObjectIdPipe) swagId,
    @Query('sortBy', ParseSortPipe) sortBy = SortBy.CreatedAt,
  ) {
    return this.commentsService.find(swagId, sortBy);
  }

  @Post('/:commentId/reaction')
  @ApiParam({
    name: 'commentId',
    description: 'Comment id',
  })
  @ApiOkResponse({ type: ReactionResDto })
  @HttpCode(HttpStatus.OK)
  reaction(
    @Param('commentId', ParseObjectIdPipe) commentId,
    @Body() data: ReactionReqDto,
    @Query('userId') userId = 'userId',
  ): Promise<ReactionResDto> {
    return this.commentsService.reaction(commentId, data, userId);
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
