import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginRequestBody {
  @ApiProperty({example:"email@email.com"})
  @IsEmail()
  email: string;
  @ApiProperty({example:"Abcd@1234"})
  @IsString()
  password: string;
}
