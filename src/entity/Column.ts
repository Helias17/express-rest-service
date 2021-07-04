import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm'; //, JoinColumn
import { BoardEntity } from './Board';

@Entity('Columns')
export class BoardColumnEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('text')
  title!: string;

  @Column({ type: 'int', nullable: true })
  order!: number;

  @ManyToOne(() => BoardEntity, board => board.columns, {
    onDelete: 'CASCADE',
  })
  // @JoinColumn({ name: 'board_column' })
  board!: BoardEntity;
}