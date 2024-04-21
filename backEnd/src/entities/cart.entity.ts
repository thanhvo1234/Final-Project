import { AbstractEntity } from 'src/common/entities';
import {
  Entity,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
  Column,
} from 'typeorm';
import { User } from './users.entity';
import { CartItem } from './cart_items.entity';

@Entity()
export class Cart extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @OneToOne(() => User)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column({ default: 0 })
  totalPrice: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.cart, {
    eager: true,
    cascade: true,
  })
  @JoinColumn({ name: 'items' })
  items: CartItem[];
}