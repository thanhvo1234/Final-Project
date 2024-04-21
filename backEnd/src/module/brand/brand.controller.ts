import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/createBrand.dto';
import { GetBrandDto } from './dto/getBrand.dto';
import { UpdateBrandDto } from './dto/updateBrand.dto';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  async create(@Body() createBrandDto: CreateBrandDto) {
    try {
      const result = await this.brandService.createBrand(createBrandDto);
      return { result, message: 'Successfully created new brand' };
    } catch (error) {
      return { message: 'Failed to create brand', error: error.message };
    }
  }

  @Get()
  async findAll(@Query() params: GetBrandDto) {
    try {
      const brands = await this.brandService.getBrands(params);
      return { brands, message: 'Brands retrieved successfully' };
    } catch (error) {
      return { message: 'Failed to retrieve brands', error: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const brand = await this.brandService.getBrandById(id);
      return { brand, message: 'Brand retrieved successfully' };
    } catch (error) {
      return { message: 'Failed to retrieve brand', error: error.message };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBrandDto: UpdateBrandDto,
  ) {
    try {
      const updatedBrand = await this.brandService.updateBrand(
        id,
        updateBrandDto,
      );
      return {
        data: updatedBrand,
        message: 'Cập nhật thương hiệu thành công',
      };
    } catch (error) {
      return { error: error.message };
    }
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