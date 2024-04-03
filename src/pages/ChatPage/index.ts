import Block from '../../utils/Block.ts';
import template from './chatPage.hbs';
import './chat.scss';
import Chat from '../../components/Chat/index.ts';
import Sidebar from '../../components/Sidebar/index.ts';

export class ChatPage extends Block {
  init() {
    this.children.sidebar = new Sidebar(this.props.chats);
    this.children.chat = new Chat({});
  }

  render() {
    return this.compile(template, this.props);
  }
}

export default ChatPage;
