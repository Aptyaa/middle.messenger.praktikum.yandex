import Block from '../../utils/Block'
import template from './chatPage.hbs'
import { submitValidation } from '../../utils/validation'
import './chat.scss'

export default class ChatPage extends Block {
  constructor() {
    super({
      events: {
        submit: submitValidation,
      },

      src_avatar: '../../images/photo_missed.jpg',
      name: 'Irina',
      message_date: '22 December',
      messages: {
        sent_message: 'Как дела',
        arrived_message: 'Привет',
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
