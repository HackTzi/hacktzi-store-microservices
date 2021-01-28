/* eslint-disable @typescript-eslint/no-unused-vars */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePostDto } from './dtos/create-post.dto';
import { UpdatePostDto } from './dtos/update-post.dto';
import { Post, PostDocument } from './schemas/post.schema';

@Injectable()
export class PostsService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(data: CreatePostDto) {
    return this.postModel.create(data);
  }

  async find() {
    return this.postModel.find().lean();
  }

  async findById(id: string) {
    return this.postModel.findById(id).lean();
  }

  async update(id: string, data: UpdatePostDto) {
    return this.postModel
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
    return this.postModel.deleteOne({ _id: id }).lean();
  }
}
