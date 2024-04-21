import { IsInt, IsNotEmpty, IsUUID, Min } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  nameProduct: string;

  description: string;

  @IsNotEmpty()
  @IsUUID()
  categoryId: string;

  @IsNotEmpty()
  @IsUUID()
  brandId: string;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  price: number;

  @IsNotEmpty()
  @IsInt()
  @Min(0)
  quantity: number;

  coupon: number;

  sku: string;

  onSale: boolean;

  image: string;
}