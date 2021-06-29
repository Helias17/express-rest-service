import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('Tasks')
export default class TaskEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  title!: string;

  @Column()
  order!: number;

  @Column()
  description!: string;

  @Column({ nullable: true })
  userId!: string;

  @Column()
  boardId!: string;

  @Column()
  columnId!: string;
}