import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsEnum,
  IsNotEmpty,
  IsNotEmptyObject,
  IsNumber,
  IsNumberString,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { ProductReviews } from '../entities/reviews.entity';
import { PictureDto } from './picture.dto';
import { ProductVariationDto } from './productVariation.dto';

export class ProductGetById {
  @ApiProperty()
  @IsNumberString()
  id: number;
}

export class ProductGetBytitleUri {
  @ApiProperty()
  @IsString()
  title_uri: string;
}

class CategoryDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsNumber()
  @IsString()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsNumber()
  @IsString()
  @IsOptional()
  description: string;
}

export class ProductReviewDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsNumber()
  @IsOptional()
  general_avg: number;
}

export class ProductDto {
  @ApiProperty()
  @IsNumber()
  @IsOptional()
  id: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  title_uri?: string;

  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  subtitle?: string;

  @ApiProperty()
  @IsNumber()
  price: number;

  @ApiProperty()
  @IsNumber()
  original_price: number;

  @ApiProperty()
  @IsBoolean()
  active: boolean;

  @ApiProperty()
  @IsNumber()
  available_quantity: number;

  @ApiProperty()
  @IsNumber()
  initial_quantity: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  sold_quantity: number;

  @ApiProperty()
  @IsNumber()
  merchant_id: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  sku: string;

  @ApiProperty({})
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CategoryDto)
  category: CategoryDto;

  @ApiProperty({
    isArray: true,
    type: ProductVariationDto,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => ProductVariationDto)
  product_variations: ProductVariationDto[];

  @ApiProperty({
    isArray: true,
    type: PictureDto,
  })
  @ValidateNested({ each: true })
  @Type(() => PictureDto)
  @IsArray()
  @IsNotEmpty({ each: true, always: true })
  pictures: PictureDto[];

  @ApiProperty({})
  //@IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ProductReviews)
  reviews: ProductReviews;
}

export class UpdateProductDto {
  @ApiProperty()
  @IsString()
  //@IsNotEmpty()
  @IsOptional()
  title?: string;

  @ApiProperty()
  @IsOptional()
  subtitle?: string;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  price?: number;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  original_price?: number;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  active?: boolean;

  @ApiProperty()
  @IsNumber()
  @IsOptional()
  available_quantity?: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  sku: string;

  @ApiProperty({})
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => CategoryDto)
  @IsOptional()
  category?: CategoryDto;

  @ApiProperty({
    isArray: true,
    type: ProductVariationDto,
  })
  @IsArray()
  @ValidateNested()
  @Type(() => ProductVariationDto)
  @IsOptional()
  product_variations?: ProductVariationDto[];

  @ApiProperty({
    isArray: true,
    type: PictureDto,
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => PictureDto)
  @IsOptional()
  pictures?: PictureDto[];
}

export enum sortOptions {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum orderByOptions {
  title = 'title',
  id = 'id',
  price = 'price',
  created = 'created',
  available = 'available_quantity',
  sold_quantity = 'sold_quantity',
  reviews = 'reviews.general_avg',
  reviews_quantity = 'total_general_reviews',
}

export class ProductQueryDto {
  @ApiProperty({
    enum: orderByOptions,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(orderByOptions)
  orderBy?: orderByOptions;

  @ApiProperty({
    enum: sortOptions,
    required: false,
  })
  @IsString()
  @IsOptional()
  @IsEnum(sortOptions)
  sort?: sortOptions;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  quantity?: number;

  @ApiProperty({ required: false })
  @IsNumberString()
  @IsOptional()
  skip?: number;
}

export class ProductGetResponseDto {
  @ApiProperty()
  @IsNumber()
  count: number;

  @ApiProperty()
  @IsNumber()
  total: number;

  @ApiProperty({
    isArray: true,
    type: ProductDto,
  })
  @IsObject()
  @ValidateNested()
  @Type(() => ProductDto)
  products: ProductDto[];
}
