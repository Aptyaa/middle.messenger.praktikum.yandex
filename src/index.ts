import { Button } from './components/Button'
import { registerComponent } from './utils/resgiterComponent'
import Card from './components/Card'
import Input from './components/Input'
import { Ref } from './components/Ref'
import InfoInput from './components/InfoInput'
import UserPhoto from './components/UserPhoto'
import DialogItem from './components/DialogItem'
import SentMessage from './components/SentMessage'
import ArrivedMessage from './components/ArrivedMessage'
import Sidebar from './components/Sidebar'
import Router from './utils/Router'
import SignUp from './pages/SignUp'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import PasswordChange from './pages/PasswordChange'
import ChatPage from './pages/ChatPage'
import { LoginPage } from './pages/Login'
import { render } from './utils/render'
import Home from './pages/Home'

registerComponent('Button', Button)
registerComponent('Card', Card)
registerComponent('Input', Input)
registerComponent('Ref', Ref)
registerComponent('InfoInput', InfoInput)
registerComponent('UserPhoto', UserPhoto)
registerComponent('DialogItem', DialogItem)
registerComponent('Sidebar', Sidebar)
registerComponent('SentMessage', SentMessage)
registerComponent('ArrivedMessage', ArrivedMessage)

export enum Routes {
  Home = '/',
  Signup = '/sign-up',
  Login = '/login',
  Profile = '/profile',
  Settings = '/settings',
  Password = '/password',
  Messenger = '/messenger',
}

window.addEventListener('DOMContentLoaded', () => {
  Router.use(Routes.Signup, SignUp)
    .use(Routes.Home, Home)
    .use(Routes.Login, LoginPage)
    .use(Routes.Profile, Profile)
    .use(Routes.Settings, Settings)
    .use(Routes.Password, PasswordChange)
    .use(Routes.Messenger, ChatPage)
    .start()
})
