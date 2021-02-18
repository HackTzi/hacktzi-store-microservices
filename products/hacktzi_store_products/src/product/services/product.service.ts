import { Injectable, NotFoundException, NotImplementedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProductDto, ProductGetResponseDto, ProductQueryDto, UpdateProductDto } from "../dtos/product.dto";
import { Product } from "../entities/product.entity";

@Injectable()
export class ProductService {
    constructor(
        @InjectRepository(Product)
        private ProductRepository: Repository<Product>
    ){

    }

    async findFilterQueries(queries: ProductQueryDto, where?): Promise<ProductGetResponseDto>{//TODO: fix orderby
        //active=true
        console.log(queries);
        
        const productResponse = await this.ProductRepository.findAndCount({
            where,
            order: {[queries.orderBy || 'id']: queries.sort || 'ASC'},
            skip: queries.skip || 0, take: queries.quantity || 10
        })

        return {count: productResponse[0].length, total: productResponse[1], products: productResponse[0]}
    }

    async create(product: ProductDto): Promise<Product>{
        console.log('req:  ',product)
        const newProduct = this.ProductRepository.create(product)
        newProduct.title_uri = newProduct.title_uri || ''
        return this.ProductRepository.save(newProduct)
       
    }

    async deleteById(id: number): Promise<any>{
        return this.ProductRepository.delete(id)
    }

    async updateById(id: number, updateProduct: UpdateProductDto): Promise<any>{
        const product = await this.ProductRepository.findOne({id})
        if(!product) throw new NotFoundException(`Product id: ${id} doesn't exist`)
        const editedProduct = Object.assign(product, updateProduct)      
        editedProduct.updated = new Date()
        return this.ProductRepository.save(editedProduct)
    }
    /** Find */

    async findAll(queries: ProductQueryDto): Promise<ProductGetResponseDto>{
        return this.findFilterQueries(queries)
    }

    async findAllByMerchantId(merchant_id: number, queries: ProductQueryDto): Promise<ProductGetResponseDto>{
        return this.findFilterQueries(queries, {merchant_id})
    }
    /** Find Path filter */


    async findOneById(id: number): Promise<Product> {
        const product = await this.ProductRepository.findOne({id})
        if(!product){
            throw new NotFoundException(`product id: ${id} doesn't exist`)
        }
        return product
    }

    async findOneByTitleUri(title_uri: string): Promise<Product> {
        const product = await this.ProductRepository.findOne({title_uri})
        if(!product){
            throw new NotFoundException(`product title_uri: ${title_uri} doesn't exist`)
        }
        return product
    }

    async findAllByCategoryId(categoryId: number, queries: ProductQueryDto): Promise<ProductGetResponseDto>{
        return this.findFilterQueries(queries, {categoryId})
    }

    async search(queries: ProductQueryDto, q: string) { //TODO: implent
        throw new NotImplementedException()
        const r = await this.ProductRepository.createQueryBuilder('product').leftJoinAndSelect("product.pictures", "pictures",null).where('title LIKE :searchTerm',{searchTerm: `%${q}%`}).getManyAndCount()
        console.log(r)
        return r
    }
}