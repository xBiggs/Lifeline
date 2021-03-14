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
    Home: {user:User},
    Assessment:{user:User},
    Information:{user:User},
    Vault:undefined,
    DailyConversations:undefined,
    SafetyPlan:{user:User}
    Settings:undefined,
    Appointments:{user:User}
    Medical_Information:{user:User}
    Medication:{user:User}
}

export type SafetyPlanStackParamList = {
    Home: {user:User},
    CopingStrategies:{user:User},
    WarningSigns:{user:User},
    SocialEngagements:{user:User},
    Help:{user:User},
    EmergencyContact:{user:User},
    AccessDeviceContacts: {user:User}
}
