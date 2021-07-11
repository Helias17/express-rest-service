import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import jwt from 'jsonwebtoken';

import { LoginDto } from './dto/login.dto';
import UserEntity from '../../entity/User';
import { JWT_SECRET_KEY } from '../../common/config';


const bcrypt = require('bcrypt');


@Injectable()
export class LoginService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,

  ) { }

  async checkLoginPass(loginData: LoginDto) {
    const user = await this.usersRepository.findOne({ login: loginData.login });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.FORBIDDEN);
    }

    const isPasswordValid = await bcrypt.compare(loginData.password, user.password);
    if (isPasswordValid) {
      const payload = { login: user.login, id: user.id };
      const token = jwt.sign(payload, JWT_SECRET_KEY!, { expiresIn: 600 });
      return { token };
    } else {
      throw new HttpException('Invalid password', HttpStatus.FORBIDDEN);
    }
  }

}
