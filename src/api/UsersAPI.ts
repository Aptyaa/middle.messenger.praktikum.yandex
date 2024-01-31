import BaseAPI from './BaseAPI'
import { UserData } from './AuthAPI'

export class UsersAPI extends BaseAPI {
  constructor() {
    super('/user')
  }
  public changeProfile(data: Partial<UserData>): Promise<UserData> {
    return this.http.put('/profile', data)
  }
  public changePassword(oldPass: string, newPass: string) {
    return this.http.put('/password', {
      oldPassword: oldPass,
      newPassword: newPass,
    })
  }
  public changeAvatar(avatar: FormData): Promise<UserData> {
    return this.http.put('/profile.avatar', avatar)
  }

  create = undefined
  read = undefined
  update = undefined
  delete = undefined
}

export default new UsersAPI()
