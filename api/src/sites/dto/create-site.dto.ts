import { User } from 'src/users/entities/user.entity';

export class CreateSiteDto {
  user: User['id'];
  name: string;
  url: string;
}
