import Block from '../../utils/Block.ts';
import template from './ref.hbs';
import './ref.scss';

interface RefProps {
  color?: string;
  border_color?: string;
  ref_name: string;
  className?: string;
  onClick?: (e: Event) => void;
}

export class Ref extends Block {
  constructor(props: RefProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
