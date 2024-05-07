import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min, IsNumber } from 'class-validator';
import { Order } from '../constants/enum';

export class PageOptionsDto {
  @IsString()
  search?: string = '';

  @IsString()
  searchByName?: string = '';

  @IsString()
  searchByEmail?: string = '';

  @IsString()
  @IsOptional()
  categoryId?: string = '';

  @IsNumber()
  @IsOptional()
  minPrice?: number;

  @IsNumber()
  @IsOptional()
  maxPrice?: number;

  @IsEnum(Order)
  @IsOptional()
  order?: Order = Order.DESC;

  orderBy?: string = 'id';

  @IsOptional()
  @IsEnum(['price_asc', 'price_desc'], { each: true })
  sortBy?: string;
  
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number = 1;

  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  @IsOptional()
  take?: number = 6;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
