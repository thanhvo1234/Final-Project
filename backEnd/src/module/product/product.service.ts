import { UpdateProductDto } from './dto/updateProduct.dto';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/entities/products.entity';
import { EntityManager, Repository } from 'typeorm';
import { CreateProductDto } from './dto/createProduct.dto';
import { getProductDto } from './dto/getProduct.dto';
import { ResponsePaginate } from 'src/common/dtos/responsePaginate';
import { PageMetaDto } from 'src/common/dtos/pageMeta';
import { randomBytes } from 'crypto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRespository: Repository<Product>,
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
  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return new Promise(async (resolve, reject) => {
      try {
        const {
          nameProduct,
          categoryId,
          brandId,
          price,
          quantity,
          image,
          onSale,
          coupon,
        } = createProductDto;
        const sku = this.generateSkuFromName(nameProduct);
        const product = new Product(createProductDto);
        product.nameProduct = nameProduct;
        product.categoryId = categoryId;
        product.brandId = brandId;
        product.price = price;
        product.quantity = quantity;
        product.sku = sku;
        product.image = image;
        product.onSale = onSale;
        product.coupon = coupon;

        const savedProduct = await this.entityManager.save(product);
        resolve(savedProduct);
      } catch (error) {
        reject(error);
      }
    });
  }

  async getProductBySkuBrand(skuBrand: string): Promise<Product[]> {
    try {
      const products = await this.productRespository.find({
        where: { brand: { skuBrand } },
        relations: ['brand'],
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProductBySkuCategory(skuCategory: string): Promise<Product[]> {
    try {
      const products = await this.productRespository.find({
        where: { category: { skuCategory } },
        relations: ['category'],
      });
      return products;
    } catch (error) {
      throw error;
    }
  }

  async getProducts(params: getProductDto): Promise<ResponsePaginate<Product>> {
    try {
      const productsQuery = this.productRespository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.brand', 'brand')
        .select([
          'product',
          'category.nameCategory',
          'category.id',
          'brand.nameBrand',
          'brand.id',
        ])
        .skip(params.skip)
        .take(params.take)
        .orderBy('product.createdAt', 'DESC');
      if (params.searchByName) {
        productsQuery.andWhere('product.nameProduct ILIKE :nameProduct', {
          nameProduct: `%${params.searchByName}%`,
        });
      }
      const [products, total] = await productsQuery.getManyAndCount();
      const pageMetaDto = new PageMetaDto({
        itemCount: total,
        pageOptionsDto: params,
      });
      const response = new ResponsePaginate(products, pageMetaDto, 'Success');
      return Promise.resolve(response);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async popularProduct(params: getProductDto): Promise<Product[]> {
    try {
      const cheapProducts = await this.productRespository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.brand', 'brand')
        .select([
          'product',
          'category.nameCategory',
          'category.id',
          'brand.nameBrand',
          'brand.id',
        ])
        .orderBy('product.price', 'ASC') // Sắp xếp theo giá tăng dần
        .take(4) // Chỉ lấy 4 sản phẩm
        .getMany();
      return cheapProducts;
    } catch (error) {
      throw error;
    }
  }

  async getProductById(id: string): Promise<Product> {
    try {
      const product = await this.productRespository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.brand', 'brand')
        .select([
          'product',
          'category.nameCategory',
          'category.id',
          'brand.nameBrand',
          'brand.id',
        ])
        .where('product.id = :id', { id })
        .getOne();
      return product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getProductBySku(sku: string): Promise<Product> {
    try {
      const product = await this.productRespository
        .createQueryBuilder('product')
        .leftJoinAndSelect('product.category', 'category')
        .leftJoinAndSelect('product.brand', 'brand')
        .select([
          'product',
          'category.nameCategory',
          'category.id',
          'brand.nameBrand',
          'brand.id',
        ])
        .where('product.sku = :sku', { sku })
        .getOne();
      return product;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async updateProduct(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRespository.findOneBy({ id });
    if (!product) {
      throw new Error('Product not found');
    }
    product.nameProduct = updateProductDto.nameProduct;
    product.description = updateProductDto.description;
    product.categoryId = updateProductDto.categoryId;
    product.brandId = updateProductDto.brandId;
    product.price = updateProductDto.price;
    product.quantity = updateProductDto.quantity;
    product.onSale = updateProductDto.onSale;
    product.image = updateProductDto.image;
    product.coupon = updateProductDto.coupon;
    product.sku = this.generateSkuFromName(updateProductDto.nameProduct);

    await this.productRespository.save(product);
    return product;
  }

  async deleteProduct(id: string): Promise<void> {
    await this.productRespository.softDelete(id);
  }
}
