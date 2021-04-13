import {
  Column,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Picture {
  //TODO implement

  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn()
  picture_id: string;

  @Column()
  permalink: string;

  @Column()
  thumbnail: string;

  @Column()
  mime_type: string;

  @ManyToOne(() => Product, (product) => product.pictures, {
    onDelete: 'CASCADE',
  })
  product: Product;
}
