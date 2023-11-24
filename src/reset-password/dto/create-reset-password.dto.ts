import { IsEmail } from 'class-validator';
import { ResetPassword } from '../entities/reset-password.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateResetPasswordDto extends ResetPassword {
  @ApiProperty()
  @IsEmail()
  email: string;
}
