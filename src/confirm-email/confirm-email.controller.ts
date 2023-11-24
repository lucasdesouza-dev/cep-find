import { Controller, Patch  } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email.service';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('confirm-email')
@Controller('confirm-email')
export class ConfirmEmailController {
  constructor(private readonly confirmEmailService: ConfirmEmailService) {}
  @ApiBearerAuth('JWT-auth')
  @Patch()
  update(@CurrentUser() user: User) {
    return this.confirmEmailService.update(user);
  }
}
