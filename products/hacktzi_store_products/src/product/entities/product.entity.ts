import { Category } from 'src/department/entities/category.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Picture } from './picture.entity';
import { ProductVariation } from './product.variations.entity';
import { ProductReviews } from './reviews.entity';

@Entity()
export class Product {
  //as role id
  @PrimaryGeneratedColumn()
  id: number;

  //id for sarch form frontend
  @Index()
  @Column({ unique: true })
  title_uri: string;
  //info

  @Index()
  @Column()
  title: string;

  @Column({ nullable: true })
  subtitle: string;

  //price

  @Column()
  price: number;

  @Column()
  original_price: number;

  //status

  @Column()
  active: boolean;

  //quantities

  @Column()
  available_quantity: number;

  @Column()
  initial_quantity: number;

  @Column({ default: 0 })
  sold_quantity: number;

  @Column()
  merchant_id: number;

  //decription

  @Column()
  description: string;

  @Column()
  sku: string;

  @ManyToOne(() => Category, { cascade: true, eager: true })
  @JoinColumn()
  category: Category;

  @Column({ nullable: true })
  categoryId: number;

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

  /** relations */
  @OneToMany(
    () => ProductVariation,
    (productVariation: ProductVariation) => productVariation.product,
    { cascade: true, eager: true },
  ) // Relatio to may Product variation
  product_variations: ProductVariation[];

  @OneToMany(() => Picture, (picture) => picture.product, {
    cascade: true,
    eager: true,
  })
  pictures: Picture[];

  @ManyToOne(() => ProductReviews, { cascade: true, eager: true })
  @JoinColumn()
  reviews: ProductReviews;

  /** TODO
     * reviws: {
     *  general_avg: 5
     *  questions: {
     *      
     *      answers: [
     *          {
    //                 answer: 'Pequeño',
    //                 answer_type: 'EXC'
    //                 votes: 10
    //             },
    //             {
    //                 answer: 'Justo mi talla',
    //                 answer_type: 'REG'
    //                 votes: 10
    //             },
    //             {
    //                 answer: 'Grande',
    //                 answer_type: 'BAD'
    //                 votes: 10
    //             }
     *      ]
     *  }
     * 
     * }
     * 
     * 
     * 
     * 
     * 
     * 
     */
}
