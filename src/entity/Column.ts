import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { BoardEntity } from './Board';

@Entity('Columns')
export class BoardColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @ManyToOne(() => BoardEntity, board => board.columns, { cascade: true })
  @JoinColumn({ name: 'board_column' })
  board!: BoardEntity;
}