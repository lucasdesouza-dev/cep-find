import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UserRefreshToken {
  @ApiProperty({ example: 'asjhdgakjsdcg.kajhsdçoahysdhabdalsjk' })
  @IsString()
  refresh_token: string;
}