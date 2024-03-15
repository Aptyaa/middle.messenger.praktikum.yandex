import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI';
import store from '../utils/Store';
import router from '../utils/Router';
import MessageController from './MessagesController';
import { submitValidation } from '../utils/validation';
import { Routes } from '../index';
import { errorHandling } from '../utils/helpers';

export class AuthController {
  private readonly api: AuthAPI;
  constructor() {
    this.api = API;
  }
  async signin(data: SigninData) {
    const isValid = submitValidation(data);
    if (isValid) {
      const response = await this.api.signin(data);
      try {
        errorHandling(response);

        router.go(Routes.Messenger);
      } catch (e) {
        if (e === 'User already in system') router.go(Routes.Messenger);
        else alert(e);
      }
    }
  }
  async fetchUser() {
    const response = await this.api.read();
    const user = response.response;
    try {
      errorHandling(response);
      store.set('user', user);
    } catch (e) {
      alert(e);
      throw new Error(e as string);
    }
  }
  async singup(data: SignupData) {
    const isValid = submitValidation(data);
    if (isValid) {
      const response = await this.api.signup(data);
      try {
        errorHandling(response);
        router.go(Routes.Messenger);
      } catch (e) {
        if (e === 'User already in system') router.go(Routes.Messenger);
        else alert(e);
      }
    }
  }

  async logout() {
    const response = await this.api.logout();
    try {
      errorHandling(response);
      MessageController.closeAll();

      router.go(Routes.Index);
    } catch (e) {
      alert(e);
    }
  }
}

export default new AuthController();
