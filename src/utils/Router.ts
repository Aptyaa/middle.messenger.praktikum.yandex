import { Routes } from '..';
import AuthController from '../controllers/AuthController';
import ChatsController from '../controllers/ChatsController';
import Block from './Block';

interface BlockConstructable<P extends Record<string, any> = any> {
  new (props: P): Block<P>;
}

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`);
  }

  root.innerHTML = '';

  root.append(block.getContent()!);

  return root;
}

class Route {
  private block: Block | null = null;

  constructor(
    private pathname: string,
    private readonly blockClass: BlockConstructable,
    private readonly query: string,
  ) {}

  leave() {
    this.block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this.pathname);
  }

  render() {
    if (!this.block) {
      this.block = new this.blockClass({});

      render(this.query, this.block);
      return;
    }
  }
}

class Router {
  private static __instance: Router;
  private routes: Route[] = [];
  private currentRoute: Route | null = null;
  private history = window.history;

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this.routes = [];

    Router.__instance = this;
  }

  public use(pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this.rootQuery);
    this.routes.push(route);

    return this;
  }

  start() {
    window.onpopstate = (() => {
      this._onRoute(window.location.pathname);
    }).bind(this);

    this._onRoute(window.location.pathname);
  }

  async _onRoute(pathname: string) {
    let route = this.getRoute(pathname);

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave();
    }

    this.currentRoute = route!;

    if (!['/', '/sign-up', '/404', '/500'].find(el => el === pathname)) {
      AuthController.fetchUser()
        .then(() => {
          if (pathname === '/messenger') {
            ChatsController.fetchChats().then(() => route!.render());
          } else {
            route!.render();
          }
        })
        .catch(() => {
          route = this.getRoute('/');
          window.location.pathname = '/';
          this.currentRoute!.leave();
          this.currentRoute = route!;

          route!.render();
        });
    } else {
      route!.render();
    }
  }

  public go(pathname: string) {
    this.history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  public back() {
    this.history.back();
  }

  public forward() {
    this.history.forward();
  }

  private getRoute(pathname: string) {
    const route = this.routes.find(route => route.match(pathname));
    if (route) return route;
    else {
      window.location.pathname = Routes.Error400;
      return this.routes.find(el => el.match(Routes.Error400));
    }
  }
}
export default new Router('#app');
