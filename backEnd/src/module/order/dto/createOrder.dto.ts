import { User } from 'src/entities/users.entity';
import { ShippingAddress } from './../../../entities/shipping_address.entity';
import { CartItem } from 'src/entities/cart_items.entity';
import { StatusDelivery, StatusPay } from 'src/common/constants/enum';
export class CreateOrderDto {
  shippingAddress: ShippingAddress;
  user: User;
  userId: string;
  totalPrice: number;
  shippingFee: number;
  taxFee: number;
  items: CartItem[];
  isPaid: StatusPay;
  isDelivery: StatusDelivery;
  paidAt: Date;
  deliveryAt: Date;
}
