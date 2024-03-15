import Block from '../../utils/Block';
import template from './signup.hbs';
import { Routes } from '../../index';
import AuthController from '../../controllers/AuthController';
import './signup.scss';
import { SignupData } from '../../api/AuthAPI';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { Ref } from '../../components/Ref';
import Router from '../../utils/Router';

const SignupField = [
  ['email', 'text', 'Почта'],
  ['login', 'text', 'Логин'],
  ['first_name', 'text', 'Имя'],
  ['second_name', 'text', 'Фамилия'],
  ['phone', 'text', 'Телефон'],
  ['password', 'password', 'Пароль'],
  ['repeatPassword', 'password', 'Пароль еще раз'],
];

export default class SignUp extends Block {
  init() {
    this.children.inputs = SignupField.map(([name, type, placeholder]) => {
      return new Input({
        name,
        type,
        placeholder,
      });
    });
    this.children.button = new Button({
      label: 'Зарегистрироваться',
      type: 'button',
      onClick: () => {
        let data: SignupData = {
          first_name: '',
          second_name: '',
          login: '',
          email: '',
          password: '',
          repeatPassword: '',
          phone: '',
        };
        (this.children.inputs as Array<Input>).forEach((input: Input) => {
          let name = input.getName();
          data = { ...data, [name]: input.getValue() };
        });

        AuthController.singup(data);
      },
    });
    this.children.ref = new Ref({
      ref_name: 'Войти',
      color: 'blue',
      border_color: 'white',
      onClick: e => {
        e.preventDefault();
        Router.go(Routes.Index);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
