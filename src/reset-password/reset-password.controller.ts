import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ResetPasswordService } from './reset-password.service';
import { CreateResetPasswordDto } from './dto/create-reset-password.dto';
import { UpdateResetPasswordDto } from './dto/update-reset-password.dto';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { User } from 'src/user/entities/user.entity';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('reset-password')
@Controller('reset-password')
export class ResetPasswordController {
  constructor(private readonly resetPasswordService: ResetPasswordService) {}
  @IsPublic()
  @Post()
  create(@Body() createResetPasswordDto: CreateResetPasswordDto) {
    return this.resetPasswordService.create(createResetPasswordDto);
  }

  @ApiBearerAuth('JWT-auth')
  @Patch()
  update(
    @CurrentUser() user: User,
    @Body() updateResetPasswordDto: UpdateResetPasswordDto,
  ) {
    return this.resetPasswordService.update(user, updateResetPasswordDto);
  }
}
