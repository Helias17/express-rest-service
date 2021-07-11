import { HttpStatus } from '@nestjs/common';
import {
  Controller,
  Post,
  HttpCode,
  Body
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';

@Controller('login')
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto,) {
    return await this.loginService.checkLoginPass(loginDto);
  }

}
