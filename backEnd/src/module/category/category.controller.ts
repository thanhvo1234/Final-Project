import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
  } from '@nestjs/common';
  import { CategoryService } from './category.service';
  import { CreateCategoryDto } from './dto/createCategory.dto';
  import { GetCategoryDto } from './dto/getCategories.dto';
  
  @Controller('category')
  export class CategoryController {
    constructor(private readonly categoryService: CategoryService) {}
  
    @Post()
    async create(@Body() createBrandDto: CreateCategoryDto) {
      const result = await this.categoryService.create(createBrandDto);
      return { result, message: 'Successfully create new category' };
    }
    @Get()
    findAll(@Query() params: GetCategoryDto) {
      return this.categoryService.getCategorys(params);
    }
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.categoryService.getCategoryById(id);
    }
    @Delete(':id')
    async remove(@Param('id') id: string) {
      try {
        await this.categoryService.remove(id);
        return { message: 'Category deleted successfully' };
      } catch (error) {
        return { message: 'Failed to delete category', error: error.message };
      }
    }
  }