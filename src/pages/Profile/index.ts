import Block from '../../utils/Block'
import template from './profile.hbs'
import './profile.scss'
import router from '../../utils/Router'
import { Routes } from '../../index'
import store, { StoreEvents, withStore } from '../../utils/Store'

class Profile extends Block {
  constructor() {
    super({
      refSet: {
        onClick: () => {
          router.go(Routes.Settings)
        },
      },
      refPass: {
        onClick: () => {
          router.go(Routes.Password)
        },
      },
      refExit: {
        onClick: () => {
          router.go(Routes.Home)
        },
      },
      inputs: [
        {
          field: 'Почта',
          name: 'email',
          value: 'london@gmail.com',
        },
        { field: 'Логин', name: 'login', value: 'JLondon' },
        { field: 'Имя', name: 'first_name', value: 'Jack' },
        { field: 'Фамилия', name: 'second_name', value: 'London' },
        { field: 'Имя в чате', name: 'display_name', value: 'JackLo' },
        { field: 'Телефон', name: 'phone', value: '+7777777' },
      ],
    })
  }
  init() {
    console.log(store)
  }
  render() {
    return this.compile(template, this.props)
  }
}

const withUser = withStore(state => ({ ...state.user }))

export default withUser(Profile)
