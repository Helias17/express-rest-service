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

}