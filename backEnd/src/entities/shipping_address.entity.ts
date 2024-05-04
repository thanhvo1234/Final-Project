import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Order } from './orders.entity';

@Entity()
export class ShippingAddress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  receiver: string;

  @Column()
  phoneNumber: string;

  @Column()
  street: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @OneToOne(() => Order, (order) => order.shippingAddress)
  order: Order;
}
