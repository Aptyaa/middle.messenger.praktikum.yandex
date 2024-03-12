import Block from '../../utils/Block';
import { Routes } from '../../index';
import template from './sidebar.hbs';
import './sidebar.scss';
import { Ref } from '../Ref';
import Router from '../../utils/Router';
import { State, withStore } from '../../utils/Store';
import Popup from '../PopupCreate';
import Modal from '../Modal';
import { ChatInfo } from '../../api/ChatsAPI';
import DialogItem from '../DialogItem';
import ChatsController from '../../controllers/ChatsController';
import { transTime, setAvatar } from '../../utils/helpers';
import { Button } from '../Button';
import Input from '../Input';

interface SidebarProps {
  chats: ChatInfo[];
  isLoaded: boolean;
}

class Sidebar extends Block {
  constructor(props: SidebarProps) {
    super({
      ...props,
      events: {
        click: (e: Event) => {
          const popupChat = document.querySelector(
            '.popup-create',
          ) as HTMLButtonElement;
          const wrp = document.querySelector('.wrapper-popup') as HTMLElement;

          if (
            (e.target as HTMLElement).tagName === 'BUTTON' &&
            (e.target as HTMLElement).classList.contains('button')
          ) {
            popupChat.classList.toggle('hidden');
          }
          if ((e.target as HTMLElement).className === 'add') {
            wrp.classList.toggle('hidden');
            popupChat.classList.add('hidden');
          }
        },
      },
    });
  }

  init() {
    if (this.props.chats) this.children.chats = this.createChats(this.props);
    this.children.ref = new Ref({
      ref_name: 'Профиль',
      className: 'header_navigation',
      color: 'inherit',
      border_color: 'inherit',
      onClick: e => {
        e.preventDefault();
        Router.go(Routes.Profile);
      },
    });
    this.children.popupChat = new Popup({
      addChat: 'Добавить чат',
      class: 'popup-create',
      events: {
        click: () => {
          (this.children.modal as Modal).show();
          (this.children.popupChat as Popup).hide();
        },
      },
    });
    this.children.button = new Button({
      class: 'btn-chat',
      type: 'button',
      label: '+',
      onClick: () => {
        (this.children.popupChat as Popup).toggleDisplay();
      },
    });
    this.children.modal = new Modal({
      type: 'text',
      describeAction: 'Создать чат',
      action: 'название чата',
      label: 'Создать чат',
      modalClass: 'sidebar-modal',
      btnClass: 'addChat_btn',
      onClick: () => {
        const modal = this.children.modal as Modal;
        const inputValue = (modal.children.input as Input).getValue();
        ChatsController.create(inputValue);
        (this.children.modal as Modal).hide();
      },
    });
  }
  protected componentDidUpdate(
    _oldProps: SidebarProps,
    newProps: SidebarProps,
  ): boolean {
    this.children.chats = this.createChats(newProps);
    return true;
  }

  private createChats(props: SidebarProps) {
    return props.chats.map((data: ChatInfo) => {
      return new DialogItem({
        id: data.id,
        avatar: data.avatar ? setAvatar(data.avatar) : null,
        name: data.title,
        last_message: data.last_message?.content,
        message_time: data.last_message?.time
          ? transTime(data.last_message?.time)
          : undefined,
        message_count: data.unread_count,
        events: {
          click: () => {
            ChatsController.selectChat(data.id);
          },
        },
      });
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withChats = withStore((state: State) => ({
  chats: state.chats,
  selectedChat: state.selectedChat,
}));
export default withChats(Sidebar as typeof Block);
