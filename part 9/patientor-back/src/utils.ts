import {
  Entry,
  Gender,
  NewPatientEntry,
  PatientFields,
  EntryType,
  HealthCheckRating,
  Diagnose,
  NewEntry,
  NewBaseEntry,
  NewBaseEntryWithType,
} from "./types";

export const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const isString = (text: unknown): text is string => {
  return typeof text === "string" || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseToDate = (param: any, paramName: string): string => {
  if (!param || !isString(param) || !isDate(param)) {
    throw new Error(`Incorrect or missing ${paramName}: ${param || ""}`);
  }
  return param;
};

const parseName = (name: unknown): string => {
  if (!name || !isString(name)) {
    throw new Error("Incorrect or missing name");
  }

  return name;
};

//GENERAL TO SAVE TIME PARSING ARGUMENTS THAT ARE JUST A STRING
const parseStringArg = (string: unknown, propName: string): string => {
  if (!string || !isString(string)) {
    throw new Error(`Incorrect or missing ${propName}`);
  }

  return string;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

export const parseGender = (gender: unknown): Gender => {
  if (!gender || !isGender(gender)) {
    throw new Error("Incorrect or missing gender: " + gender);
  }
  return gender;
};

export const toNewPatientEntry = (object: PatientFields): NewPatientEntry => {
  const newPatientEntry: NewPatientEntry = {
    name: parseName(object.name),
    dateOfBirth: parseStringArg(object.dateOfBirth, "dateOfBirth"),
    ssn: parseStringArg(object.ssn, "ssn"),
    gender: parseGender(object.gender),
    occupation: parseStringArg(object.occupation, "occupation"),
    entries: object.entries as Entry[],
  };

  return newPatientEntry;
};

const isEntryType = (param: any): param is EntryType => {
  return Object.values(EntryType).includes(param);
};

export const parseEntryTypes = (type: unknown): EntryType => {
  if (!type || !isEntryType(type)) {
    throw new Error("Incorrect or missing entry type: " + type);
  }
  return type;
};

const parseDischarge = (discharge: {
  date: unknown;
  criteria: unknown;
}): { date: string; criteria: string } => {
  let criteria = parseStringArg(discharge.criteria, "criteria");
  let date = parseToDate(discharge.criteria, "date");

  if (discharge && (!discharge.date || !discharge.criteria)) {
    throw new Error("Incorrect discharge: " + discharge);
  }
  return { criteria, date };
};

const parseSickLeave = (sickLeave: {
  startDate: unknown;
  endDate: unknown;
}):
  | {
      startDate: string;
      endDate: string;
    }
  | undefined => {
  if (!sickLeave) {
    return undefined;
  }
  let startDate = parseToDate(sickLeave.startDate, "startDate");
  let endDate = parseToDate(sickLeave.endDate, "endDate");

  if (sickLeave && (!sickLeave.startDate || !sickLeave.endDate)) {
    throw new Error("Incorrect sick leave info: " + sickLeave);
  }
  return { startDate, endDate };
};

const isHealthCheckRating = (param: any): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).includes(param);
};

const isArrayOfStrings = (param: any[]): param is string[] => {
  const hasNonString = param.some((item) => {
    return !isString(item);
  });

  return !hasNonString;
};

const parseHealthCheckRating = (healthCheckRating: unknown) => {
  if (!healthCheckRating || !isHealthCheckRating(healthCheckRating)) {
    throw new Error(
      "Incorrect or missing healthcheck rating: " + healthCheckRating
    );
  }

  return healthCheckRating;
};

const parseDiagnosesCodes = (diagnosisCodes: any): Array<Diagnose["code"]> => {
  if (!Array.isArray(diagnosisCodes) || !isArrayOfStrings(diagnosisCodes)) {
    throw new Error("Incorrect or missing diagnoses");
  }

  return diagnosisCodes;
};

const toNewBaseEntry = (object: any): NewBaseEntry => {
  const newBaseEntry: NewBaseEntryWithType = {
    type: parseEntryTypes(object.type),
    description: parseStringArg(object.description, "description"),
    date: parseToDate(object.date, "date"),
    specialist: parseStringArg(object.specialist, "specialist"),
  };

  if (object.diagnosisCodes) {
    newBaseEntry.diagnosisCodes = parseDiagnosesCodes(object.diagnosisCodes);
  }

  return newBaseEntry;
};

export const toNewEntryToPatient = (object: any): NewEntry => {
  const newBaseEntry = toNewBaseEntry(object) as NewEntry;

  switch (newBaseEntry.type) {
    case EntryType.HospitalEntry:
      return {
        ...newBaseEntry,
        discharge: parseDischarge(object.discharge),
      };
    case EntryType.HealthCheckEntry:
      return {
        ...newBaseEntry,
        healthCheckRating: parseHealthCheckRating(object.healthCheckRating),
      };
    case EntryType.OccupationalHealthcareEntry:
      if (object.sickLeave) {
        newBaseEntry.sickLeave = parseSickLeave(object.sickLeave);
      }

      return {
        ...newBaseEntry,
        employerName: parseStringArg(object.employerName, "employer name"),
      };
    default:
      throw new Error(`Unhandled entry type: ${object.type}`);
  }
};
