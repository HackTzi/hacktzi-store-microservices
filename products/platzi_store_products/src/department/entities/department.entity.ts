import { Column, Entity, OneToMany, PrimaryGeneratedColumn} from 'typeorm'
import { Category } from './category.entity'
@Entity()
export class Department {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({nullable: false})
    name: string;

    @Column({nullable: false})
    description: string;

    @OneToMany(() => Category, cat => cat.department)
    categories: Category[];
}