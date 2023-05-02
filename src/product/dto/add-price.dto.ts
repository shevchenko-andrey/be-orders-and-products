import { IsBoolean, IsNumber, IsString } from 'class-validator';

export class AddPriceDto {
  @IsNumber()
  value: number;

  @IsString()
  symbol: string;

  @IsBoolean()
  isDefault: boolean;
}
