import { User } from 'src/user/entities/user.entity';

export interface UserFromJwt {
  id: string;
  email: string;
  name: string;
  confirmEmail: boolean;
  tenantUuid: string;
}
