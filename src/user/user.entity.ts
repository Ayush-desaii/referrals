import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UsersRef {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', nullable: false })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ unique: true, type: 'int', nullable: true })
  referalCode: number;

  @Column({ type: 'int', nullable: true }) // Store the ID of the referring user
  referalBy?: number;

  @Column({ type: 'simple-array', default: '' }) // Store an array of referral codes
  referedUsers: number[];
}
