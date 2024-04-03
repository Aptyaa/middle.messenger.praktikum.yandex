import Block from '../../utils/Block.ts';
import template from './login.hbs';
import './login.scss';
import Router from '../../utils/Router.ts';
import { Routes } from '../../index.ts';
import AuthController from '../../controllers/AuthController.ts';
import Input from '../../components/Input/index.ts';
import { Button } from '../../components/Button/index.ts';
import { Ref } from '../../components/Ref/index.ts';
import { SigninData } from '../../api/AuthAPI.ts';

export class LoginPage extends Block {
  init() {
    this.children.login = new Input({
      name: 'login',
      type: 'text',
      placeholder: 'Логин',
    });
    this.children.password = new Input({
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
    });
    this.children.button = new Button({
      type: 'button',
      label: 'Войти',
      onClick: () => {
        const data = {
          login: (this.children.login as Input).getValue(),
          password: (this.children.password as Input).getValue(),
        };
        AuthController.signin(data as SigninData);
      },
    });
    this.children.ref = new Ref({
      ref_name: 'Создать аккаунт',
      color: 'blue',
      border_color: 'white',
      onClick: e => {
        e.preventDefault();
        Router.go(Routes.Signup);
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
