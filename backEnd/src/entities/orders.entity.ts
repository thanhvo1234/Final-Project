import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { User } from './users.entity';
import { CartItem } from './cart_items.entity';
import { ShippingAddress } from './shipping_address.entity';
import { StatusDelivery, StatusPay } from 'src/common/constants/enum';
import { AbstractEntity } from 'src/common/entities';

@Entity()
export class Order extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  userId: string;

  @ManyToOne(() => User, (user) => user.orders)
  @JoinColumn({ name: 'orderBy' })
  user: User;

  @Column({ default: 0 })
  totalPrice: number;

  @Column({ default: 0 })
  shippingFee: number;

  @Column({ default: 0 })
  taxFee: number;

  @OneToMany(() => CartItem, (cartItem) => cartItem.order)
  @JoinColumn({ name: 'items' })
  items: CartItem[];

  @Column({ type: 'enum', enum: StatusPay, default: StatusPay.PENDING })
  isPaid: StatusPay;

  @Column({ type: 'enum', enum: StatusDelivery, default: StatusPay.PENDING })
  isDelivery: StatusDelivery;

  @OneToOne(() => ShippingAddress, (shippingAddress) => shippingAddress.order, {
    cascade: true,
    eager: true,
  })
  @JoinColumn()
  shippingAddress: ShippingAddress;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  paidAt: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  deliveryAt: Date;
}
