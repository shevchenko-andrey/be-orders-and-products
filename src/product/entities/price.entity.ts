import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.prices)
  productId: number;

  @Column()
  value: number;

  @Column()
  symbol: string;

  @Column()
  isDefault: boolean;
}
