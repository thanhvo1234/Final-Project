import { StatusDelivery, StatusPay } from 'src/common/constants/enum';
import { PageOptionsDto } from 'src/common/dtos/pageOption';

export class UpdateOrderDto extends PageOptionsDto {
  isPaid: StatusPay;

  isDelivery: StatusDelivery;

  paidAt: Date;

  deliveryAt: Date;
}
