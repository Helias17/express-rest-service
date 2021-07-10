import { HttpStatus, HttpException } from '@nestjs/common';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
  HttpCode,
} from '@nestjs/common';
import { CreateBoardDto } from './dto/create-board.dto';
import { UpdateBoardDto } from './dto/update-board.dto';
import { BoardsService } from './boards.service';
import { IBoard } from '../interfaces/IBoard';


@Controller('boards')
export default class BoardsController {
  constructor(private readonly boardsService: BoardsService) { }

  @Post()
  @HttpCode(HttpStatus.CREATED) // response status code
  async create(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
    return await this.boardsService.create(createBoardDto);
  }

  @Get()
  async getAll(): Promise<IBoard[] | null> {
    return await this.boardsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IBoard | null> {
    const foundBoard = await this.boardsService.getById(id);
    if (foundBoard) {
      return foundBoard;
    } else {
      throw new HttpException('Board was not found', HttpStatus.NOT_FOUND);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<String> {
    const isBoardDeleted = await this.boardsService.remove(id);

    if (isBoardDeleted) {
      return 'The board has been deleted';
    } else {
      throw new HttpException('Board was not found', HttpStatus.NOT_FOUND);
    }

  }

  @Put(':id')
  async update(
    @Body() updateBoardDto: UpdateBoardDto,
    @Param('id') id: string,
  ): Promise<IBoard | null> {
    return await this.boardsService.update(id, updateBoardDto);
  }

}
