import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import UserEntity from '../../entity/User';
import { IUser } from '../../interfaces/IUser';
import { TasksService } from '../tasks/tasks.service';

const bcrypt = require('bcrypt');


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

    @Inject('TasksService')
    private readonly tasksService: TasksService
  ) { }

  async getAll(): Promise<IUser[] | null> {
    const usersAll = await this.usersRepository.find();
    if (usersAll.length) {
      const usersWithoutPasswords = usersAll.map(userItem => UserEntity.toResponse(userItem))
      return usersWithoutPasswords;
    }
    return null;
  }

  async getById(id: string): Promise<IUser | null> {
    const userById = await this.usersRepository.findOne({ id });
    if (userById) {
      const userWithoutPassword = UserEntity.toResponse(userById);
      return userWithoutPassword;
    }
    return null;
  }


  async create(userDto: CreateUserDto): Promise<IUser> {

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(userDto.password, saltRounds);
    const userData = { ...userDto, password: passwordHash };

    let newUser = new UserEntity();
    newUser = { ...newUser, ...userData };
    await this.usersRepository.save(newUser);

    return { id: newUser.id, name: newUser.name, login: newUser.login };
  }


  async remove(id: string): Promise<Boolean> {
    let isUserDeleted = false;

    const foundUser = await this.usersRepository.findOne({ 'id': id });

    if (foundUser) {
      await this.usersRepository.remove(foundUser);
      isUserDeleted = true;
      await this.tasksService.updateTasksAfterUserDeleted(id);
    }

    return isUserDeleted;
  }


  async update(id: string, userDto: UpdateUserDto): Promise<IUser | null> {
    const foundUser = await this.usersRepository.findOne({ id });
    if (foundUser) {
      const saltRounds = 10;
      const passwordHash = await bcrypt.hash(userDto.password, saltRounds);
      const userData = { ...foundUser, ...userDto, password: passwordHash };
      await this.usersRepository.save(userData);

      return { id: userData.id, name: userData.name, login: userData.login };
    }
    return null;
  }

  async getByLogin(login: string): Promise<UserEntity | null> {
    const userByLogin = await this.usersRepository.findOne({ login });
    if (userByLogin) {
      return userByLogin;
    }
    return null;
  }


}
