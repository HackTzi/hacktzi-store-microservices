import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductReviews {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: 'float4', default: 0 })
  general_avg?: number;

  @Column({ default: 0 })
  total_general_reviews?: number;
}
