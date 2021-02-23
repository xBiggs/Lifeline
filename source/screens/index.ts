import { User } from '../interfaces/user'

export { default as LoginScreen } from './LoginScreen/LoginScreen'

export { default as HomeScreen } from './HomeScreen/HomeScreen'

export { default as SignupScreen } from './SignupScreen/SignupScreen'

export type Screens={
    Login: undefined;
    Signup: undefined;
    Home: {user:User}
}