export interface Diagnose {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnose["code"]>;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3,
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave?: {
    startDate: string;
    endDate: string;
  };
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: {
    date: string;
    criteria: string;
  };
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn?: string;
  gender: Gender;
  occupation: string;
  entries: Entry[];
}

export type PublicPatient = Omit<Patient, "ssn" | "entries">;

export type NewPatientEntry = Omit<Patient, "id">;

export type PatientFields = {
  name: unknown;
  dateOfBirth: unknown;
  ssn?: unknown;
  gender: unknown;
  occupation: unknown;
  entries: unknown;
};

export type HealthCheckEntryFields = Omit<HealthCheckEntry, "id">;

export type OccupationalHealthcareEntryFields = Omit<
  OccupationalHealthcareEntry,
  "id"
>;

export type HospitalEntryFields = Omit<HospitalEntry, "id">;

export type EntryFields =
  | HospitalEntryFields
  | OccupationalHealthcareEntryFields
  | HealthCheckEntryFields;

export enum EntryType {
  HealthCheckEntry = "HealthCheck",
  OccupationalHealthcareEntry = "OccupationalHealthcare",
  HospitalEntry = "Hospital",
}

type DistributiveOmit<T, K extends keyof any> = T extends any
  ? Omit<T, K>
  : never;
export type NewEntry = DistributiveOmit<Entry, "id">;

export type NewBaseEntry = Omit<BaseEntry, "id">;

export interface NewBaseEntryWithType extends NewBaseEntry {
  type: EntryType;
}
