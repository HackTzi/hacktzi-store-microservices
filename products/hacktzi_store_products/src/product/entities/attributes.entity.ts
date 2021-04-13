import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Attribute {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Index()
  type: string;

  //info

  @Column()
  name: string;

  @Column()
  value: string;
}
