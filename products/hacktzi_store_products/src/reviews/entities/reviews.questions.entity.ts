import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ProductIndividualReview {
  //TODO REFACTOR
  // questions: [
  //     {
  //         product_id: 123123,
  //         id: 0,
  //         description: 'Esto pienzan los clientes sobre como les quedo el producto',
  //         question: '¿Cómo te quedó',
  //         answers: [
  //             {
  //                 question_id: 0,
  //                 id: 0,
  //                 answer: 'Pequeño',
  //                 answer_type: 'EXC'
  //                 votes: 10
  //             },
  //             {
  //                 id: 2,
  //                 answer: 'Justo mi talla',
  //                 answer_type: 'REG'
  //                 votes: 10
  //             },
  //             {
  //                 id: 0,
  //                 answer: 'Grande',
  //                 answer_type: 'BAD'
  //                 votes: 10
  //             }
  //         ]
  //     }
  // ]

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column({ type: 'float4', default: 0.0 })
  review_score_general: number;

  @Column({ type: 'float4', default: 0.0 })
  review_score_q1: number;

  @Column({ type: 'float4', default: 0.0 })
  review_score_q2: number;

  @Column({ type: 'float4', default: 0.0 })
  review_score_q3: number;

  @Column()
  user_id: number;

  @Column({ default: true })
  public: boolean;

  @Column()
  purchase_id: number; //TODO: to define
}
