import { IsString } from 'class-validator';
import { LoginSemSenha } from '../entities/login-sem-senha.entity';

export class CreateLoginSemSenhaDto extends LoginSemSenha{
  @IsString()
  email:string
}
