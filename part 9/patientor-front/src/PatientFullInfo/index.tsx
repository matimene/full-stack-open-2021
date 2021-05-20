import React, { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { apiBaseUrl } from "../constants";
import { useStateValue } from "../state";
import { Entry, EntryFormValues, Patient } from "../types";
import { addNewEntryToPatient, setPatient } from "../state/reducer";
import EntryDetails from "./EntryDetails";
import AddEntryForm from "../AddEntryForm";
import { Button } from "semantic-ui-react";

const PatientFullInfoPage = () => {
  const [, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [patientFullInfo, setPatientFullInfo] = useState<Patient | undefined>(
    undefined
  );
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string | undefined>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patientFullInfo } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(setPatient(patientFullInfo));
        setPatientFullInfo(patientFullInfo);
      } catch (e) {
        console.error(e);
      }
    };

    void fetchPatient().then((_v) => setLoading(false));
  }, [dispatch]);

  if (loading === true || !patientFullInfo) {
    return <label>Loading...</label>;
  }

  const submitNewEntry = async (values: EntryFormValues) => {
    try {
      const { data: newEntry } = await axios.post<Entry>(
        `${apiBaseUrl}/patients/${id}/entries`,
        values
      );
      dispatch(addNewEntryToPatient(id, newEntry));
      closeModal();
    } catch (e) {
      console.error(e.response?.data || "Unknown Error");
      setError(e.response?.data || "Unknown error");
    }
  };

  return (
    <div>
      <h2>{patientFullInfo.name}</h2>
      <h3>({patientFullInfo.gender})</h3>
      <p>ssn: {patientFullInfo.ssn}</p>
      <p>occupation: {patientFullInfo.occupation}</p>
      <h3>entries</h3>
      {patientFullInfo.entries.map((entry) => (
        <EntryDetails entry={entry} key={entry.id} />
      ))}
      <AddEntryForm
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
      />
      <Button onClick={() => openModal()}>Add New Entry</Button>
    </div>
  );
};

export default PatientFullInfoPage;
