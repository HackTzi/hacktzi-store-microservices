import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  orderByOptions,
  ProductDto,
  ProductGetResponseDto,
  ProductQueryDto,
  sortOptions,
  UpdateProductDto,
} from '../dtos/product.dto';
import { Product } from '../entities/product.entity';

const ALLOW_LOOKUP_PRODUCT = true;

const DEFAULT_QUERIES = {
  orderBy: orderByOptions.id,
  sort: sortOptions.ASC,
  skip: 0,
  take: 10,
};

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private ProductRepository: Repository<Product>,
  ) {}

  async findFilterQueries(
    queries: ProductQueryDto,
    where?,
  ): Promise<ProductGetResponseDto> {
    //TODO: fix orderby
    //active=true

    const productResponse = await this.ProductRepository.findAndCount({
      where,
      order: {
        [queries.orderBy || DEFAULT_QUERIES.orderBy]:
          queries.sort || DEFAULT_QUERIES.sort,
      },
      skip: queries.skip || DEFAULT_QUERIES.skip,
      take: queries.quantity || DEFAULT_QUERIES.take,
    });

    return {
      count: productResponse[0].length,
      total: productResponse[1],
      products: productResponse[0],
    };
  }

  async create(product: ProductDto): Promise<Product> {
    const newProduct = this.ProductRepository.create(product);
    newProduct.title_uri = newProduct.title_uri || '';
    newProduct.reviews = newProduct.reviews || {};
    return this.ProductRepository.save(newProduct);
  }

  async deleteById(id: number): Promise<any> {
    return this.ProductRepository.delete(id);
  }

  async updateById(id: number, updateProduct: UpdateProductDto): Promise<any> {
    const product = await this.ProductRepository.findOne({ id });
    if (!product)
      throw new NotFoundException(`Product id: ${id} doesn't exist`);
    const editedProduct = Object.assign(product, updateProduct);
    editedProduct.updated = new Date();
    return this.ProductRepository.save(editedProduct);
  }
  /** Find */

  async findAll(queries: ProductQueryDto): Promise<ProductGetResponseDto> {
    return this.findFilterQueries(queries);
  }

  async findAllByMerchantId(
    merchant_id: number,
    queries: ProductQueryDto,
  ): Promise<ProductGetResponseDto> {
    return this.findFilterQueries(queries, { merchant_id });
  }
  /** Find Path filter */

  async findOneById(id: number): Promise<Product> {
    const product = await this.ProductRepository.findOne({ id });
    if (!product) {
      throw new NotFoundException(`product id: ${id} doesn't exist`);
    }
    return product;
  }

  async findOneByTitleUri(title_uri: string): Promise<Product> {
    const product = await this.ProductRepository.findOne({ title_uri });
    if (!product) {
      throw new NotFoundException(
        `product title_uri: ${title_uri} doesn't exist`,
      );
    }
    return product;
  }

  async findAllByCategoryId(
    categoryId: number,
    queries: ProductQueryDto,
  ): Promise<ProductGetResponseDto> {
    return this.findFilterQueries(queries, { categoryId });
  }

  async updateProductReview(average: number, id: number): Promise<any> {
    const product = await this.ProductRepository.findOne({ id });
    if (!product)
      throw new NotFoundException(`Product id: ${id} doesn't exist`);
    product.reviews.general_avg = average;
    return this.ProductRepository.save(product);
  }

  async search(queries: ProductQueryDto, q: string) {
    const order = queries.orderBy || DEFAULT_QUERIES.orderBy;
    const sort = queries.sort || DEFAULT_QUERIES.sort;
    const results = await this.ProductRepository.createQueryBuilder('product')
      .leftJoinAndSelect('product.pictures', 'pictures', null)
      .where('title ILIKE :searchTerm OR description ILIKE :searchTerm', {
        searchTerm: `%${q}%`,
        active: ALLOW_LOOKUP_PRODUCT,
      })
      .take(queries.quantity || DEFAULT_QUERIES.take)
      .skip(queries.skip || DEFAULT_QUERIES.skip)
      .orderBy({
        ['product.' + order]: sort,
      })
      .getManyAndCount();
    return results;
  }
}
