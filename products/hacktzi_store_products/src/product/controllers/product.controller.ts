import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { getByIdParamDto } from 'src/department/dtos/departmet.dto';
import { getById } from '../dtos/attribute.dto';
import {
  ProductDto,
  ProductGetById,
  ProductGetBytitleUri,
  ProductGetResponseDto,
  ProductQueryDto,
  UpdateProductDto,
} from '../dtos/product.dto';
import { Product } from '../entities/product.entity';
import { ProductService } from '../services/product.service';

@ApiTags('products')
@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  /**
   * TODO:
   * Implement allow Only admin user for get all products include inactives
   */
  @ApiOperation({ description: 'Create a product' })
  @ApiResponse({
    status: 201,
    description: 'Product created',
    type: ProductDto,
  })
  // @ApiQuery({type: ProductQueryDto})
  @Post()
  saveProduct(@Body() body: ProductDto): Promise<ProductDto> {
    //TODO: use auth token
    return this.productService.create(body);
  }

  @ApiOperation({ description: 'Get all products' })
  @ApiResponse({
    status: 200,
    description: 'Products',
    type: ProductGetResponseDto,
  })
  @ApiQuery({ type: ProductQueryDto })
  @Get()
  getAllProducts(
    @Query() queries: ProductQueryDto,
  ): Promise<ProductGetResponseDto> {
    return this.productService.findAll(queries);
  }

  @ApiOperation({ description: 'Search - Not Implemented' })
  @ApiResponse({
    status: 200,
    description: 'Search results',
    type: ProductGetResponseDto,
  })
  @ApiQuery({ type: ProductQueryDto })
  @Get('search')
  searchProduct(
    @Query() queries: ProductQueryDto,
    @Query('q') q: string,
  ): Promise<any> {
    //TODO: implement
    return this.productService.search(queries, q);
  }

  @ApiOperation({ description: 'Get a product by id' })
  @ApiResponse({ status: 200, description: 'Product', type: Product })
  @Get('id/:id')
  getProductById(@Param() params: ProductGetById): Promise<Product> {
    return this.productService.findOneById(params.id);
  }

  @ApiOperation({ description: 'Get a product by title_uri' })
  @ApiResponse({ status: 200, description: 'Product', type: Product })
  @Get(':title_uri')
  getProductByTitleUri(
    @Param() params: ProductGetBytitleUri,
  ): Promise<Product> {
    return this.productService.findOneByTitleUri(params.title_uri);
  }

  @ApiOperation({ description: 'Get All products by category_id' })
  @ApiResponse({ status: 200, description: 'Products', type: Product })
  @Get('category/:id')
  getProductsByCategoryId(
    @Param() params: getById,
    @Query() queries: ProductQueryDto,
  ): Promise<ProductGetResponseDto> {
    return this.productService.findAllByCategoryId(params.id, queries);
  }

  @ApiOperation({ description: 'Delete product by id' })
  @ApiResponse({ status: 200, description: 'Product Deleted' })
  @Delete(':id')
  deleteProductById(@Param() params: getByIdParamDto): Promise<any> {
    //TODO: use auth token
    return this.productService.deleteById(params.id);
  }

  @ApiOperation({ description: 'Update product by id' })
  @ApiResponse({ status: 200, description: 'Product updated' })
  @Put(':id')
  updateProductById(
    @Param() params: getById,
    @Body() body: UpdateProductDto,
  ): Promise<any> {
    //TODO: use auth token
    return this.productService.updateById(params.id, body);
  }

  /** ByMerchant */
  @ApiOperation({ description: 'Get Products by merchant id' })
  @ApiResponse({ status: 200, description: 'Products' })
  @ApiQuery({ type: ProductQueryDto })
  @Get('merchant/:id')
  getProductsByMerchantId(
    @Param() params: getByIdParamDto,
    @Query() queries: ProductQueryDto,
  ): Promise<ProductGetResponseDto> {
    return this.productService.findAllByMerchantId(params.id, queries);
  }
}
