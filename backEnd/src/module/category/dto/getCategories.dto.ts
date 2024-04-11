import { PageOptionsDto } from 'src/common/dtos/pageOption';

export class GetCategoryDto extends PageOptionsDto {
  nameCategory: string;
  description: string;
}