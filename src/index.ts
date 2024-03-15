import Router from './utils/Router';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';
import PasswordChange from './pages/PasswordChange';
import ChatPage from './pages/ChatPage';
import { LoginPage } from './pages/Login';
import Error500 from './pages/500';
import Error400 from './pages/404';
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
