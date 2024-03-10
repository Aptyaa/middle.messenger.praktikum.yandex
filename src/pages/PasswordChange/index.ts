import Block from '../../utils/Block';
import template from './passwordchange.hbs';
import '../Profile/profile.scss';
import '../PasswordChange/passwordchange.scss';
import UserPhoto from '../../components/UserPhoto';
import InfoInput from '../../components/InfoInput';
import { Button } from '../../components/Button';
import UserController from '../../controllers/UserController';
import { UserPassword } from '../../api/UsersAPI';
import router from '../../utils/Router';
import { Routes } from '../../index';
import { withStore } from '../../utils/Store';
import { setAvatar } from '../../utils/helpers';
import { UserData } from '../../api/AuthAPI';

const userFields = [
  ['Старый пароль', 'oldPassword'],
  ['Новый пароль', 'password'],
  ['Повторите новый пароль', 'repeatPassword'],
];

class PasswordChange extends Block {
  constructor(props: UserData) {
    super(props);
  }
  init() {
    // AuthController.fetchUser();
    this.children.photo = new UserPhoto({
      src: setAvatar(this.props.avatar),
      alt: 'Фото пользователя',
      name: this.props.first_name,
    });
    this.children.inputs = userFields.map(([field, name]) => {
      return new InfoInput({
        field,
        name,
        disabled: false,
      });
    });
    this.children.button = new Button({
      type: 'button',
      label: 'Сохранить',
      onClick: async e => {
        e.preventDefault();
        const form = document.querySelector('form');
        const dataForm = new FormData(form!);
        let data = {};
        for (const [key, value] of dataForm) {
          data = { ...data, [key]: value };
        }
        const isValid = await UserController.changePassword(
          data as UserPassword,
        );
        if (isValid) router.go(Routes.Profile);
      },
    });
  }

  componentDidUpdate(_oldProps: any, newProps: any): boolean {
    this.children.photo = new UserPhoto({
      src: setAvatar(newProps.avatar),
      alt: 'Фото пользователя',
      name: newProps.first_name,
    });
    return true;
  }
  render() {
    return this.compile(template, this.props);
  }
}
const withPass = withStore(state => ({ ...state.user }));
export default withPass(PasswordChange as typeof Block);
