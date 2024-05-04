import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { User } from 'src/entities/users.entity';
import { Cart } from 'src/entities/cart.entity';
import { CartService } from '../cart/cart.service';
import { Product } from 'src/entities/products.entity';
import { CartItem } from 'src/entities/cart_items.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([CartItem]),
  ],
  controllers: [UserController],
  providers: [UserService, CartService],
})
export class UserModule {}
