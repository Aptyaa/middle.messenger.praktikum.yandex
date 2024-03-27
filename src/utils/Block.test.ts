import { expect } from 'chai';
import esmock from 'esmock';
import sinon from 'sinon';
import BlockType from './Block.ts';

const eventBusMock = {
  on: sinon.fake(),
  emit: sinon.fake(),
};

describe('Block', async () => {
  const { default: Block } = (await esmock('./Block', {
    './EventBus': {
      EventBus: class {
        emit = eventBusMock.emit;
        on = eventBusMock.on;
      },
    },
  })) as { default: typeof BlockType };

  class ComponentMock extends Block {
    constructor(props: any) {
      super(props);
      this.forTestOnly('div');
    }
    getProps() {
      return this.props;
    }
  }
  it('should fire init event on initialization', () => {
    new ComponentMock({});
    expect(eventBusMock.emit.calledWith('init')).to.eq(true);
  });
  it('should fire CDU event on props update', () => {
    const components = new ComponentMock({});

    components.setProps({ test: 'test' });

    expect(eventBusMock.emit.calledWith('flow:component-did-update')).to.eq(
      true,
    );
  });
  it('method hide should add style  display none to the element', () => {
    const component = new ComponentMock({});
    component.hide();

    expect(component.getContent()!.style.display).to.eq('none');
  });
  it('method show should add style  display block to the element', () => {
    const component = new ComponentMock({});
    component.getContent()!.style.display = 'none';
    component.show();
    expect(component.getContent()!.style.display).to.eq('block');
  });
  it('setProps should change props Element', () => {
    const initialProps = { test: 1 };
    const newProps = { test: 2 };
    const expectProps = Object.assign(initialProps, newProps);
    const component = new ComponentMock(initialProps);
    component.setProps(newProps);
    expect(component.getProps()).to.eql(expectProps);
  });
});
