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
import { SortBy } from './enums/sort-by.enum';

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

  async find(swagId: ObjectID, sortBy: SortBy) {
    await this.ensureSwagExist(swagId);

    const query = this.commentModel.find({
      swagId,
    });

    query.sort(`-${sortBy}`);

    return query.lean();
  }

  async reaction(
    commentId: ObjectID,
    { type, value: add }: ReactionReqDto,
    userId: string,
  ): Promise<ReactionResDto> {
    const comment = await this.ensureCommentExist(
      commentId,
      'likedBy totalLikes',
    );

    if (type === 'like') {
      const userAlreadyLiked = comment.likedBy.includes(userId);

      /** User aready liked or no liked */
      if (add === userAlreadyLiked) {
        return {
          totalLikes: comment.likedBy.length,
        };
      }

      let totalLikes = comment.totalLikes;
      let operation;
      if (add) {
        operation = '$addToSet';
        totalLikes++;
      } else {
        operation = '$pull';
        totalLikes--;
      }

      await this.commentModel.updateOne(
        {
          _id: commentId,
        },
        {
          // add or remove user reaction
          [operation]: {
            likedBy: userId,
          },
          $set: {
            totalLikes,
          },
        },
      );

      return {
        totalLikes,
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

  async ensureCommentExist(commentId: ObjectID, projection?: any) {
    const comment = await this.commentModel
      .findById(commentId, projection ?? { _id: 1 })
      .lean();

    if (!comment) {
      throw new NotFoundException('The Comment does not exist');
    }
    return comment;
  }

  ensureSwagExist(swagId: ObjectID) {
    assert(swagId instanceof ObjectID, 'swagId should be an ObjectId');
    return this.swagService.ensureSwagExist(swagId.toHexString());
  }
}
