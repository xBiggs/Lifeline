export interface MedicationInfo {
    diagnose: string[];
    medication: Medication[];
    familyMedicalHistory: string[];
    nextApointment?: Apointment[];
}

export interface Medication{
    name: string;
    dose: string; // ex: can be milligrams or milliliter
    numTimesDay: number;
    usageInstructions: string;
    refillDate: string; // Date;
    timeInBetween:number;
}
export interface Apointment{
    date: firebase.default.firestore.Timestamp; // Date;
     // Date; // have to extract time from date object
    reason: string;
}