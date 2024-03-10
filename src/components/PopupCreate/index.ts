import Block from '../../utils/Block';
import template from './popupCreate.hbs';
import './popupCreate.scss';

interface PopupProps {
  addChat?: string;
  deleteChat?: string;
  addUser?: string;
  deleteUser?: string;
  setAvatar?: string;
  class?: string;
  events?: {
    click?: (e: any) => void;
  };
}

export default class Popup extends Block {
  constructor(props: PopupProps) {
    super({
      ...props,
      events: {
        ...props.events,
        keydown: (e: any) => {
          if (e.key === 'Escape') {
            this.hide();
          }
        },
      },
    });
  }

  public show(): void {
    (this.element as HTMLElement).style.display = 'block';
  }
  public hide(): void {
    (this.element as HTMLElement).style.display = 'none';
  }
  render() {
    return this.compile(template, this.props);
  }
}
