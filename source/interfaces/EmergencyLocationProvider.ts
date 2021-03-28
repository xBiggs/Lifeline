export interface EmergencyLocationProvider {
    name: string,
    vicinity: string, // address
    phone?: string | number,
    physicianName?: string,
    serviceType?: string,
    location?: string
    
}