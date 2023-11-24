import { HttpException, HttpStatus, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset-password.dto';
import { UserPayload } from 'src/auth/models/UserPayload';
import { User } from 'src/user/entities/user.entity';
import { UserService } from './../user/user.service';
import { MailService } from 'src/mail/mail.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
@Injectable()
export class ResetPasswordService {
  constructor(
    private readonly userService: UserService,
    private mailerService: MailService,
    private jwtService: JwtService,
    private readonly prisma: PrismaService,
  ) { }
  async create(createResetPasswordDto: CreateResetPasswordDto) {
    const user: User = await this.userService.findByEmail(
      createResetPasswordDto.email,
    );

    if (user) {
      const payload: UserPayload = {
        sub: user.id,
        email: user.email,
        name: user.name,
        confirmEmail: user.confirmEmail,
        tenantUuid: user.tenantUuid,
      };


      const jwtToken = this.jwtService.sign(payload);
      this.mailerService.sendResetPassword(user, jwtToken);
      Logger.log(`Email de reset de senha enviado para ${user.email}`);
      throw new UnauthorizedException(
        `Email de reset de senha enviado com sucesso!`,
      );
    } else {
      throw new UnauthorizedException('Usuario não encontrado');
    }
  }

  findAll() {
    return `This action returns all resetPassword`;
  }

  findOne(id: number) {
    return `This action returns a #${id} resetPassword`;
  }

  async update(user, updateResetPasswordDto: UpdateResetPasswordDto) {
    const { email } = user;
    const { password } = updateResetPasswordDto;
    if (user) {
      const updateUser = await this.prisma.user
        .update({
          where: {
            email: email,
          },
          data: {
            password: await bcrypt.hash(password, 10),

          },
        })
        .catch((e) => {
          if (e instanceof PrismaClientKnownRequestError) {
            // The .code property can be accessed in a type-safe manner
            if (e.code === 'P2002') {
              throw new UnauthorizedException('Usuario não encontrado');
            }
          }
        });
      if (updateUser) {
        throw new HttpException('Senha Resetada com sucesso!', HttpStatus.OK);
      } else {
        throw new HttpException(
          'Email não confirmado! Erro ao gravar no banco de dados',
          HttpStatus.FOUND,
        );
      }
    }
  }

  remove(id: number) {
    return `This action removes a #${id} resetPassword`;
  }
}
