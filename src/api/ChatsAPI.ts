import BaseAPI from './BaseAPI'
import { UserData } from './AuthAPI'

export interface ChatInfo {
  id: number
  title: string
  avatar: string
  unread_count: number
  last_message: {
    user: UserData
    time: string
    content: string
  }
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats')
  }
  public create(title: string) {
    return this.http.post('/', title)
  }
  public delete(id: number) {
    return this.http.delete('/', { chatId: id })
  }
  public read(): Promise<ChatInfo[]> {
    return this.http.get('/')
  }
  public getUsers(id: number): Promise<Array<UserData & { role: string }>> {
    return this.http.get(`/${id}/users`)
  }
  public addUsers(users: number[], id: number) {
    return this.http.put('/', { users, chatId: id })
  }
  public async getToken(id: number): Promise<string> {
    const response = await this.http.post<{ token: string }>(`/token/${id}`)
    return response.token
  }

  update = undefined
}

export default new ChatsAPI()
