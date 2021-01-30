/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateSwagDto } from './dtos/create-swag.dto';
import { Swag, SwagDocument } from './schemas/swag.schema';
import { UpdateSwagDto } from './dtos/update-swag.dto';

@Injectable()
export class SwagService {
  constructor(@InjectModel(Swag.name) private swagModel: Model<SwagDocument>) {}

  async create(data: CreateSwagDto) {
    return this.swagModel.create(data);
  }

  async find() {
    return this.swagModel.find().lean();
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
