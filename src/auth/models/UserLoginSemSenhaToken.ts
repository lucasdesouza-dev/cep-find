import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserLoginSemSenhaToken {
  @ApiProperty({ example: 'asjhdgakjsdcg.kajhsdçoahysdhabdalsjk' })
  @IsString()
  loginsemsenha_token: string;
}