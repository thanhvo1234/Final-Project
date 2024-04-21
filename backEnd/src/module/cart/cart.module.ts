import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cart } from 'src/entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { Product } from 'src/entities/products.entity';
import { CartItem } from 'src/entities/cart_items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([CartItem]),
  ],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}