import BaseAPI from './BaseAPI';
import { UserData } from './AuthAPI';

export interface UserPassword {
  oldPassword: string;
  newPassword: string;
  password?: string;
}

export class UsersAPI extends BaseAPI {
  constructor() {
    super('/user');
  }
  public changeProfile(data: Partial<UserData>): Promise<XMLHttpRequest> {
    return this.http.put('/profile', data);
  }
  public changePassword(data: UserPassword) {
    return this.http.put('/password', data);
  }
  public changeAvatar(avatar: FormData): Promise<XMLHttpRequest> {
    return this.http.put('/profile/avatar', avatar, true);
  }
  public searchUser(login: string): Promise<XMLHttpRequest> {
    return this.http.post('/search', { login });
  }
  create = undefined;
  read = undefined;
  update = undefined;
  delete = undefined;
}

export default new UsersAPI();
