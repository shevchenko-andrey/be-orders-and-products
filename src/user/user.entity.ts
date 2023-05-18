import { UserRole } from 'src/common/common.interfaces';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: UserRole.USER })
  role: UserRole;

  @Column()
  hashedPassword: string;

  @Column({ default: null })
  refreshToken?: string;
}
