import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Price } from './price.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  serialNumber: number;

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

  @OneToMany(() => Price, (prices) => prices.id)
  prices: number;

  @Column({ default: new Date() })
  date: Date;
}
