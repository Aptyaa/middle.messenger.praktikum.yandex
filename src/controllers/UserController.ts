import API, { UserPassword, UsersAPI } from '../api/UsersAPI.ts';
import { UserData } from '../api/AuthAPI.ts';
import store from '../utils/Store.ts';
import { submitValidation } from '../utils/validation.ts';
import { errorHandling } from '../utils/helpers.ts';

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
      } catch (e) {
        alert(e);
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
      } catch (e) {
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
    } catch (e) {
      alert(e);
    }
  }
  public async searchUser(login: string) {
    const response = await this.api.searchUser(login);
    try {
      errorHandling(response);
      store.set('findedUsers', response.response);
    } catch (e) {
      alert(e);
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
