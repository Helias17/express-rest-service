import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BoardColumnEntity } from './Column';

@Entity('Boards')
export class BoardEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @OneToMany(() => BoardColumnEntity, column => column.board,)
  columns!: BoardColumnEntity[];
}