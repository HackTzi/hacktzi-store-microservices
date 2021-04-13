import { Product } from 'src/product/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class ProductGeneralReview {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'float4', default: 0.0 })
  score: number;

  @Column()
  user_id: number;

  @ManyToOne(() => Product, (Product) => Product, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'product_id',
  })
  product: Product;

  @Column()
  product_id: number;

  /** auto generated */
  @CreateDateColumn({
    type: 'timestamp with time zone',
    default: (): string => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    default: (): string => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated: Date;
}
