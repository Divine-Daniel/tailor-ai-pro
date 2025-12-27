
export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  TAILOR = 'TAILOR',
  CLIENT = 'CLIENT'
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Measurement {
  label: string;
  value: number;
  unit: 'cm' | 'inch';
}

export interface ClientData {
  id: string;
  name: string;
  email: string;
  measurements: Measurement[];
  lastUpdate: string;
}
