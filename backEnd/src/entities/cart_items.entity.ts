import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from 'typeorm';
  import { Cart } from './cart.entity';
  import { Product } from './products.entity';
  import { Order } from './orders.entity';
  
  @Entity()
  export class CartItem {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => Product, (product) => product.cartItems)
    @JoinColumn({ name: 'productId' })
    product: Product;
  
    @Column()
    quantity: number;
  
    @Column({ default: 0 })
    priceForEach: number;
  
    @Column({ default: 0 })
    total: number;
  
    @ManyToOne(() => Cart, (cart) => cart.items)
    cart: Cart;
  
    @ManyToOne(() => Order, (order) => order.items)
    @JoinColumn({ name: 'orderId' })
    order: Order;
  }