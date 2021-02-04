import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaTypes } from 'mongoose';
import { SwagImageSchema } from './swag-image.schema';
import { SwagLocationSchema } from './swag-location.schema';

// https://github.com/Automattic/mongoose/issues/7150#issuecomment-451227354
SchemaTypes.String.checkRequired((v) => v != null);

export type SwagDocument = Swag & Document;

@Schema({
  timestamps: true,
})
export class Swag {
  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: SwagImageSchema;

  @Prop({ type: [String], default: [], index: 1 })
  tags: string[];

  @Prop({ type: [Number], default: [] })
  linkedProducts: number[];

  @Prop({ default: true })
  commentsEnabled: boolean;

  @Prop({ type: [String], default: [] })
  comments: string[];

  @Prop({ type: [String], default: [] })
  likedBy: string[];

  @Prop({ required: true })
  location: SwagLocationSchema;
}

export const PostSchema = SchemaFactory.createForClass(Swag);
