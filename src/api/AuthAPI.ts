import BaseAPI from './BaseAPI.ts';

export interface SigninData {
  login: string;
  password: string;
}

export interface SignupData {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  repeatPassword: string;
  phone: string;
}

export interface UserData {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  phone: string;
  login: string;
  avatar: string;
  email: string;
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth');
  }

  public signin(data: SigninData): Promise<XMLHttpRequest> {
    return this.http.post('/signin', data);
  }
  public signup(data: SignupData): Promise<XMLHttpRequest> {
    return this.http.post('/signup', data);
  }
  public logout() {
    return this.http.post('/logout');
  }
  public read(): Promise<XMLHttpRequest> {
    return this.http.get('/user');
  }

  create = undefined;
  update = undefined;
  delete = undefined;
}

export default new AuthAPI();
