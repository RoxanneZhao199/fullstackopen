import { v1 as uuid } from 'uuid';
import { Patient, Gender } from './types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseString = (stringValue: any, fieldName: string): string => {
  if (!stringValue || !isString(stringValue)) {
    throw new Error(`Incorrect or missing ${fieldName}`);
  }
  return stringValue;
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error('Incorrect or missing gender');
  }
  return gender;
};

export const toNewPatient = (object: any): Patient => {
  return {
    id: uuid(),
    name: parseString(object.name, 'name'),
    dateOfBirth: parseString(object.dateOfBirth, 'dateOfBirth'),
    ssn: parseString(object.ssn, 'ssn'),
    gender: parseGender(object.gender),
    occupation: parseString(object.occupation, 'occupation'),
    entries: []
  };
};
