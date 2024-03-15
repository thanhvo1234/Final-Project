import { IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  fullName: string;

  @IsNotEmpty()
  phoneNumber: string;

  @IsNotEmpty()
  address: string;
}