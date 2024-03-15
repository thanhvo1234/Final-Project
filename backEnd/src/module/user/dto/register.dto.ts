import { IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  confirmPassword: string;
}