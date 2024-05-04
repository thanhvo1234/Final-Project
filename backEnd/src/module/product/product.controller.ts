import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/createProduct.dto';
import { getProductDto } from './dto/getProduct.dto';
import { UpdateProductDto } from './dto/updateProduct.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto) {
    try {
      const result = await this.productService.createProduct(createProductDto);
      return { data: result, message: 'Tạo sản phẩm mới thành công' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get()
  async findAll(@Query() params: getProductDto) {
    try {
      const products = await this.productService.getProducts(params);
      return { data: products, message: 'Lấy danh sách sản phẩm thành công' };
    } catch (error) {
      return { error: error.message };
    }
  }
  @Get('sku/:sku')
  async getBySku(@Param('sku') sku: string) {
    try {
      const product = await this.productService.getProductBySku(sku);
      return { data: product, message: 'Lấy thông tin sản phẩm thành công' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const product = await this.productService.getProductById(id);
      return { data: product, message: 'Lấy thông tin sản phẩm thành công' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Get('v1/:skuBrand')
  async getProductBySkuBrand(@Param('skuBrand') skuBrand: string) {
    return this.productService.getProductBySkuBrand(skuBrand);
  }

  @Get('v2/:skuCategory')
  async getProductBySkuCategory(@Param('skuCategory') skuCategory: string) {
    return this.productService.getProductBySkuCategory(skuCategory);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    try {
      const updatedProduct = await this.productService.updateProduct(
        id,
        updateProductDto,
      );
      return { data: updatedProduct, message: 'Cập nhật sản phẩm thành công' };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    try {
      await this.productService.deleteProduct(id);
      return { message: 'Xóa sản phẩm thành công' };
    } catch (error) {
      return { error: error.message };
    }
  }
}