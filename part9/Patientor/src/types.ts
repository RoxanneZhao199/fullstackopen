export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export interface Entry {
}

export interface Patient {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export interface PublicPatient {
  id: string;
  name: string;
  dateOfBirth: string;
  gender: Gender;
  occupation: string;
}

export type NonSensitivePatientEntry = Omit<Patient, 'ssn' | 'entries'>;

export interface Diagnoses {
  code: string;
  name: string;
  latin?: string;
}
