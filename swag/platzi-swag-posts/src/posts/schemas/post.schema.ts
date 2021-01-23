import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PostImageSchema } from './post-image.schema';

export type PostDocument = Post & Document;

@Schema({
  timestamps: true,
})
export class Post {
  @Prop({ default: '' })
  description: string;

  @Prop({ required: true })
  image: PostImageSchema;

  @Prop({ type: [String], default: [] })
  tags: string[];

  @Prop({ type: [String], default: [] })
  linkedProducts: string[];

  @Prop({ default: true })
  commentsEnabled: boolean;

  @Prop({ type: [String], default: [] })
  comments: string[];

  @Prop({ type: [String], default: [] })
  likedBy: string[];
}

export const PostSchema = SchemaFactory.createForClass(Post);
