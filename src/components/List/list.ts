import Block from '../../utils/Block.ts';
import template from './list.hbs';
import { withStore } from '../../utils/Store.ts';
import { UserData } from '../../api/AuthAPI.ts';
import Item from '../Item/index.ts';
import UserController from '../../controllers/UserController.ts';
import './list.scss';

interface ListProps {
  findedUsers: UserData[];
}

export class List extends Block {
  constructor(props: ListProps) {
    super({ ...props });
  }
  protected init(): void {
    this.children.findedUsers = this.createFindedUsers(this.props);
  }

  private createFindedUsers(props: ListProps) {
    return props.findedUsers?.map((user: UserData) => {
      return new Item({
        id: user.id,
        content: user.login,
        click: () => {
          UserController.selectUser(user.id);
          const modal = document.querySelector('.chat-modal');
          const input = modal!.querySelector('input') as HTMLInputElement;
          if (input) input.value = user.login;
        },
      });
    });
  }
  protected componentDidUpdate(
    _oldProps: ListProps,
    newProps: ListProps,
  ): boolean {
    this.children.findedUsers = this.createFindedUsers(newProps);
    return true;
  }

  protected render(): DocumentFragment {
    return this.compile(template, this.props);
  }
}

const withFinder = withStore(state => {
  return {
    findedUsers: state.findedUsers || [],
    selectUser: state.selectUser,
  };
});

export default withFinder(List as typeof Block);
