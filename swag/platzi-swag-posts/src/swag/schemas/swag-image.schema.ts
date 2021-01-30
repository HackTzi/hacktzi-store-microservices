import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ _id: false })
export class SwagImageSchema {
  @Prop({ required: true })
  original: string;
}
