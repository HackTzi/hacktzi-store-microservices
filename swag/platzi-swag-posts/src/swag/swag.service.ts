/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSwagDto } from './dtos/create-swag.dto';
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
    const query = this.swagModel.find();

    if (options.tags) {
      query.where('tags').in(options.tags);
    }

    return query.lean();
  }

  async findById(id: string) {
    return this.swagModel.findById(id).lean();
  }

  async update(id: string, data: UpdateSwagDto) {
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

  async deleteById(id: string) {
    return this.swagModel.deleteOne({ _id: id }).lean();
  }
}
