import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SwagService } from '../swag/swag.service';
import { CreateCommentDto } from './dtos/create-comment.dto';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { Comment, CommentDocument } from './schemas/comment.schema';
import { ObjectID } from 'bson';
import * as assert from 'assert';
import { ReactionReqDto } from 'src/shared/dtos/reaction-req.dto';
import { ReactionResDto } from 'src/shared/dtos/reaction-res.dto';

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

  async reaction(
    commentId: ObjectID,
    { type, value }: ReactionReqDto,
    userId: string,
  ): Promise<ReactionResDto> {
    if (type === 'like') {
      const comment = await this.commentModel.findOneAndUpdate(
        {
          _id: commentId,
        },
        {
          // add or remove user reaction
          [value ? '$addToSet' : '$pull']: {
            likedBy: userId,
          },
        },
        {
          new: true,
        },
      );

      if (!comment) {
        throw new NotFoundException('The Comment does not exist');
      }

      return {
        totalLikes: comment.likedBy.length,
      };
    }

    throw new NotImplementedException();
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
