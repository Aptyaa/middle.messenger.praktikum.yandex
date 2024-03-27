import Block from '../../utils/Block.ts';
import template from './passwordchange.hbs';
import '../Profile/profile.scss';
import '../PasswordChange/passwordchange.scss';
import UserPhoto from '../../components/UserPhoto/index.ts';
import InfoInput from '../../components/InfoInput/index.ts';
import { Button } from '../../components/Button/index.ts';
import UserController from '../../controllers/UserController.ts';
import { UserPassword } from '../../api/UsersAPI.ts';
import router from '../../utils/Router.ts';
import { Routes } from '../../index.ts';
import { withStore } from '../../utils/Store.ts';
import { setAvatar } from '../../utils/helpers.ts';
import { UserData } from '../../api/AuthAPI.ts';

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

  componentDidUpdate(_oldProps: UserData, newProps: UserData): boolean {
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
