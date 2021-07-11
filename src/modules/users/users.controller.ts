import { UseGuards } from '@nestjs/common';
import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Delete,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { IUser } from '../../interfaces/IUser';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async getAll(): Promise<IUser[] | null> {
    return await this.usersService.getAll();
  }


  @Get(':id')
  async getOne(@Param('id') id: string): Promise<IUser | null> {
    return await this.usersService.getById(id);
  }


  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<IUser> {
    return await this.usersService.create(createUserDto);
  }


  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Boolean> {
    return await this.usersService.remove(id);
  }


  @Put(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id') id: string,
  ): Promise<IUser | null> {
    return await this.usersService.update(id, updateUserDto);
  }

}
