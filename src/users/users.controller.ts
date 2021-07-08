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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { IUser } from '../interfaces/IUser';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getAll(): Promise<IUser[] | null> {
    return this.usersService.getAll();
  }


  @Get(':id')
  getOne(@Param('id') id: string): Promise<IUser | null> {
    return this.usersService.getById(id);
  }


  @Post()
  @HttpCode(HttpStatus.CREATED) // response status code
  create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return this.usersService.create(createUserDto);
  }


  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string): Promise<Boolean> {
    return this.usersService.remove(id);
  }


  @Put(':id')
  update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<IUser | null> {
    return this.usersService.update(id, updateUserDto);
  }

}
