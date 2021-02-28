import { User } from '../interfaces/User'

export { default as LoginScreen } from './LoginScreen/LoginScreen'

export { default as HomeScreen } from './HomeScreen/HomeScreen'

export { default as SignupScreen } from './SignupScreen/SignupScreen'

export {default as PersonalInfoScreen} from './/PersonalInfoScreen/PersonalInfoScreen'

export {default as AssessmentScreen} from './AssessmentScreen/AssessmentScreen'

export type Screens = {
    Login: undefined;
    Signup: undefined;
    Home: {
        user: User
    };
    PersonalInfo: {
        user: User
    };
    Assessment:{
        user:User
    }
}