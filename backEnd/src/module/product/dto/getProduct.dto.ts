import { PageOptionsDto } from 'src/common/dtos/pageOption';
import { Brand } from 'src/entities/brands.entity';
import { Category } from 'src/entities/categories.entity';
export class getProductDto extends PageOptionsDto {
    
  nameProduct: string;

  description: string;

  category: Category;

  brand: Brand;

  price: number;

  coupoun: number;

  quantity: number;

  onSale: boolean;
}