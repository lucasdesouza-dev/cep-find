import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PrismaService } from 'src/prisma/prisma.service';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class ConfirmEmailService {
  constructor(

    private readonly prisma: PrismaService,
  ) { }

  async update(user: User) {
    const { email } = user;
    if (user) {
      const updateUser = await this.prisma.user
        .update({
          where: {
            email: email,
          },
          data: {
            confirmEmail: true,
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
        throw new HttpException(
          'Email Confirmado!',
          HttpStatus.OK,
        );
      } else {
        throw new HttpException(
          'Email não confirmado! Erro ao gravar no banco de dados',
          HttpStatus.FOUND,
        );
      }
    }
  }
}
