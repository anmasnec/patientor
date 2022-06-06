import React from "react";
import axios from "axios";
import { Patient } from "../types";
import { apiBaseUrl } from "../constants";
import { useStateValue, setPatient } from "../state";

import { useParams } from "react-router-dom";

const PatientPage = () => {
const { id } = useParams<{ id: string}>();
const [{ patientsInfo }, dispatch] = useStateValue();

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
    if (!Object.keys(patientsInfo).includes(id || '')) {
      void fetchPatientInfo();
    }
  }, [dispatch]);
  return (
    <div className="App">
          {Object.values(patientsInfo).map((patient: Patient) => {
            if (patient.id === id) {
              return <p>
                  <div><strong>{patient.name}</strong></div>
                    <div>ssn: {patient.ssn}</div>
                    <div>Occupation: {patient.occupation}</div>
                    </p>;}
          })}
    </div>
  );
};

export default PatientPage;
