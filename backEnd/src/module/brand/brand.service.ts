import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brands.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateBrandDto } from './dto/createBrand.dto';
import { GetBrandDto } from './dto/getBrand.dto';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';

@Injectable()
export class BrandService {
  constructor(
    @InjectRepository(Brand)
    private brandRespository: Repository<Brand>,
    private readonly entityManager: EntityManager,
  ) {}

  async create(createBrandDto: CreateBrandDto) {
    const brand = new Brand(createBrandDto);
    await this.entityManager.save(brand);
    return brand;
  }
  async getBrands(params: GetBrandDto) {
    const brands = this.brandRespository.createQueryBuilder('brand');
    const [result, total] = await brands.getManyAndCount();
    const pageMetaDto = new PageMetaDto({
      itemCount: total,
      pageOptionsDto: params,
    });
    return new ResponsePaginate(
      result,
      pageMetaDto,
      'Brands retrieved successfully',
    );
  }

  async getBrandById(id: string) {
    const brand = await this.brandRespository
      .createQueryBuilder('brand')
      .where('brand.id = :id', { id })
      .getOne();
    return brand;
  }

  async remove(id: string) {
    const brand = await this.brandRespository.findOne({ where: { id } });
    if (!brand) {
      throw new HttpException(
        `Brand with ID ${id} not found`,
        HttpStatus.NOT_FOUND,
      );
    } else {
      await this.brandRespository.softDelete(id);
      return {
        message: `Brand with email ${brand.nameBrand} soft deleted successfully`,
      };
    }
  }
}