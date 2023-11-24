import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateLoginSemSenhaDto } from './dto/create-login-sem-senha.dto';
import { UpdateLoginSemSenhaDto } from './dto/update-login-sem-senha.dto';
import { UserService } from 'src/user/user.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';
import { UserPayload } from 'src/auth/models/UserPayload';
@Injectable()
export class LoginSemSenhaService {
  constructor(
    private readonly userService: UserService,
    private mailerService: MailService,
    private jwtService: JwtService,
    
  ) {}

  async create(createLoginSemSenhaDto: CreateLoginSemSenhaDto) {
    const user: User = await this.userService.findByEmail(
      createLoginSemSenhaDto.email,
    );

    if (user) {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        confirmEmail: user.confirmEmail,
        tenantUuid: user.tenantUuid
      };

      const loginSemSenhaJwtToken = this.jwtService.sign(payload, {
        secret: process.env.JWT_SECRET_LOGINSEMSENHA,
        expiresIn: `${process.env.LOGINSEMSENHA_TOKEN_DURATION}`,
      });
       this.mailerService.sendLoginSemSenha(user, loginSemSenhaJwtToken);
      Logger.log(`Email login sem senha enviado para  ${user.email}`);
      throw new UnauthorizedException(
        `Email de login sem senha enviado com sucesso!`,
      );
    } else {
      throw new UnauthorizedException('Usuario não encontrado');
    }
    }

  }

