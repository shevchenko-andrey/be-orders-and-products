import { Type } from 'class-transformer';
import {
  IsArray,
  IsBoolean,
  IsDateString,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { AddPriceDto } from './add-price.dto';

export class AddProductDto {
  @IsString()
  @Length(4, 20)
  title: string;

  @IsString()
  photo: string;

  @IsString()
  @Length(4)
  serialNumber: string;

  @IsString()
  @Length(4, 20)
  type: string;

  @IsBoolean()
  isNew: boolean;

  @IsString()
  @Length(4, 20)
  specification: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => AddPriceDto)
  prices: AddPriceDto[];

  @IsDateString()
  date: Date;
}
