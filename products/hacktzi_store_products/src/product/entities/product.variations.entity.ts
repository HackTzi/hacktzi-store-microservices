import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './product.entity';
import { VariationAttribute } from './variation.attribute.entity';

@Entity()
export class ProductVariation {
  //as role id
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  type: string;

  @ManyToOne(() => Product, (product) => product.product_variations, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  product: Product;

  @OneToMany(
    () => VariationAttribute,
    (variationAttribute) => variationAttribute.productVariation,
    { cascade: true, eager: true },
  )
  variation_attributes: VariationAttribute[];
}
