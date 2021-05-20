import { State } from "./state";
import { Patient, Diagnosis, Entry } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "SET_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "SET_DIAGNOSIS_CODES";
      payload: Diagnosis[];
    }
  | {
      type: "ADD_NEW_ENTRY_TO_PATIENT";
      payload: Entry;
      guideId: string;
    };

export const setPatientList = (patients: Patient[]): Action => {
  return {
    type: "SET_PATIENT_LIST",
    payload: patients,
  };
};

export const setPatient = (patient: Patient): Action => {
  return {
    type: "SET_PATIENT",
    payload: patient,
  };
};

export const addPatient = (patient: Patient): Action => {
  return {
    type: "ADD_PATIENT",
    payload: patient,
  };
};

export const setDiagnosisCodes = (diagnosisCodes: Diagnosis[]): Action => {
  return {
    type: "SET_DIAGNOSIS_CODES",
    payload: diagnosisCodes,
  };
};

export const addNewEntryToPatient = (
  patientId: string,
  entry: Entry
): Action => {
  return {
    type: "ADD_NEW_ENTRY_TO_PATIENT",
    payload: entry,
    guideId: patientId,
  };
};

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients,
        },
      };
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload,
        },
      };
    case "SET_PATIENT":
      if (!state.patients[action.payload.id]) {
        return {
          ...state,
          patients: {
            ...state.patients,
            [action.payload.id]: action.payload,
          },
        };
      }
      return state;
    case "SET_DIAGNOSIS_CODES":
      return {
        ...state,
        diagnosisCodes: action.payload,
      };
    case "ADD_NEW_ENTRY_TO_PATIENT":
      const patient = state.patients[action.guideId];
      patient.entries.push(action.payload);
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.guideId]: patient,
        },
      };
    default:
      return state;
  }
};
