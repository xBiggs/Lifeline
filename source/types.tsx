import { User } from "./interfaces/User";

// type to define route : params for Auth navigator and screens
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// type to define route : params for User navigator and screens
export type UserStackParamList = {
  Home: { user: User };
};

// type to define route : params for User navigator and screens
export type HomeDrawerParamList = {
  Home: { user: User };
  Assessment: { user: User };
  Information: { user: User };
  Vault: undefined;
  DailyConversations: undefined;
  SafetyPlan: undefined;
  Settings: undefined;
  Medical_Information: { user: User };
  Medication: { user: User };
};
