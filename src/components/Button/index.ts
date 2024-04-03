import Block from '../../utils/Block.ts';
import template from './button.hbs';
import './button.scss';

interface ButtonProps {
  label?: string;
  type?: 'submit' | 'button';
  display?: string;
  class?: string;
  onClick?: (e: Event) => void;
  onKeydown?: (e: Event) => void;
  events?: {
    click: (e: Event) => void;
    keydown: (e: Event) => void;
  };
}

export class Button extends Block {
  constructor(props: ButtonProps) {
    super({
      ...props,
      events: {
        click: props.onClick,
        keydown: props.onKeydown,
      },
    });
  }

  render() {
    return this.compile(template, this.props);
  }
}
