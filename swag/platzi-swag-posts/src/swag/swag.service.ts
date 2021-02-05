/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Injectable,
  NotFoundException,
  NotImplementedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSwagDto } from './dtos/create-swag.dto';
import { ReactionReqDto } from './dtos/reaction-req.dto';
import { ReactionResDto } from './dtos/reaction-res.dto';
import { UpdateSwagDto } from './dtos/update-swag.dto';
import { FilterOptions } from './interfaces/filter-options';
import { HashtagProvider } from './providers/hashtag.provider';
import { Swag, SwagDocument } from './schemas/swag.schema';

@Injectable()
export class SwagService {
  constructor(
    @InjectModel(Swag.name) private swagModel: Model<SwagDocument>,
    private readonly hashtagProvider: HashtagProvider,
  ) {}

  async create(data: CreateSwagDto) {
    const tags = this.hashtagProvider.extractFromText(data.description);

    return this.swagModel.create({
      ...data,
      tags,
    });
  }

  async find(options: FilterOptions) {
    console.log('Filter swag by ', { options });

    const query = this.swagModel.find();
    if (options.tags) query.where('tags').in(options.tags);
    if (options.by) query.where('createdBy.id', options.by);

    // Sort by created date in desc order by default
    query.sort('-createdAt');

    return query.lean();
  }

  async findById(id: string) {
    return this.swagModel.findById(id).lean();
  }

  async update(id: string, data: UpdateSwagDto) {
    await this.ensureSwagExist(id);

    return this.swagModel
      .findByIdAndUpdate(
        id,
        {
          $set: data,
        },
        { new: true },
      )
      .lean();
  }

  async reaction(
    id: string,
    { type, value }: ReactionReqDto,
    userId: string,
  ): Promise<ReactionResDto> {
    if (type === 'like') {
      const swag = await this.swagModel.findOneAndUpdate(
        {
          _id: id,
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

      if (!swag) {
        throw new NotFoundException('The Swag does not exist');
      }

      return {
        totalLikes: swag.likedBy.length,
      };
    }

    throw new NotImplementedException();
  }

  async deleteById(id: string) {
    await this.ensureSwagExist(id);

    return this.swagModel.deleteOne({ _id: id }).lean();
  }

  private async ensureSwagExist(id: string) {
    const swag = this.swagModel.findById(id).lean();
    if (!swag) {
      throw new NotFoundException('The Swag does not exist');
    }
  }
}
