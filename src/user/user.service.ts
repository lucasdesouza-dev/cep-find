import {
  HttpException,
  HttpStatus,
  Injectable,
  Logger,
  
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { MailService } from '../mail/mail.service';
@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private mailerService: MailService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const token =  crypto.randomBytes(32).toString('hex');;
    const data = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, 10),
      tenant:{
        create:{}
      }
      
    };
    //@ts-ignore
    const createdUser = await this.prisma.user.create({ data }).catch((e) => {
      if (e instanceof PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === 'P2002') {
          throw new UnauthorizedException('Usuario ja existe');
        }
      }
    });


    if (createdUser) {
      
      await this.mailerService.sendUserConfirmation(createdUser, token);
    Logger.log(`Email de confirmaçao enviado para ${createdUser.email}`);
    }

    if (createdUser) {
      throw new HttpException('Conta criada com sucesso!', HttpStatus.CREATED);
    } else {
      throw new HttpException(
        'Conta não cadastrado! Erro ao gravar no banco de dados',
        HttpStatus.FOUND,
      );
    }
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }
}
