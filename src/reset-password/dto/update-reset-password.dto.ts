import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateResetPasswordDto } from './create-reset-password.dto';
import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class UpdateResetPasswordDto extends PartialType(CreateResetPasswordDto) {
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
}
