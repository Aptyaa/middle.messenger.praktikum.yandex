import { UserData } from '../api/AuthAPI'
import { ChatInfo } from '../api/ChatsAPI'
import { Message } from '../controllers/MessagesController'
import Block from './Block'
import { EventBus } from './EventBus'
import { set } from './helpers'

export enum StoreEvents {
  Updated = 'updated',
}

interface State {
  user: UserData
  chat: ChatInfo[]
  messages: Record<number, Message[]>
  selectedChat?: number
}

export class Store extends EventBus {
  private state: any = {}

  public getState() {
    return this.state
  }
  public set(path: string, value: unknown) {
    set(this.state, path, value)

    this.emit(StoreEvents.Updated, this.getState())
  }
}

const store = new Store()

//@ts-ignore

window.store = store

export function withStore<SP>(mapStateToProps: (state: State) => SP) {
  return function wrap(Component: typeof Block) {
    return class WithStore extends Component {
      constructor(props: SP) {
        let previousState = mapStateToProps(store.getState())

        super({ ...props, ...previousState })

        store.on(StoreEvents.Updated, () => {
          const stateProps = mapStateToProps(store.getState())

          previousState = stateProps

          this.setProps({ ...stateProps })
        })
      }
    }
  }
}

export default store
