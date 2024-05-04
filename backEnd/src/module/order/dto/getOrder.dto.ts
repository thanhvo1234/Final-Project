import { StatusDelivery, StatusPay } from 'src/common/constants/enum';
import { PageOptionsDto } from 'src/common/dtos/pageOption';
import { CartItem } from 'src/entities/cart_items.entity';
import { ShippingAddress } from 'src/entities/shipping_address.entity';
import { User } from 'src/entities/users.entity';

export class getOrderDto extends PageOptionsDto {
  totalPrice: number;

  taxFee: number;

  items: CartItem[];

  isPaid: StatusPay;

  isDelivery: StatusDelivery;

  shippingFee: number;

  shippingAddress: ShippingAddress;

  user: User;

  paidAt: Date;

  deliveryAt: Date;
}
