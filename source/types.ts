import { User } from "./interfaces/User";

export const LifeLineOrange ='#FB8500'
export const LifeLineDarkBlue ='#023047'
export const LifeLineBlue ='#219ebc'
// type to define route : params for Auth navigator and screens
export type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
};

// type to define route : params for User navigator and screens
export type UserStackParamList = {
  Home: { user: User };
};


export type PhotoVideoEntry ={
  title:string,
  url?:string,
  type:string,
}

// type to define route : params for User navigator and screens
export type HomeDrawerParamList = {
    Home: {user:User},
    Assessment:{user:User},
    Information:{user:User},
    Vault:{user:User},
    ManageVaultItems:{user:User}
    // DailyConversations:{user:User},
    SafetyPlan:{user:User}
    Settings:undefined,
    Appointments:{user:User}
    Medical_Information:{user:User}
    Medication:{user:User}
}

export type VaultStackParamList={
  Vault:{user:User},
  Manage:{user:User}
}

export type SafetyPlanStackParamList = {
    Home: {user:User},
    CopingStrategies:{user:User},
    WarningSigns:{user:User},
    SocialEngagements:{user:User},
    Help:{user:User},
    EmergencyContact:{user:User},
    AccessDeviceContacts: {user:User},
    LocationServices: {user: User},
    Vault:{user:User},
    EmergencyLocations: {user: User},
    Settings:{user:User},
}
