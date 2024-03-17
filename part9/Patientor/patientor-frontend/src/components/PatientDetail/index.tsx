import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Patient, Diagnosis, Entry } from "../../types";

const PatientDetail = () => {
  const [patient, setPatient] = useState<Patient | null>(null);
  const [diagnoses, setDiagnoses] = useState<{ [code: string]: Diagnosis }>({});
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const response = await fetch(`/api/patients/${id}`);
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const patientData = await response.json();
        setPatient(patientData);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchDiagnoses = async () => {
      try {
        const response = await fetch('/api/diagnoses');
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        const diagnosesData = await response.json();

        const diagnosesObj = diagnosesData.reduce((acc: { [x: string]: any; }, diagnosis: { code: string | number; }) => {
          acc[diagnosis.code] = diagnosis;
          return acc;
        }, {});
        setDiagnoses(diagnosesObj);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPatient();
    fetchDiagnoses();
  }, [id]);

  if (!patient) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Patientor</h1>
      <h2>{patient.name} {patient.gender === 'male' ? '♂️' : '♀️'}</h2>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>

      <h3>entries</h3>
      {patient.entries.length > 0 ? (
        <ul>
        {patient.entries.map((entry: Entry) => (
          <li key={entry.id}>
            <p>{entry.date} {entry.description}</p>
            {entry.diagnosisCodes && (
              <ul>
                {entry.diagnosisCodes.map(code => (
                  <li key={code}>{code} {diagnoses[code]?.name}</li>
                ))}
              </ul>
            )}
          </li>
        ))}
        </ul>
      ) : (
        <p>No entries found.</p>
      )}
    </div>
  );
};

export default PatientDetail;
