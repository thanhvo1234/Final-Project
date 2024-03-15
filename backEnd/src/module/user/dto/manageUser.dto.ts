import { RoleEnum } from 'src/common/constants/enum';
import { PageOptionsDto } from 'src/common/dtos/pageOption';

export class ManageUserDto extends PageOptionsDto {
  email: string;
  password: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  role: RoleEnum;
}