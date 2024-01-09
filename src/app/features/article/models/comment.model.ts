import { CurrentUser } from '../../../core/models/user.model';

export interface Comment {
  id: string;
  body: string;
  createdAt: string;
  author: CurrentUser;
}
