import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardEntity } from '../../entity/Board';
import { IBoard } from '../../interfaces/IBoard';
import { TasksService } from './../tasks/tasks.service';


@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(BoardEntity)
    private boardsRepository: Repository<BoardEntity>,

    @Inject('TasksService')
    private readonly tasksService: TasksService
  ) { }

  async create(boardDto: CreateBoardDto): Promise<IBoard> {
    const newBoard = new BoardEntity();
    newBoard.title = boardDto.title;
    newBoard.columns = boardDto.columns;
    await this.boardsRepository.save(newBoard);
    return newBoard;
  }

  async getAll(): Promise<IBoard[] | null> {
    const boardsAll = await this.boardsRepository.find({ relations: ["columns"] });
    return boardsAll;
  }

  async getById(id: string): Promise<IBoard | null> {
    const boardById = await this.boardsRepository.findOne(id);
    if (boardById) {
      return boardById;
    }
    return null;
  }

  async remove(id: string): Promise<Boolean> {
    let isBoardDeleted = false;

    const foundBoard = await this.boardsRepository.findOne({ relations: ["columns"], where: { 'id': id } });
    if (foundBoard) {
      await this.boardsRepository.remove(foundBoard);
      await this.tasksService.deleteTasksByBoardId(id);
      isBoardDeleted = true;
    }
    return isBoardDeleted;
  }

  async update(id: string, boardDto: UpdateBoardDto): Promise<IBoard | null> {
    const foundBoard = await this.boardsRepository.findOne({ relations: ["columns"], where: { 'id': id } });

    if (foundBoard) {
      foundBoard.title = boardDto.title;
      foundBoard.columns = boardDto.columns!;
      await this.boardsRepository.save(foundBoard);
      return foundBoard;
    }
    return null;
  }
}