import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LoginSemSenhaService } from './login-sem-senha.service';
import { CreateLoginSemSenhaDto } from './dto/create-login-sem-senha.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { ApiTags } from '@nestjs/swagger';
@ApiTags("auth")
@Controller('loginsemsenha')
export class LoginSemSenhaController {
  constructor(private readonly loginSemSenhaService: LoginSemSenhaService) {}
  @IsPublic()
  @Post()
  create(@Body() createLoginSemSenhaDto: CreateLoginSemSenhaDto) {
    return this.loginSemSenhaService.create(createLoginSemSenhaDto);
  }

 
}
