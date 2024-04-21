import { PageOptionsDto } from 'src/common/dtos/pageOption';
import { CartItem } from 'src/entities/cart_items.entity';

export class GetCartDto extends PageOptionsDto {
  id: string;
  userId: string;
  items: CartItem[];
}