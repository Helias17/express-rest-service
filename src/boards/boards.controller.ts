import { HttpStatus } from '@nestjs/common';
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
  create(@Body() createBoardDto: CreateBoardDto): Promise<IBoard> {
    return this.boardsService.create(createBoardDto);
  }

  @Get()
  getAll(): Promise<IBoard[] | null> {
    return this.boardsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string): Promise<IBoard | null> {
    return this.boardsService.getById(id);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<Boolean> {
    return this.boardsService.remove(id);
  }

  @Put(':id')
  update(
    @Body() updateBoardDto: UpdateBoardDto,
    @Param('id') id: string,
  ): Promise<IBoard | null> {
    return this.boardsService.update(id, updateBoardDto);
  }

}
