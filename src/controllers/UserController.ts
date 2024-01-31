import API, { UsersAPI } from '../api/UsersAPI'
import { UserData } from '../api/AuthAPI'
import store from '../utils/Store'

export class UserController {
  private readonly api: UsersAPI

  constructor() {
    this.api = API
  }
  public async changeProfile(data: UserData) {
    try {
      const response = await this.api.changeProfile(data)

      store.set('currentUser', response)
    } catch (e) {
      console.error(e)
    }
  }

  public async changePassword(oldPass: string, newPass: string) {
    try {
      await this.api.changePassword(oldPass, newPass)
    } catch (e) {
      console.error(e)
    }
  }
  public async changeAvatar(avatar: FormData) {
    try {
      const response = await this.api.changeAvatar(avatar)
      store.set('currentUser', response)
    } catch (e) {
      console.error(e)
    }
  }
}

export default new UserController()
