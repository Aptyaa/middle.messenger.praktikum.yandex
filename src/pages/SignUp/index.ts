import Block from '../../utils/Block'
import template from './signup.hbs'
import { blurValidation, submitValidation } from '../../utils/validation'
import router from '../../utils/Router'
import { Routes } from '../../index'
import AuthController from '../../controllers/AuthController'
import './signup.scss'
import { SignupData } from '../../api/AuthAPI'

export default class SignUp extends Block {
  constructor() {
    super({
      events: {
        submit: submitValidation,
        blur: blurValidation,
      },
      ref: {
        onClick: () => {
          router.go(Routes.Login)
        },
      },
      button: {
        onSubmit: () => {
          let form: any = this.refs.formInfo
          const formData = new FormData(form._element)
          let data = {}
          for (let [name, value] of formData) {
            data = { ...data, [name]: value }
          }
          AuthController.singup(data as SignupData)
        },
      },
      pageName: 'Регистрация',
      inputs: [
        {
          type: 'text',
          placeholder: 'Почта',
          name: 'email',
        },
        {
          type: 'text',
          placeholder: 'Логин',
          name: 'login',
        },
        {
          type: 'text',
          placeholder: 'Имя',
          name: 'first_name',
        },
        {
          type: 'text',
          placeholder: 'Фамилия',
          name: 'second_name',
        },
        {
          type: 'text',
          placeholder: 'Телефон',
          name: 'phone',
        },
        {
          type: 'password',
          placeholder: 'Пароль',
          name: 'password',
        },
        {
          type: 'password',
          placeholder: 'Пароль(еще раз)',
          name: 'password',
        },
      ],
    })
  }

  render() {
    return this.compile(template, this.props)
  }
}
