import BaseAPI from './BaseAPI'

export interface SigninData {
  login: string
  password: string
}

export interface SignupData {
  first_name: string
  second_name: string
  login: string
  email: string
  password: string
  phone: string
}

export interface UserData {
  first_name: string
  second_name: string
  display_name: string
  login: string
  phone: string
  email: string
}

export class AuthAPI extends BaseAPI {
  constructor() {
    super('/auth')
  }

  public signin(data: SigninData) {
    return this.http.post('/signin', data)
  }
  public signup(data: SignupData) {
    return this.http.post('/signup', data)
  }
  public logout() {
    return this.http.post('/logout')
  }
  public read(): Promise<UserData> {
    return this.http.get('/user')
  }

  create = undefined
  update = undefined
  delete = undefined
}

export default new AuthAPI()
