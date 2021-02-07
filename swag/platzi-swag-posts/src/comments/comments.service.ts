import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SwagService } from '../swag/swag.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Comment, CommentDocument } from './schemas/comment.schema';
import { ObjectID } from 'bson';
import * as assert from 'assert';

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment.name)
    private readonly commentModel: Model<CommentDocument>,
    private readonly swagService: SwagService,
  ) {}

  async create(swagId: ObjectID, data: CreateCommentDto) {
    await this.ensureSwagExist(swagId);

    const comment = await this.commentModel.create({
      ...data,
      swagId,
    });
    await this.swagService.comment('add', swagId, comment._id);

    return comment;
  }

  async find(swagId: ObjectID) {
    await this.ensureSwagExist(swagId);

    const query = this.commentModel.find({
      swagId,
    });

    query.sort('-createdAt');

    return query.lean();
  }

  async deleteById(swagId: ObjectID, commentId: ObjectID) {
    await this.ensureCommentExist(commentId);
    await this.ensureSwagExist(swagId);

    await this.commentModel.deleteOne({ _id: commentId }).lean();
    await this.swagService.comment('remove', swagId, commentId);
  }

  async ensureCommentExist(commentId: ObjectID) {
    const comment = await this.commentModel
      .findById(commentId, { _id: 1 })
      .lean();

    if (!comment) {
      throw new NotFoundException('The Comment does not exist');
    }
  }

  ensureSwagExist(swagId: ObjectID) {
    assert(swagId instanceof ObjectID, 'swagId should be an ObjectId');
    return this.swagService.ensureSwagExist(swagId.toHexString());
  }
}
