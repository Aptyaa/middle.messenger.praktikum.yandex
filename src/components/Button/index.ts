import Block from '../../utils/Block';
import template from './button.hbs';
import './button.scss';

interface ButtonProps {
  label?: string;
  type?: 'submit' | 'button';
  display?: string;
  class?: string;
  onClick?: (e: any) => void;
  onKeydown?: (e: any) => void;
  events?: {
    click: (e: any) => void;
    keydown: (e: any) => void;
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
