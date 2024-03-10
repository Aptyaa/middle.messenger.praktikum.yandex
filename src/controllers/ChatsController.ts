import API, { ChatInfo, ChatsAPI } from '../api/ChatsAPI';
import store from '../utils/Store';
import { errorHandling } from '../utils/helpers';
import MessageController from './MessagesController';

class ChatsController {
  private readonly api: ChatsAPI;

  constructor() {
    this.api = API;
  }

  async create(title: string) {
    const response = await this.api.create(title);
    try {
      errorHandling(response);
      this.fetchChats();
    } catch (e: any) {
      alert(e);
    }
  }

  async fetchChats() {
    const response = await this.api.read();
    const chats = response.response;
    try {
      errorHandling(response);
      chats.map(async (chat: ChatInfo) => {
        const token = await this.getToken(chat.id);
        await MessageController.connect(chat.id, token as string);
      });
      store.set('chats', chats);
    } catch (e: any) {
      alert(e);
    }
  }

  public async addUserToChat(id: number, userId: number[]) {
    const response = await this.api.addUsers(userId, id);
    try {
      errorHandling(response);
    } catch (e: any) {
      alert(e);
    }
  }
  public async deleteUsers(id: number, userId: number[]) {
    const response = await this.api.deleteUsers(userId, id);
    try {
      errorHandling(response);
    } catch (e: any) {
      alert(e);
    }
  }
  public async delete(id: number) {
    const response = await this.api.delete(id);
    try {
      errorHandling(response);
      store.set('selectedChat', undefined);
      this.fetchChats();
    } catch (e: any) {
      alert(e);
    }
  }

  public async fetchChatUsers(id: number) {
    const response = await this.api.fetchChatUsers(id);
    try {
      errorHandling(response);
      store.set('findedUsers', response.response);
    } catch (e: any) {
      alert(e);
    }
  }

  public async getToken(id: number) {
    return await this.api.getToken(id);
  }
  public async setAvatar(data: FormData) {
    const response = await this.api.changeAvatar(data);
    try {
      errorHandling(response);
      await this.fetchChats();
    } catch (e: any) {
      alert(e);
    }
  }

  public selectChat(id: number) {
    console.log(`chat ${id} selected`);

    store.set('selectedChat', id);
  }
}

export default new ChatsController();
