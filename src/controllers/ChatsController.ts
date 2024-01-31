import API, { ChatsAPI } from '../api/ChatsAPI'
import store from '../utils/Store'
import MessageController from './MessagesController'

class ChatsController {
  private readonly api: ChatsAPI

  constructor() {
    this.api = API
  }

  async create(title: string) {
    this.api.create(title)

    this.fetchChats()
  }

  async fetchChats() {
    try {
      const chats = await this.api.read()
      chats.map(async chat => {
        const token = await this.getToken(chat.id)
        await MessageController.connect(chat.id, token)
      })

      store.set('chats', chats)
    } catch (e: any) {
      console.error(e.message)
    }
  }

  public addUserToChat(id: number, userId: number) {
    this.api.addUsers([userId], id)
  }
  public async delete(id: number) {
    await this.api.delete(id)
    this.fetchChats()
  }

  public getToken(id: number) {
    return this.api.getToken(id)
  }

  public selectChat(id: number) {
    store.set('selectedChat', id)
  }
}

export default new ChatsController()
