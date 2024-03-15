import { RoleEnum } from 'src/common/constants/enum';
import { AbstractEntity } from 'src/common/entities';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends AbstractEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  phoneNumber: string;

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  fullName: string;

  @Column({ type: 'enum', enum: RoleEnum, default: RoleEnum.CUSTOMER })
  role: RoleEnum;

  constructor(user: Partial<User>) {
    super();
    Object.assign(this, user);
  }
}