import { PageOptionsDto } from 'src/common/dtos/pageOption';
import { Product } from 'src/entities/products.entity';

export class GetBrandDto extends PageOptionsDto {
  nameBrand: string;
  description: string;
  icon: string;
  skuBrand: string;
  products: Product[];
}