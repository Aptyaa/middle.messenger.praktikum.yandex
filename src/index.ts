import Router from './utils/Router.ts';
import SignUp from './pages/SignUp/index.ts';
import Profile from './pages/Profile/index.ts';
import PasswordChange from './pages/PasswordChange/index.ts';
import ChatPage from './pages/ChatPage/index.ts';
import { LoginPage } from './pages/Login/index.ts';
import Error500 from './pages/500/index.ts';
import Error400 from './pages/404/index.ts';
import './index.scss';

export enum Routes {
  Index = '/',
  Signup = '/sign-up',
  Login = '/login',
  Profile = '/settings',
  Password = '/password',
  Messenger = '/messenger',
  Error500 = '/500',
  Error400 = '/404',
}

window.addEventListener('DOMContentLoaded', async () => {
  Router.use(Routes.Signup, SignUp)
    .use(Routes.Index, LoginPage)
    .use(Routes.Profile, Profile)
    .use(Routes.Password, PasswordChange)
    .use(Routes.Messenger, ChatPage)
    .use(Routes.Error500, Error500)
    .use(Routes.Error400, Error400)
    .start();
});
