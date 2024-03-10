import Block from '../../utils/Block';
import template from './chatPage.hbs';
import './chat.scss';
import Chat from '../../components/Chat';
import Sidebar from '../../components/Sidebar';

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
