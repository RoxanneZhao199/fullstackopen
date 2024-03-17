import patientsData from '../../data/patients';
import { NonSensitivePatientEntry, Patient } from '../types';

export const getEntries = () : Patient[] => {
  return patientsData;
};

export const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation, entries }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
    entries
  }));
};

export const addPatients = () => {
  return null;
};

export default {
  getEntries,
  addPatients,
  getNonSensitiveEntries
};
