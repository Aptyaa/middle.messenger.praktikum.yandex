import Block from '../../utils/Block';
import Input from '../Input';
import { Button } from '../Button';
import ChatsController from '../../controllers/ChatsController';
import MessageController from '../../controllers/MessagesController';
import { Message as MessageInfo } from '../../controllers/MessagesController';
import SentMessage from '../SentMessage';
import template from './chat.hbs';
import './chat.scss';
import { ChatInfo } from '../../api/ChatsAPI';
import { debounceInput, setAvatar } from '../../utils/helpers';
import { withStore } from '../../utils/Store';
import Popup from '../PopupCreate';
import UserController from '../../controllers/UserController';
import { UserData } from '../../api/AuthAPI';
import Modal from '../Modal';
import ArrivedMessage from '../ArrivedMessage';

interface ChatProps {
  selectedChat: number | undefined;
  messages: MessageInfo[];
  user: UserData;
  findedUsers: string[];
  chats: ChatInfo[];
  events?: {
    click?: (e: Event) => void;
  };
}

export class Chat extends Block {
  constructor(props: ChatProps) {
    super({
      ...props,
      events: {
        click: (e: any) => {
          if (e.target.className === 'btn_popup') {
            (this.children.popup as Popup).toggleDisplay();
          }
        },
      },
    });
  }

  init() {
    this.children.messages = this.createMessages(this.props);
    this.children.modal = new Modal({
      modalClass: 'chat-modal',
      btnClass: 'submit_btn',
      onInput: (e: any) => {
        debounceInput(e.target.value);
      },
    });
    this.children.popup = new Popup({
      addUser: 'Добавить пользователя',
      deleteUser: 'Удалить пользователя',
      deleteChat: 'Удалить чат',
      setAvatar: 'Сменить аватар чата',
      class: 'popup_chat',
      events: {
        click: (e: any) => {
          if (e.target?.classList.contains('addUser')) {
            (this.children.modal as Modal).setProps({
              describeAction: 'Добавить пользователя в чат',
              label: 'Добавить пользователя',
              type: 'text',
              onClick: () => {
                ChatsController.addUserToChat(
                  this.props.selectedChat!,
                  this.props.selectUsers,
                );
                this.handleModal();
              },
            });
            const modal = this.children.modal as Modal;
            modal.show();
          }
          if (e.target?.classList.contains('deleteUser')) {
            ChatsController.fetchChatUsers(this.props.selectedChat!);
            const childrenModal = (this.children.modal as Modal).children;
            (childrenModal.input as Input).hide();

            (this.children.modal as Modal).setProps({
              describeAction: 'Удалить пользователя из чата',
              label: 'Удалить пользователя',
              type: 'text',
              classInput: 'hidden',
              onClick: () => {
                ChatsController.deleteUsers(
                  this.props.selectedChat!,
                  this.props.selectUsers,
                );
                this.handleModal();
              },
            });
            (this.children.modal as Modal).show();
          }
          if (e.target?.classList.contains('deleteChat')) {
            ChatsController.delete(this.props.selectedChat);
          }
          if (e.target?.classList.contains('setAvatar')) {
            (this.children.modal as Modal).setProps({
              describeAction: 'Поменять аватар чата',
              label: 'Поменять аватар',
              type: 'file',
              onClick: () => {
                const data = new FormData();
                const input = (
                  (this.children.modal as Modal).getContent() as HTMLElement
                ).querySelector('[type="file"]') as HTMLInputElement;
                data.append('chatId', this.props.selectedChat);
                if (input.files) {
                  data.append('avatar', input.files[0]);
                  ChatsController.setAvatar(data);
                  ChatsController.fetchChats();
                  (this.children.modal as Modal).hide();
                }
              },
            });
            (this.children.modal as Modal).show();
          }
          (this.children.popup as Popup).toggleDisplay();
        },
      },
    });
    this.children.input = new Input({
      type: 'text',
      placeholder: 'Сообщение',
      name: 'message',
      class: 'message-send',
    });
    this.children.button = new Button({
      class: 'button-send',
      type: 'submit',
      onClick: (e: any) => {
        e.preventDefault();
        const input = this.children.input as Input;
        let message = input.getValue();
        input.setValue('');
        MessageController.sendMessage(this.props.selectedChat!, message);
      },
    });
  }

  componentDidUpdate(_oldProps: any, newProps: any): boolean {
    this.children.messages = this.createMessages(newProps);
    const chat = this.props.chats?.find(
      (chat: ChatInfo) => chat.id === newProps.selectedChat,
    );
    this.setProps({
      ...this.props,
      ...newProps,
      avatar: setAvatar(chat?.avatar),
      name: chat?.title,
    });
    return true;
  }
  private createMessages(props: ChatProps) {
    return props.messages?.map((mes: MessageInfo) => {
      if (this.props.user.id === mes.user_id) {
        return new SentMessage({
          sent_message: mes.content,
        });
      } else {
        return new ArrivedMessage({
          arrived_message: mes.content,
        });
      }
    });
  }
  private handleModal() {
    (this.children.modal as Modal).hide();
    UserController.resetFindedUsers();
    const modalChildren = (this.children.modal as Modal).children;
    (modalChildren.input as Input).setValue('');
  }

  render() {
    return this.compile(template, {
      ...this.props,
    });
  }
}

const withChats = withStore((state: any) => {
  const selectedChatId = state.selectedChat;

  if (!selectedChatId) {
    return {
      messages: [],
      selectedChat: undefined,
      selectUsers: state.selectUser,
      user: state.user,
      chats: state.chats,
    };
  }

  return {
    messages: (state.messages || {})[selectedChatId] || [],
    selectedChat: state.selectedChat,
    selectUsers: state.selectUser,
    user: state.user,
    chats: state.chats,
  };
});

export default withChats(Chat as typeof Block);
