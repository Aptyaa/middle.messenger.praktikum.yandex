import sinon from 'sinon';
import Router, { BlockConstructable } from './Router.ts';
import { expect } from 'chai';

describe('Router', () => {
  global.window.history.back = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };
  global.window.history.forward = () => {
    if (typeof window.onpopstate === 'function') {
      window.onpopstate({ currentTarget: window } as unknown as PopStateEvent);
    }
  };

  beforeEach(() => {
    Router.reset();
  });

  const getContentFake = sinon.fake.returns(document.createElement('div'));

  const BlockMock = class {
    getContent = getContentFake;
  } as unknown as BlockConstructable;

  it('use() should return Router instance', () => {
    const result = Router.use('/', BlockMock);
    expect(result).to.eq(Router);
  });

  describe('.back()', () => {
    it('should render a page on history back action', () => {
      Router.use('/', BlockMock).start();

      Router.back();

      expect(getContentFake.callCount).to.eq(1);
    });
  });
  describe('.forward()', () => {
    it('should render a page on history forward action', () => {
      Router.use('/', BlockMock).start();

      Router.forward();

      expect(getContentFake.callCount).to.eq(1);
    });
  });

  it('should render a page on start', () => {
    Router.use('/', BlockMock).start();

    expect(getContentFake.callCount).to.eq(1);
  });
  describe('go', () => {
    it('should instantiate class Block', () => {
      Router.use('/', getContentFake as any);

      Router.go('/');

      expect(getContentFake.callCount).to.eq(1);
    });

    it('should change path in browser history', () => {
      Router.use('/sign-up', getContentFake as any);

      Router.go('/sign-up');

      expect(window.location.pathname).to.eq('/sign-up');
    });
  });
});
