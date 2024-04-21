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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCategoryDto } from './dto/getCategories.dto';
import { UpdateCategoryto } from './dto/updateCategory.dto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    try {
      const result =
        await this.categoryService.createCategory(createCategoryDto);
      return { result, message: 'Successfully created new category' };
    } catch (error) {
      return { message: 'Failed to create category', error: error.message };
    }
  }

  @Get()
  async findAll(@Query() params: GetCategoryDto) {
    try {
      const categories = await this.categoryService.getCategories(params);
      return { categories, message: 'Categories retrieved successfully' };
    } catch (error) {
      return { message: 'Failed to retrieve categories', error: error.message };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      const category = await this.categoryService.getCategoryById(id);
      return { category, message: 'Category retrieved successfully' };
    } catch (error) {
      return { message: 'Failed to retrieve category', error: error.message };
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryto: UpdateCategoryto,
  ) {
    try {
      const updatedBrand = await this.categoryService.updateCategory(
        id,
        updateCategoryto,
      );
      return {
        data: updatedBrand,
        message: 'Cập nhật danh mục thành công',
      };
    } catch (error) {
      return { error: error.message };
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      await this.categoryService.remove(id);
      return { message: 'Category deleted successfully' };
    } catch (error) {
      return { message: 'Failed to delete brand', error: error.message };
    }
  }
}