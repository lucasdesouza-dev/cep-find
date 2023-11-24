import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty({
    description: 'email usado para cadastro de usuario',
    example: 'email@email.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'senha usada para login.',
    example: 'Abcd@1234',
  })
  @IsString()
  @MinLength(8)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Senha Fraca!',
  })
  password: string;

  @ApiProperty({
    description: 'nome para identificação do usuario',
    example: 'Lucas Souza',
  })
  @IsString()
  name: string;
  
  @IsOptional()
  @IsString()
  confirmEmail: boolean;
}
