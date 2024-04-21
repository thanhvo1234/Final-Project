import { PageOptionsDto } from 'src/common/dtos/pageOption';
import { Product } from 'src/entities/products.entity';
export class GetCategoryDto extends PageOptionsDto {
  nameCategory: string;
  description: string;
  icon: string;
  skuCategory: string;
  products: Product[];
}