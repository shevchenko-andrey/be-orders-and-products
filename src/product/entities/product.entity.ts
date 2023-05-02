import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Price } from './price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  serialNumber: string;

  @Column()
  isNew: boolean;

  @Column()
  photo: string;

  @Column()
  title: string;

  @Column()
  type: string;

  @Column()
  specification: string;

  @OneToMany(() => Price, (prices) => prices.product)
  prices: number | null;

  @Column({ default: new Date() })
  date: Date;
}
