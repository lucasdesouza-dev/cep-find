import { UserToken } from './models/UserToken';
import { User } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from './models/UserPayload';
import { MailService } from 'src/mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private mailerService: MailService,
  ) {}

  async gerarToken(payload: User) {
    const accessToken = this.jwtService.sign(payload);

    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: `${process.env.REFRESH_TOKEN_DURATION}`,
    });
    return { access_token: accessToken, refresh_token: refreshToken };
  }

  login(user: User): UserToken {
    // Transforma o user em um JWT
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      confirmEmail: user.confirmEmail,
     
      tenantUuid: user.tenantUuid,
    };

    const jwtToken = this.jwtService.sign(payload);

    const refreshJwtToken = this.jwtService.sign(payload, {
      secret: process.env.JWT_SECRET_REFRESH,
      expiresIn: `${process.env.REFRESH_TOKEN_DURATION}`,
    });

    

    if (!user.confirmEmail) {
      this.mailerService.sendUserConfirmation(user, jwtToken);
      throw new UnauthorizedException('Email não verificado!');
    }
    return {
      access_token: jwtToken,
      refresh_token: refreshJwtToken,
    };
  }

  async validateUser(email: string, password: string) {
    const user: User = await this.userService.findByEmail(email);
    // checar se a senha informada corresponde a hash que esta no banco
    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      } else {
        throw new Error('Senha invalida !');
      }
    }

    // se chegar ate aqui , significa que nao encontrou um user
    throw new Error('Usuario não encontrado !');
  }

  private async verificarRefreshToken(body) {
    const refreshToken = body.refresh_token;

    if (!refreshToken) {
      throw new NotFoundException('Usuário não encontrado');
    }

    const email = this.jwtService.decode(refreshToken)['email'];
    const usuario = await this.userService.findByEmail(email);

    if (!usuario) {
      throw new NotFoundException('Usuário não encontrado');
    }

    try {
      this.jwtService.verify(refreshToken, {
        secret: process.env.JWT_SECRET_REFRESH,
      });
      return usuario;
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }

  async reautenticar(body) {
    const payload: User = await this.verificarRefreshToken(body); ////este método também será implementado abaixo

    return this.gerarToken(payload);
  }

   async loginSemSenha(body) {
    const loginSemSenhaToken = body.loginsemsenha_token;

    const email = this.jwtService.decode(loginSemSenhaToken)['email'];
    const usuario = await this.userService.findByEmail(email);

    if (!loginSemSenhaToken) {
      throw new NotFoundException('Token invalido');
    }
    try {
      this.jwtService.verify(loginSemSenhaToken, {
        secret: process.env.JWT_SECRET_LOGINSEMSENHA,
      });
      return this.gerarToken(usuario);
    } catch (err) {
      if (err.name === 'JsonWebTokenError') {
        throw new UnauthorizedException('Assinatura Inválida');
      }
      if (err.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token Expirado');
      }
      throw new UnauthorizedException(err.name);
    }
  }
}
