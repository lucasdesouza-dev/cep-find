import { PartialType } from '@nestjs/swagger';
import { CreateLoginSemSenhaDto } from './create-login-sem-senha.dto';

export class UpdateLoginSemSenhaDto extends PartialType(CreateLoginSemSenhaDto) {}
