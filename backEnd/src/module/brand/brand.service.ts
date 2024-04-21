import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brands.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateBrandDto } from './dto/createBrand.dto';
import { GetBrandDto } from './dto/getBrand.dto';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { randomBytes } from 'crypto';
import { UpdateBrandDto } from './dto/updateBrand.dto';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRespository: Repository<Brand>,
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

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    try {
      const { nameBrand, description, icon } = createBrandDto;
      const skuBrand = this.generateSkuFromName(nameBrand);
      const brand = new Brand(createBrandDto);
      brand.nameBrand = nameBrand;
      brand.description = description;
      brand.icon = icon;
      brand.skuBrand = skuBrand;
      const savedBrand = await this.entityManager.save(brand);
      return savedBrand;
    } catch (error) {
      throw error;
    }
  }

  async getBrands(params: GetBrandDto): Promise<ResponsePaginate<Brand>> {
    try {
      const query = this.brandRespository.createQueryBuilder('brand');
      query.skip(params.skip).take(params.take);
      const [brands, total] = await query.getManyAndCount();
      const pageMetaDto = new PageMetaDto({
        itemCount: total,
        pageOptionsDto: params,
      });
      return new ResponsePaginate<Brand>(
        brands,
        pageMetaDto,
        'Brands retrieved successfully',
      );
    } catch (error) {
      throw error;
    }
  }

  async getBrandById(id: string): Promise<Brand> {
    try {
      const brand = await this.brandRespository.findOneBy({ id });
      if (!brand) {
        throw new Error('Brand not found');
      }
      return brand;
    } catch (error) {
      throw error;
    }
  }

  async updateBrand(
    id: string,
    updateBrandDto: UpdateBrandDto,
  ): Promise<Brand> {
    const brand = await this.brandRespository.findOneBy({ id });
    if (!brand) {
      throw new Error('Brand not found');
    }
    brand.nameBrand = updateBrandDto.nameBrand;
    brand.icon = updateBrandDto.icon;
    brand.description = updateBrandDto.description;
    brand.skuBrand = this.generateSkuFromName(updateBrandDto.nameBrand);
    await this.brandRespository.save(brand);
    return brand;
  }

  async remove(id: string): Promise<{ message: string }> {
    return new Promise(async (resolve, reject) => {
      try {
        const brand = await this.brandRespository.findOne({ where: { id } });
        if (!brand) {
          throw new HttpException(
            `Brand with ID ${id} not found`,
            HttpStatus.NOT_FOUND,
          );
        }
        await this.brandRespository.softDelete(id);
        resolve({
          message: `Brand with ID ${id} soft deleted successfully`,
        });
      } catch (error) {
        reject(error);
      }
    });
  }
}