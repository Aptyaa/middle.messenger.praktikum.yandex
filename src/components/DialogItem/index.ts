import Block from '../../utils/Block';
import template from './dialogItem.hbs';
import './dialogItem.scss';
import { withStore } from '../../utils/Store';

export interface DialogItemProps {
  id: number;
  name: string;
  message_count: number;
  avatar: string;
  last_message: string;
  message_time: string;
  selectedChat: number;

  events?: {
    click?: () => void;
  };
}

export class DialogItem extends Block {
  constructor(props: DialogItemProps) {
    super({
      ...props,
      avatar: props.avatar
        ? props.avatar
        : '../../public/images/photo_missed.jpg',
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectedChat,
    });
  }
}

const withSelectedChat = withStore((state: any) => ({
  selectedChat: state.selectedChat,
}));
export default withSelectedChat(DialogItem as typeof Block);
