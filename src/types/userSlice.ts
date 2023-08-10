import { User } from './user';

export interface IUserSlice {
  _name: string;
  accessToken: string | null;
  profile: User;
  wishList: Array<string>;
}
