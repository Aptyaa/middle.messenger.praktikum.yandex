import Block from '../../utils/Block';
import template from './userPhoto.hbs';
import './userPhoto.scss';

interface UserPhotoProps {
  src: string | null;
  alt: string;
  name?: string;
  onClick?: () => void;
}

export default class UserPhoto extends Block {
  constructor(props: UserPhotoProps) {
    super({ ...props, name: props.name, events: { click: props.onClick } });
  }
  render() {
    return this.compile(template, this.props);
  }
}
