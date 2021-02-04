import { Prop, Schema } from '@nestjs/mongoose';
import { LocationType } from '../enums/location-type.enum';

/**
 * Location represented as GeoJSON Point
 * @see https://docs.mongodb.com/manual/reference/geojson/index.html
 */
@Schema({ _id: false })
export class SwagLocationSchema {
  @Prop({ required: true, enum: Object.keys(LocationType) })
  type: LocationType;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, type: [Number] })
  coordinates: [Number];
}
