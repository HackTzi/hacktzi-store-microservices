import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/product.controller';
import { ProductVariation } from './entities/product.variations.entity';
import { ProductService } from './services/product.service';
import { VariationAttribute } from './entities/variation.attribute.entity';
import { Attribute } from './entities/attributes.entity';
import { Picture } from './entities/picture.entity';
import { AttributeService } from './services/attributes.service';
import { AttributeCOntroller } from './controllers/attributes.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product, ProductVariation, VariationAttribute, Attribute, Picture])],
  providers: [ProductService, AttributeService],
  controllers: [ProductController, AttributeCOntroller]
})
export class ProductModule {}