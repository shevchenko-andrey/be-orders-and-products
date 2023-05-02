import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Product } from './product.entity';

@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.prices)
  product: number;

  @Column()
  value: number;

  @Column()
  symbol: string;

  @Column()
  isDefault: boolean;
}
