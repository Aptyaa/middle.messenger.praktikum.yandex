import API, { UserPassword, UsersAPI } from '../api/UsersAPI';
import { UserData } from '../api/AuthAPI';
import store from '../utils/Store';
import { submitValidation } from '../utils/validation';
import { errorHandling } from '../utils/helpers';

export class UserController {
  private readonly api: UsersAPI;

  constructor() {
    this.api = API;
  }
  async changeProfile(data: UserData) {
    const isValid = submitValidation(data);
    if (isValid) {
      const response = await this.api.changeProfile(data);
      try {
        errorHandling(response);
        store.set('user', response.response);
      } catch (e: any) {
        alert(e.reason);
      }
    } else {
      alert('Некорректные данные');
    }
    return isValid;
  }

  public async changePassword(data: UserPassword) {
    const isValid = submitValidation(data);
    if (isValid) {
      const { oldPassword, password } = data;
      const response = await this.api.changePassword({
        oldPassword,
        newPassword: password!,
      });

      try {
        errorHandling(response);
      } catch (e: any) {
        alert(e);
      }
    }
    return isValid;
  }
  public async changeAvatar(avatar: FormData) {
    const response = await this.api.changeAvatar(avatar);
    try {
      errorHandling(response);
      store.set('user', response.response);
    } catch (e: any) {
      alert(e.reason);
    }
  }
  public async searchUser(login: string) {
    const response = await this.api.searchUser(login);
    try {
      errorHandling(response);
      store.set('findedUsers', response.response);
    } catch (e: any) {
      alert(e.reason);
    }
  }
  public resetFindedUsers() {
    store.set('findedUsers', []);
  }

  public selectUser(id: number) {
    store.set('selectUser', id);
  }
}

export default new UserController();
