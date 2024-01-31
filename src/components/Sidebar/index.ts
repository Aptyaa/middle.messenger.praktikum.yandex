import Block from '../../utils/Block'
import router from '../../utils/Router'
import { Routes } from '../../index'
import template from './sidebar.hbs'
import './sidebar.scss'

export default class Sidebar extends Block {
  constructor() {
    super({
      onClick: () => {
        router.go(Routes.Profile)
      },
      dialogs: [
        {
          src_avatar: '../../images/photo_missed.jpg',
          name: 'Irina',
          last_message: 'Привет',
          message_time: '22:55',
          message_count: 1,
        },
        {
          src_avatar: '../../images/photo_missed.jpg',
          name: 'Denis',
          last_message: 'Как дела',
          message_time: '22:55',
          message_count: 2,
        },
      ],
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
