// PersonalInfo.ts

export interface PersInfo {
    age: string;
    race: string;
    gender: string;
    sexualOrientation: string;
    religion: string;
    militaryStatus: string;
    
    phone?: string;
}
// race: string; => ["American Indian or Alaska Native", "Asian", "Black or African American", "Hispanic or Latino", "Native Hawaiian or Other Pacific Islander", "White"];
// gender: string; => ["Male", "Female", "Transgender"]
// sexual_orienation: string; => ["Hetrosexual", "Homosexual", "Bisexual", "Asexual"]
// religion: string => ["Christianity", "Islam", "Hinduism", "Buddhism",]
// military_status: string => ["Active duty", "Retired", "Active Reserve", "Inactive Reserve", "Vietnam Era Veteran", "Other"]