import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import UserEntity from '../../entity/User';
import { LoginController } from './login.controller';
import { LoginService } from './login.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity])
  ],
  providers: [LoginService],
  controllers: [LoginController],
})
export default class LoginModule { }
