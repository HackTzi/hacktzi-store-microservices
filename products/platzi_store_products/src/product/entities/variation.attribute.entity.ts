import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Attribute } from "./attributes.entity";
import { ProductVariation } from "./product.variations.entity";

@Entity()
export class VariationAttribute {
    @PrimaryGeneratedColumn()
    id: number
    //price
    @Column()
    price: number

    //quantities

    @Column()
    available_quantity: number

    @Column()
    sold_quantity: number

    //info

    @Column()
    name: string

    @Column({nullable: true})
    picture_id: string

    //Relations

    @ManyToOne(() => ProductVariation, productVariation => productVariation.variation_attributes, {onDelete: 'CASCADE'})
    @JoinColumn()
    productVariation: ProductVariation

    @ManyToOne(() => Attribute, {cascade: true, eager: true})
    @JoinColumn()
    attribute: Attribute 
    
}