import { Module } from '@nestjs/common';
import { ConfirmEmailService } from './confirm-email.service';
import { ConfirmEmailController } from './confirm-email.controller';
import { JwtModule} from '@nestjs/jwt';

@Module({
  imports: [JwtModule],
  controllers: [ConfirmEmailController],
  providers: [ConfirmEmailService],
})
export class ConfirmEmailModule {}
