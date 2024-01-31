import API, { AuthAPI, SigninData, SignupData } from '../api/AuthAPI'
import store from '../utils/Store'
import router from '../utils/Router'
import MessageController from './MessagesController'
import { Routes } from '../index'

export class AuthController {
  private readonly api: AuthAPI
  constructor() {
    this.api = API
  }
  async signin(data: SigninData) {
    try {
      await this.api.signin(data)
      await this.fetchUser()
      router.go(Routes.Profile)
    } catch (e) {
      console.error(e)
    }
  }

  async singup(data: SignupData) {
    try {
      await this.api.signup(data)
      await this.fetchUser()

      router.go(Routes.Profile)
    } catch (e: any) {
      console.error(e)
    }
  }
  async fetchUser() {
    const user = await this.api.read()
    store.set('user', user)
  }
  async logout() {
    try {
      MessageController.closeAll()
      await this.api.logout()

      router.go(Routes.Home)
    } catch (e: any) {
      console.error(e.message)
    }
  }
}

export default new AuthController()
