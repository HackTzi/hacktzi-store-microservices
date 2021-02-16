import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectID } from 'bson';
import { Document, SchemaTypes } from 'mongoose';

// https://github.com/Automattic/mongoose/issues/7150#issuecomment-451227354
SchemaTypes.String.checkRequired((v) => v != null);

export type CommentDocument = Comment & Document;

@Schema({
  timestamps: true,
})
export class Comment {
  @Prop({ required: true })
  message: string;

  /** Swag to which the comment belongs */
  @Prop({ required: true, ref: 'Swag', type: SchemaTypes.ObjectId, index: 1 })
  swagId: ObjectID | string;

  @Prop({ type: [String], default: [], required: true })
  likedBy: string[];

  @Prop({ required: true, default: 0 })
  totalLikes: number;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
