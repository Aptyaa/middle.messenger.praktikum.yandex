import Block from '../../utils/Block';
import template from './profile.hbs';
import './profile.scss';
import { Routes } from '../../index';
import { withStore } from '../../utils/Store';
import AuthController from '../../controllers/AuthController';
import { UserData } from '../../api/AuthAPI';
import InfoInput from '../../components/InfoInput';
import { Ref } from '../../components/Ref';
import UserPhoto from '../../components/UserPhoto';
import { Button } from '../../components/Button';
import UserController from '../../controllers/UserController';
import Router from '../../utils/Router';
import Modal from '../../components/Modal';
import { setAvatar } from '../../utils/helpers';
import Input from '../../components/Input';

interface ProfileProps extends UserData {}

const userFields = [
  ['Почта', 'email'],
  ['Логин', 'login'],
  ['Имя', 'first_name'],
  ['Фамилия', 'second_name'],
  ['Имя в чате', 'display_name'],
  ['Телефон', 'phone'],
];

class Profile extends Block {
  constructor(props: UserData) {
    super(props);
  }
  init() {
    this.children.modal = new Modal({
      describeAction: 'Загрузите файл',
      type: 'file',
      action: 'Выберите файл на компьютере',
      label: 'Сменить аватар',
      modalClass: 'profile-modal',
      btnClass: 'loadAvatar_btn',
      onClick: e => {
        e.preventDefault();

        const modalChildren = (this.children.modal as Modal).children;
        const input = (modalChildren.input as Input).getContent()!
          .firstElementChild as HTMLInputElement;
        const avatar = input.files![0];
        const formData = new FormData();
        formData.append('avatar', avatar);
        UserController.changeAvatar(formData);
        (this.children.modal as Modal).hide();
      },
    });
    this.children.photo = this.createAvatar();
    this.children.inputs = userFields.map(([field, name]) => {
      return new InfoInput({
        field,
        name,
        value: this.props[name],
        disabled: true,
      });
    });
    this.children.settings = new Ref({
      ref_name: 'Изменить данные',
      onClick: e => {
        e.preventDefault();
        (this.children.inputs as Input[]).forEach((input: InfoInput) => {
          input.setProps({ disabled: false });
        });
        const refers = document.querySelector('.refers') as HTMLElement;
        refers.style.display = 'none';
        const btn = document.querySelector('.submit') as HTMLElement;
        btn.style.display = 'block';
      },
    });
    this.children.password = new Ref({
      ref_name: 'Изменить пароль',
      onClick: e => {
        e.preventDefault();
        Router.go(Routes.Password);
      },
    });
    this.children.exit = new Ref({
      ref_name: 'Выйти',
      color: 'red',
      border_color: 'red',
      onClick: e => {
        e.preventDefault();
        AuthController.logout();
      },
    });
    this.children.button = new Button({
      type: 'submit',
      label: 'Сохранить',
      display: 'none',
      class: 'submit',
      onClick: async e => {
        e.preventDefault();
        const form = document.querySelector(
          '.container-info',
        ) as HTMLFormElement;
        const dataForm = new FormData(form);
        let data = {};
        for (const [key, value] of dataForm) {
          data = { ...data, [key]: value };
        }
        if (await UserController.changeProfile(data as UserData)) {
          const refers = document.querySelector('.refers') as HTMLElement;
          refers.style.display = 'block';
          (this.children.button as Button).hide();
          (this.children.inputs as Input[]).forEach((input: InfoInput) => {
            input.setProps({ disabled: true });
          });
        }
      },
    });
  }

  protected componentDidUpdate(
    _oldProps: ProfileProps,
    newProps: any,
  ): boolean {
    (this.children.inputs as InfoInput[]).forEach((input, i) => {
      input.setProps({ value: newProps[userFields[i][1]] });
    });
    this.children.photo = this.createAvatar();

    return true;
  }
  private createAvatar() {
    return new UserPhoto({
      src: setAvatar(this.props.avatar),
      alt: 'Фото пользователя',
      name: this.props.first_name || '',
      onClick: () => {
        (this.children.modal as UserPhoto).show();
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}

const withUser = withStore(state => ({ ...state.user }));

export default withUser(Profile as typeof Block);
