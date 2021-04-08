export interface MedicationInfo {
    diagnose: string[];
    medication: Medication[];
    regiments: string;
    familyMedicalHistory: string[];
    nextApointment?: Apointment[];
}

export interface Medication{
    name: string;
    dose: string; // ex: can be milligrams or milliliter
    numTimesDay: number;
    usageInstructions: string;
    refillDate?: string; // Date;
}
export interface Apointment{
    date: firebase.default.firestore.Timestamp; // Date;
     // Date; // have to extract time from date object
    reason: string;
}