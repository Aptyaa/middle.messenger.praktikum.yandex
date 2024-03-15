import Block from '../../utils/Block';
import template from './input.hbs';
import { blurValidation } from '../../utils/validation';
import './input.scss';

interface InputProps {
  value?: string;
  type: string;
  placeholder?: string;
  name?: string;
  class?: string;
  events?: {
    input?: (e: Event) => void;
  };
}

export default class Input extends Block {
  constructor(props: InputProps) {
    super({
      ...props,
      events: {
        ...props.events,
        blur: (e: Event) => {
          blurValidation(e);
        },
      },
    });
  }

  getValue() {
    return (this.element?.firstElementChild as HTMLInputElement).value;
  }
  setValue(value: string) {
    return ((this.element?.firstElementChild as HTMLInputElement).value =
      value);
  }
  getName() {
    return (this.element?.firstElementChild as HTMLInputElement).name;
  }

  render() {
    return this.compile(template, this.props);
  }
}
