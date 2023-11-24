import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendUserConfirmation(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Time de Suporte" <suporte@controlefinanceiro.com>', // override default from
      subject: 'Bem vindo ao Controle Financeiro! Confirme seu email!',
      template: './email-confirmation.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        token,
      },
    });
  }

  async sendResetPassword(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Time de Suporte" <suporte@controlefinanceiro.com>', // override default from
      subject: 'Bem vindo ao Controle Financeiro! Recuperação de senha!',
      template: './reset-password.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        token,
      },
    });
  }
    async sendLoginSemSenha(user: User, token: string) {
    await this.mailerService.sendMail({
      to: user.email,
      from: '"Time de Suporte" <suporte@controlefinanceiro.com>', // override default from
      subject: 'Bem vindo ao Controle Financeiro! Login Sem Senha!',
      template: './login-sem-senha.hbs', // `.hbs` extension is appended automatically
      context: {
        // ✏️ filling curly brackets with content
        name: user.name,
        token,
      },
    });
  
  }
}
