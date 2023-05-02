import { IsBoolean, IsDate, IsString, Length } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @Length(4)
  serialNumber: string;

  @IsBoolean()
  isNew: boolean;

  @IsString()
  photo: string;

  @IsString()
  @Length(4, 20)
  title: string;

  @IsString()
  @Length(4, 20)
  type: string;

  @IsString()
  @Length(4, 20)
  specification: string;

  @IsDate()
  date: Date;
}
