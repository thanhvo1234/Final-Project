import { RoleEnum } from 'src/common/constants/enum';
import { AbstractEntity } from 'src/common/entities';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Cart } from './cart.entity';
import { Order } from './orders.entity';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;
  @Column()
  email: string;
  @Column()
  password: string;
  @Column({ nullable: true })
  phoneNumber: string;
  @Column({ nullable: true })
  address: string;
  @Column({ nullable: true })
  fullName: string;

  @OneToMany(() => Order, (orders) => orders.user, {
    cascade: true,
  })
  orders: Order[];

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.CUSTOMER })
  role: RoleEnum;

  @Column({ nullable: true })
  cartId: string;

  @OneToOne(() => Cart, (cart) => cart.user, { eager: true })
  @JoinColumn({ name: 'cartId' })
  cart: Cart;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}