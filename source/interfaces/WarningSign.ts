export const MODERATE: string = 'Moderate';
export const SEVERE: string = 'Severe';
export enum WarningSignValue {
    
    MODERATE_VALUE = 1,
    SEVERE_VALUE = 2,
}



export interface WarningSign {
    sign: string;
    points: WarningSignValue
}