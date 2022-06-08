import React from "react";
import axios from "axios";
import { DiagnoseEntry, Entry, Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient, setDiagnosis } from "../state";

import { useParams } from "react-router-dom";

const PatientPage = () => {
const { id } = useParams<{ id: string}>();
const [{ patientsInfo, diagnoses }, dispatch] = useStateValue();
//const [{diagnosis }, dispatch] = useStateValue();

React.useEffect(() => {
const fetchPatientInfo = async () => {
    try {
        const { data: patientInfoFromApi } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`,
        );
        //dispatch({ type: "SET_PATIENT", payload: patientInfoFromApi } );
        dispatch(setPatient(patientInfoFromApi));
    } catch (e) {
        console.error(e);
    }
    };

const fetchDiagnoses = async () => {
    try {
        const { data: diagnosisInfoFromApi } = await axios.get<DiagnoseEntry[]>(
            `${apiBaseUrl}/diagnoses`,
        );
            //dispatch({ type: "SET_PATIENT", payload: patientInfoFromApi } );
        dispatch(setDiagnosis(diagnosisInfoFromApi));
    } catch (e) {
        console.error(e);
    }
    };

    if (!Object.keys(patientsInfo).includes(id || '')) {
      void fetchPatientInfo();
    }
    if (!Object.keys(diagnoses).includes(id || '')) {
        void fetchDiagnoses();
      }

  }, [dispatch]);

  return (
    <div className="App">
          {Object.values(patientsInfo).map((patient: Patient) => {
            if (patient.id === id) {
              return <p>
                  <div><strong>{patient.name}</strong></div>
                  <p></p>
                    <div>ssn: {patient.ssn}</div>
                    <div>Occupation: {patient.occupation}</div>
                    <p></p>
                    <div><strong>Entries</strong></div>
                    <p></p>
                    <div>{patient.entries.map((entry: Entry) => {
                    return (
                      <>
                        <p key={entry.id}>{entry.date}<i>{' '+entry.description}</i></p>
                        <ul>
                          {entry.diagnosisCodes && entry.diagnosisCodes.map((code: string) =>
                            <li key={code}>{code} {diagnoses[code] && diagnoses[code].name}</li>)}
                        </ul>
                      </>
                    );
                  }) } </div>
                    </p>;}
          })}
    </div>
  );
};

export default PatientPage;
