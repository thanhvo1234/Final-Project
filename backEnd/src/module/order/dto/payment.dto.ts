import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class PaymentDto {
  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  amount: number;

  redirectUrl: string;
}
