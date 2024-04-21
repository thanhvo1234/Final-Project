import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { Category } from 'src/entities/categories.entity';
import { CreateCategoryDto } from './dto/createCategory.dto';
import { GetCategoryDto } from './dto/getCategories.dto';
import { randomBytes } from 'crypto';
import { UpdateCategoryto } from './dto/updateCategory.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRespository: Repository<Category>,
    private readonly entityManager: EntityManager,
  ) {}

  generateSkuFromName(name: string): string {
    const formattedName = name
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase();
    const sku = formattedName.replace(/\s+/g, '-');
    const uniqueIdentifier = randomBytes(4).toString('hex');
    const uniqueSku = `${sku}-${uniqueIdentifier}`;
    return uniqueSku;
  }

  async createCategory(
    createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    try {
      const { nameCategory, description, icon } = createCategoryDto;
      const skuCategory = this.generateSkuFromName(nameCategory);
      const category = new Category(createCategoryDto);
      category.nameCategory = nameCategory;
      category.description = description;
      category.icon = icon;
      category.skuCategory = skuCategory;
      const saveCategory = await this.entityManager.save(category);
      return saveCategory;
    } catch (error) {
      throw error;
    }
  }

  async getCategories(
    params: GetCategoryDto,
  ): Promise<ResponsePaginate<Category>> {
    try {
      const query = this.categoryRespository.createQueryBuilder('category');
      query.leftJoinAndSelect('category.products', 'products');
      query.skip(params.skip).take(params.take);
      const [categories, total] = await query.getManyAndCount();
      const pageMetaDto = new PageMetaDto({
        itemCount: total,
        pageOptionsDto: params,
      });
      return new ResponsePaginate<Category>(
        categories,
        pageMetaDto,
        'Brands retrieved successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  async getCategoryById(id: string): Promise<Category> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.categoryRespository
          .createQueryBuilder('category')
          .leftJoinAndSelect('category.products', 'products')
          .where('category.id = :id', { id })
          .getOne();
        resolve(category);
      } catch (error) {
        reject(error);
      }
    });
  }

  async updateCategory(
    id: string,
    updateCategoryDto: UpdateCategoryto,
  ): Promise<Category> {
    const category = await this.categoryRespository.findOneBy({ id });
    if (!category) {
      throw new Error('Category not found');
    }
    category.nameCategory = updateCategoryDto.nameCategory;
    category.icon = updateCategoryDto.icon;
    category.description = updateCategoryDto.description;
    category.skuCategory = this.generateSkuFromName(
      updateCategoryDto.nameCategory,
    );
    await this.categoryRespository.save(category);
    return category;
  }

  async remove(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const category = await this.categoryRespository.findOne({
          where: { id },
        });
        if (!category) {
          throw new HttpException(
            `Category with ID ${id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        await this.categoryRespository.softDelete(id);
        resolve({
          message: `Category with ID ${id} soft deleted successfully`,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}