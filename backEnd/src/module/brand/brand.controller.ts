import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
  } from '@nestjs/common';
  import { BrandService } from './brand.service';
  import { CreateBrandDto } from './dto/createBrand.dto';
  import { GetBrandDto } from './dto/getBrand.dto';
  
  @Controller('brand')
  export class BrandController {
    constructor(private readonly brandService: BrandService) {}
  
    @Post()
    async create(@Body() createBrandDto: CreateBrandDto) {
      const result = await this.brandService.create(createBrandDto);
      return { result, message: 'Successfully create new brand' };
    }
    @Get()
    findAll(@Query() params: GetBrandDto) {
      return this.brandService.getBrands(params);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.brandService.getBrandById(id);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
      try {
        await this.brandService.remove(id);
        return { message: 'Brand deleted successfully' };
      } catch (error) {
        return { message: 'Failed to delete brand', error: error.message };
      }
    }
  }