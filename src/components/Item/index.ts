import Block from '../../utils/Block';
import { withStore } from '../../utils/Store';
import template from './item.hbs';
import './item.scss';

interface ItemProps {
  id: number;
  class?: string;
  content: string;
  click?: (e: any) => void;
}

export class Item extends Block {
  constructor(props: ItemProps) {
    super({
      ...props,
      events: {
        click: props.click,
      },
    });
  }

  render() {
    return this.compile(template, {
      ...this.props,
      isSelected: this.props.id === this.props.selectUser,
    });
  }
}

const withSelectUsers = withStore((state: any) => {
  return {
    selectUser: state.selectUser,
    findedUsers: state.findedUsers || [],
  };
});

export default withSelectUsers(Item as typeof Block);