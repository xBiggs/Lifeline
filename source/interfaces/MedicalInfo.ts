
export interface MedicationInfo {
    diagnose: string;
    medication: Medication;
    regiments: string;
    familyMedicalHistory: string;
}

export interface Medication{
    name: string;
    dose: number;
    numTimesDay: number;
    usageInstructions: string;
}