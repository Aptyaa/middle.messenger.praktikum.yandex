import Block from '../../utils/Block'
import template from './homepage.hbs'
import router from '../../utils/Router'
import { Routes } from '../../index'

export default class Home extends Block {
  constructor() {
    super({
      login: {
        onClick: () => {
          router.go(Routes.Login)
        },
      },
      signup: {
        onClick: () => {
          router.go(Routes.Signup)
        },
      },
      profile: {
        onClick: () => {
          router.go(Routes.Profile)
        },
      },
      settings: {
        onClick: () => {
          router.go(Routes.Settings)
        },
      },
      changePass: {
        onClick: () => {
          router.go(Routes.Password)
        },
      },
      chat: {
        onClick: () => {
          router.go(Routes.Messenger)
        },
      },
      page404: {
        onClick: () => {
          // render('page404')
        },
      },
      page500: {
        onClick: () => {
          // render('page500')
        },
      },
    })
  }
  render() {
    return this.compile(template, this.props)
  }
}
