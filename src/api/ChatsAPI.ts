import BaseAPI from './BaseAPI.ts';
import { UserData } from './AuthAPI.ts';

export interface ChatInfo {
  id: number;
  title: string;
  avatar: string;
  unread_count: number;
  last_message?: {
    user: UserData;
    time: string;
    content: string;
  };
}

export class ChatsAPI extends BaseAPI {
  constructor() {
    super('/chats');
  }
  public create(title: string) {
    return this.http.post('/', { title });
  }
  public delete(id: number) {
    return this.http.delete('/', { chatId: id });
  }
  public read(): Promise<XMLHttpRequest> {
    return this.http.get('/');
  }
  public getUsers(id: number): Promise<XMLHttpRequest> {
    return this.http.get(`/${id}/users`);
  }
  public addUsers(users: number[], id: number) {
    return this.http.put('/users', { users: [users], chatId: id }, false);
  }
  public fetchChatUsers(id: number) {
    return this.http.get(`/${id}/users`);
  }
  public deleteUsers(users: number[], id: number) {
    return this.http.delete('/users', { users: [users], chatId: id });
  }
  public changeAvatar(data: FormData) {
    return this.http.put('/avatar', data, true);
  }
  public async getToken(id: number): Promise<string> {
    const response = await this.http.post(`/token/${id}`);
    return response.response.token;
  }

  update = undefined;
}

export default new ChatsAPI();
