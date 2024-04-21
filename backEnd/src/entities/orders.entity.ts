import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
    OneToMany,
  } from 'typeorm';
  import { User } from './users.entity';
  import { CartItem } from './cart_items.entity';
  
  @Entity()
  export class Order {
    @PrimaryGeneratedColumn('uuid')
    id: string;
  
    @ManyToOne(() => User, (user) => user.orders)
    @JoinColumn({ name: 'userId' })
    user: User;
  
    @Column({ default: 0 })
    totalPrice: number;
  
    @OneToMany(() => CartItem, (cartItem) => cartItem.order)
    items: CartItem[];
  }