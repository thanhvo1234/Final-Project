import { PageOptionsDto } from 'src/common/dtos/pageOption';

export class GetBrandDto extends PageOptionsDto {
  nameBrand: string;
  description: string;
}