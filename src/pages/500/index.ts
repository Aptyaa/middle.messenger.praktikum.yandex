import { Routes } from '../../index.ts';
import { Ref } from '../../components/Ref/index.ts';
import router from '../../utils/Router.ts';
import Block from '../../utils/Block.ts';
import template from './error.hbs';
import './error.scss';

export default class Page500 extends Block {
  init() {
    this.children.ref = new Ref({
      ref_name: 'Назад к чатам',
      border_color: 'white',
      onClick: () => {
        router.go(Routes.Messenger);
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
