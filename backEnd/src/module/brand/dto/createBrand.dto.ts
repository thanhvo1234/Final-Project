import { IsNotEmpty } from 'class-validator';
export class CreateBrandDto {
  @IsNotEmpty()
  nameBrand: string;

  description: string;

  @IsNotEmpty()
  icon: string;

  @IsNotEmpty()
  skuBrand: string;
}