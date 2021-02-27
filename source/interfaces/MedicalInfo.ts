
export interface MedicationInfo {
    diagnose: string;
    medication: Medication[];
    regiments: string;
    familyMedicalHistory: string;
    nextApointment?: Apointment[];
}

export interface Medication{
    name: string;
    dose: string; // ex: can be milligrams or milliliter
    numTimesDay: number;
    usageInstructions: string;
    refillDate?: Date;
}
export interface Apointment{
    date: Date;
    time: Date; // have to extract time from date object
    reason: string;
}