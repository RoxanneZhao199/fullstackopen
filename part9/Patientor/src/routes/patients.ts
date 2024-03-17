import express from 'express';
import patientService from '../services/patientsService';
import patientsData from '../../data/patients';
import { PublicPatient } from '../types';
import { toNewPatient } from '../utils';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNonSensitiveEntries());
});

router.get('/:id', (req, res) => {
  const patient = patientsData.find(p => p.id === req.params.id);
  if (patient) {
    res.json(patient)
  } else {
    res.status(404).json({ error: 'Patient not found' });
  }

});

router.post('/', (req, res) => {
  try {
    const newPatient = toNewPatient(req.body);

    patientsData.push(newPatient);

    const publicPatient: PublicPatient = {
      id: newPatient.id,
      name: newPatient.name,
      dateOfBirth: newPatient.dateOfBirth,
      gender: newPatient.gender,
      occupation: newPatient.occupation
    };

    res.status(201).json(publicPatient);
  } catch (error) {
    if (error instanceof Error) {
      res.status(400).send(error.message);
    } else {
      res.status(500).send('An unexpected error occurred');
    }
  }
});

export default router;
