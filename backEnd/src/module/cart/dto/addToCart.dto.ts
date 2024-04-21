import { CartItem } from 'src/entities/cart_items.entity';

export class AddToCartDto {
  productId: string;
  quantity: number;
  totalPrice: number;
  items: CartItem[];
}