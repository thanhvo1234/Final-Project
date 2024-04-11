import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Brand } from 'src/entities/brands.entity';
import { Product } from 'src/entities/products.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Brand]),
    TypeOrmModule.forFeature([Product]),
  ],
  controllers: [BrandController],
  providers: [BrandService],
})
export class BrandModule {}