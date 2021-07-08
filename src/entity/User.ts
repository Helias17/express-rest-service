import { IUser } from './../interfaces/IUser';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Users')
export default class User {

  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  login!: string;

  @Column()
  password!: string

  static toResponse(user: User): IUser {
    const { id, name, login } = user;
    return { id, name, login };
  }


}