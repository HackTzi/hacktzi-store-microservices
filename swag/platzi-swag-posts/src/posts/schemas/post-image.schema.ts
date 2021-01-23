import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class PostImageSchema {
  @Prop({ required: true })
  original: string;
}
