import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { CategoriaModule } from './categoria/categoria.module';
import { ConfirmEmailModule } from './confirm-email/confirm-email.module';
import { LoginSemSenhaModule } from './login-sem-senha/login-sem-senha.module';
import { ResetPasswordModule } from './reset-password/reset-password.module';
import { MethodsService } from './services/Methods/Methods.service';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    CategoriaModule,
    ConfirmEmailModule,
    ResetPasswordModule,

    LoginSemSenhaModule,


  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    }, MethodsService
  ],
})
export class AppModule { }
