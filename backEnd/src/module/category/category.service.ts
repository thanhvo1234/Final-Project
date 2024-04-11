import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { Category } from 'src/entities/categories.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCategoryDto } from './dto/getCategories.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRespository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = new Category(createCategoryDto);
    await this.entityManager.save(category);
    return category;
  }
  async getCategorys(params: GetCategoryDto) {
    const categories = this.categoryRespository.createQueryBuilder('category');
    const [result, total] = await categories.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(
      result,
      pageMetaDto,
      'Categories retrieved successfully',
    );
  }

  async getCategoryById(id: string) {
    const category = await this.categoryRespository
      .createQueryBuilder('category')
      .where('category.id = :id', { id })
      .getOne();
    return category;
  }

  async remove(id: string) {
    const category = await this.categoryRespository.findOne({ where: { id } });
    if (!category) {
      throw new HttpException(
        `Category with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.categoryRespository.softDelete(id);
      return {
        message: `Category with email ${category.nameCategory} soft deleted successfully`,
      };
    }
  }
}