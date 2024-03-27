import { UserData } from '../api/AuthAPI.ts';
import { ChatInfo } from '../api/ChatsAPI.ts';
import { Message } from '../controllers/MessagesController.ts';
import Block from './Block.ts';
import { EventBus } from './EventBus.ts';
import { isEqual, set } from './helpers.ts';

export enum StoreEvents {
  Updated = 'updated',
}

export interface State {
  user?: UserData;
  chats?: ChatInfo[];
  messages?: Record<number, Message[]>;
  selectedChat?: number;
  findedUsers?: UserData[];
  selectUser?: number;
}

export class Store extends EventBus {
  private state: State = {};

  public getState() {
    return this.state;
  }
  public set(path: string, value: unknown) {
    set(this.state, path, value);

    this.emit(StoreEvents.Updated);
  }
}

const store = new Store();

export function withStore(mapStateToProps: (state: State) => any) {
  return function (Component: typeof Block) {
    let oldState = mapStateToProps(store.getState());
    return class extends Component {
      constructor(props: any) {
        super({ ...props, ...mapStateToProps(store.getState()) });

        store.on(StoreEvents.Updated, () => {
          let newState = mapStateToProps(store.getState());
          if (!isEqual(oldState, newState)) {
            this.setProps({ ...mapStateToProps(store.getState()) });
          }
        });
      }
    };
  };
}

export default store;
