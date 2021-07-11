import { HttpStatus, UseFilters } from '@nestjs/common';
import {
  Controller,
  Post,
  HttpCode,
  Body
} from '@nestjs/common';
import { LoginService } from './login.service';
import { LoginDto } from './dto/login.dto';
import { HttpExceptionFilter } from '../../filters/http-exception.filter';

@Controller('login')
@UseFilters(new HttpExceptionFilter())
export class LoginController {
  constructor(private readonly loginService: LoginService) { }

  @Post()
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto,) {
    return await this.loginService.checkLoginPass(loginDto);
  }

}
