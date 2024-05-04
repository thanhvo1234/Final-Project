import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entities/orders.entity';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { Cart } from 'src/entities/cart.entity';
import { CartItem } from 'src/entities/cart_items.entity';
import { User } from 'src/entities/users.entity';
import { CartService } from '../cart/cart.service';
import { Product } from 'src/entities/products.entity';
import { ShippingAddress } from 'src/entities/shipping_address.entity';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    TypeOrmModule.forFeature([Cart]),
    TypeOrmModule.forFeature([CartItem]),
    TypeOrmModule.forFeature([User]),
    TypeOrmModule.forFeature([Product]),
    TypeOrmModule.forFeature([ShippingAddress]),
  ],
  controllers: [OrderController],
  providers: [OrderService, CartService, UserService],
})
export class OrdersModule {}
