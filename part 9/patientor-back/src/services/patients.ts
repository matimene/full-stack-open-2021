import patients from "../data/patients";
import {
  PublicPatient,
  Patient,
  NewPatientEntry,
  Entry,
  EntryFields,
} from "../types";
import { v1 as uuid } from "uuid";

const getAll = (): PublicPatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }));
};

const getById = (id: string): Patient | undefined => {
  const patient = patients.find((p) => p.id === id);
  return patient;
};

const addPatient = (entry: NewPatientEntry): Patient => {
  const id = uuid();
  const newPatientEntry = { id, ...entry };

  patients.push(newPatientEntry);
  return newPatientEntry;
};

const addEntry = (patientId: string, entry: EntryFields): Entry => {
  const patient = patients.find((p) => p.id === patientId);
  const newEntryId = uuid();
  const newEntry = { id: newEntryId, ...entry };

  patient?.entries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  getById,
  addPatient,
  addEntry,
};
