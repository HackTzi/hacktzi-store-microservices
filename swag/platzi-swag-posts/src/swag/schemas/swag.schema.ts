import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { SwagImageSchema } from './swag-image.schema';

export type SwagDocument = Swag & Document;

@Schema({
  timestamps: true,
})
export class Swag {
  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  image: SwagImageSchema;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [Number], default: [] })
  linkedProducts: number[];

  @Prop({ default: true })
  commentsEnabled: boolean;

  @Prop({ type: [String], default: [] })
  comments: string[];

  @Prop({ type: [String], default: [] })
  likedBy: string[];
}

export const PostSchema = SchemaFactory.createForClass(Swag);
