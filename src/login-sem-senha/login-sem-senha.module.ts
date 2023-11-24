import { Module } from '@nestjs/common';
import { LoginSemSenhaService } from './login-sem-senha.service';
import { LoginSemSenhaController } from './login-sem-senha.controller';
import { UserModule } from 'src/user/user.module';
import { MailModule } from 'src/mail/mail.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    UserModule,
    MailModule,
    JwtModule
  ],
  controllers: [LoginSemSenhaController],
  providers: [LoginSemSenhaService],
})
export class LoginSemSenhaModule {}
