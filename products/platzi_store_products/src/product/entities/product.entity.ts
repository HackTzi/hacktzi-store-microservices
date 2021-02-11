import { Category } from "src/department/entities/category.entity";
import { AfterInsert, BeforeInsert, Column, CreateDateColumn, Entity, Index, JoinColumn, JoinTable, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn, Timestamp, UpdateDateColumn } from "typeorm";
import { Picture } from "./picture.entity";
import { ProductVariation } from "./product.variations.entity";

@Entity()
export class Product {
    //as role id
    @PrimaryGeneratedColumn()
    id: number

    //id for sarch form fonten
    @Index()
    @Column({unique: true, })
    title_uri: string
    //info

    @Index()
    @Column()
    title: string

    @Column({nullable: true})
    subtitle: string

    //price

    @Column()
    price: number

    @Column()
    original_price: number

    //status
    
    @Column()
    active: Boolean


    //quantities

    @Column()
    available_quantity: number

    @Column()
    initial_quantity: number

    @Column({default: 0})
    sold_quantity: number

    @Column()
    merchant_id: number

    //decription

    @Column()
    description: string

    @Column()
    sku: string

    
    @ManyToOne(() => Category, {cascade: true, eager: true})
    @JoinColumn()
    category: Category

    @Column({ nullable: true })
    categoryId: number;

    /** auto generated */
    @CreateDateColumn({type: 'timestamp with time zone',  default: (): string => 'CURRENT_TIMESTAMP'})
    created: Date

    @UpdateDateColumn({type: 'timestamp with time zone', default: (): string => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP'})
    updated: Date

    /** relations */
    @OneToMany(() => ProductVariation, (productVariation: ProductVariation) => productVariation.product, {cascade: true, eager: true})// Relatio to may Product variation
    product_variations: ProductVariation[]

    @OneToMany(() => Picture, picture => picture.product, {cascade: true, eager: true})
    pictures: Picture[]
}