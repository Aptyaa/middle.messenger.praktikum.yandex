import Block from '../../utils/Block'
import template from './login.hbs'
import { blurValidation } from '../../utils/validation'
import { submitValidation } from '../../utils/validation'
import './login.scss'
import Router from '../../utils/Router'
import { Routes } from '../..'
import AuthController from '../../controllers/AuthController'
import { SigninData, SignupData } from '../../api/AuthAPI'

export class LoginPage extends Block {
  constructor() {
    super({
      events: {
        blur: blurValidation,
        submit: submitValidation,
      },
      pageName: 'Вход',
      buttons: {
        type: 'submit',
        label: 'Войти',
        onSubmit: () => {
          let form: any = this.refs.formInfo
          const formData = new FormData(form._element)
          let data: any = {}
          for (let [name, value] of formData) {
            data = { ...data, [name]: value }
          }
          AuthController.signin(data)
        },
      },
      ref: {
        href: '',
        onClick: () => {
          Router.go(Routes.Signup)
        },
      },

      inputs: [
        {
          type: 'text',
          value: '',
          placeholder: 'Пользователь',
          name: 'login',
        },
        {
          type: 'text',
          value: '',
          placeholder: 'Пароль',
          name: 'password',
        },
      ],
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
