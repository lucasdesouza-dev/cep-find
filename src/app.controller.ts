import { AppService } from './app.service';
import { Controller, Get, Res } from '@nestjs/common';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';
import { ApiBearerAuth, ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { IsPublic } from './auth/decorators/is-public.decorator';
@ApiTags('users')
@ApiBearerAuth('JWT-auth')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }
  @ApiExcludeEndpoint()
  @IsPublic()
  @Get()
  getHello(@Res() res) {
    res.status(302).redirect('/api/doc');
  }

  @Get('me')
  getMe(@CurrentUser() user: User) {
    return user;
  }
}
