import Block from '../../utils/Block';
import template from './infoInput.hbs';
import { blurValidation } from '../../utils/validation';
import './infoInput.scss';

interface InfoInputProps {
  field?: string;
  name?: string;
  class?: string;
  value?: string | number;
  type?: string;
  disabled?: boolean;
  events?: {
    click?: (e: Event) => void;
  };
}

export default class InfoInput extends Block {
  constructor(props: InfoInputProps) {
    super({
      ...props,
      events: {
        blur: (e: Event) => {
          if ((e.target as HTMLElement).tagName === 'INPUT') blurValidation(e);
        },
      },
    });
  }
  render() {
    return this.compile(template, this.props);
  }
}
