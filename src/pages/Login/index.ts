import Block from '../../utils/Block';
import template from './login.hbs';
import './login.scss';
import Router from '../../utils/Router';
import { Routes } from '../..';
import AuthController from '../../controllers/AuthController';
import Input from '../../components/Input';
import { Button } from '../../components/Button';
import { Ref } from '../../components/Ref';
import { SigninData } from '../../api/AuthAPI';

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
