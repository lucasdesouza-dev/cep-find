
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Headers,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Request } from '@nestjs/common';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { ApiTags, ApiBody, ApiBearerAuth } from '@nestjs/swagger';
import { LoginRequestBody } from './models/LoginRequestBody';
import { UserRefreshToken } from './models/UserRefreshToken';
import { UserLoginSemSenhaToken } from './models/UserLoginSemSenhaToken';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @ApiTags('auth')
  @ApiBody({
    type: LoginRequestBody,
    // description: 'Reason Code',
    required: true,
    isArray: false,
  })
  @IsPublic()
  @Post('auth/login')
  @UseGuards(LocalAuthGuard)
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  @ApiBody({
    type: UserRefreshToken,
    // description: 'Reason Code',
    required: true,
    isArray: false,
  })
  @ApiTags('auth')
  @ApiBearerAuth('JWT-auth')
  @Post('auth/refresh')
  async reautenticar(@Body() body) {
    return this.authService.reautenticar(body); //este método será implementado abaixo, portanto é esperado que de erro.
  }
  @IsPublic()
  @ApiBody({
    type: UserLoginSemSenhaToken,
    // description: 'Reason Code',
    required: true,
    isArray: false,
  })
  @ApiTags('auth')
  @ApiBearerAuth('JWT-auth')
  @Post('auth/loginsemsenhatoken')
  async LoginSemSenha(@Body() body) {
    return this.authService.loginSemSenha(body); //este método será implementado abaixo, portanto é esperado que de erro.
  }
}


