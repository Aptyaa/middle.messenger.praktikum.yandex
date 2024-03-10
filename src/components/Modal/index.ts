import UserController from '../../controllers/UserController';
import Block from '../../utils/Block';
import Input from '../Input';
import { Button } from '../Button';
import template from './popup.hbs';
import './popup.scss';
import { UserData } from '../../api/AuthAPI';
import List from '../List/list';

interface ModalProps {
  describeAction?: string;
  type?: 'text' | 'file';
  action?: string;
  label?: string;
  modalClass?: string;
  btnClass?: string;
  findedUsers?: UserData[] | [];
  onClick?: (e: any) => void;
  onInput?: (e: any) => void;
}

export default class Modal extends Block {
  constructor(props: ModalProps) {
    super({
      ...props,
      events: {
        keydown: (e: any) => {
          if (e.key === 'Escape') {
            this.hide();
          }
        },
      },
    });
    this.hide();
  }
  init() {
    this.children.buttonClose = new Button({
      label: 'X',
      class: 'modal_popup-close',
      display: 'block',
      onClick: e => {
        e.preventDefault();
        UserController.resetFindedUsers();
        this.hide();
      },
    });
    this.children.input = new Input({
      type: this.props.type,
      class: this.props.classInput,
      value: '',
      events: {
        input: this.props.onInput,
      },
    });
    this.children.list = new List({});
    this.children.button = new Button({
      label: this.props.label,
      type: 'button',
      class: this.props.btnClass,
      onClick: this.props.onClick,
    });
  }
  protected componentDidUpdate(_oldProps: any, newProps: any): boolean {
    this.children.input = new Input({
      type: newProps.type,
      value: '',
      events: {
        input: this.props.onInput,
      },
    });
    this.children.button = new Button({
      label: this.props.label,
      type: 'button',
      class: this.props.btnClass,
      onClick: this.props.onClick,
    });
    this.children.list = new List({});
    return true;
  }

  public toggleDisplay(): void {
    if (this.element!.style.display === 'none') {
      this.element!.style.display = 'flex';
    } else {
      this.element!.style.display = 'none';
    }
  }
  public hide(): void {
    this.getContent()!.style.display = 'none';
  }
  public show(): void {
    this.getContent()!.style.display = 'flex';
  }
  render() {
    return this.compile(template, this.props);
  }
}
