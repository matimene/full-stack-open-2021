import React from "react";
import { EntryType } from "../types";
import { NumberField } from "../AddPatientModal/FormField";
import { Field } from "formik";
import { TextField } from "./FormField";

interface Props {
  type: EntryType;
}

const EntryTypesSpecifics = ({ type }: Props) => {
  switch (type) {
    case EntryType.HealthCheck:
      return (
        <Field
          label="healthCheckRating"
          name="healthCheckRating"
          component={NumberField}
          min={0}
          max={3}
        />
      );
    case EntryType.Hospital:
      return (
        <>
          <Field
            label="Discharge Date"
            placeholder="YYYY-MM-DD"
            name="discharge.date"
            component={TextField}
          />
          <Field
            label="Discharge Criteria"
            placeholder="Discharge Criteria"
            name="discharge.criteria"
            component={TextField}
          />
        </>
      );
    case EntryType.OccupationalHealthcare:
      return (
        <>
          <Field
            label="Employer Name"
            placeholder="Employer Name"
            name="employerName"
            component={TextField}
          />
          <Field
            label="Sickleave Start:"
            placeholder="YYYY-MM-DD"
            name="sickLeave.startDate"
            component={TextField}
          />
          <Field
            label="Sickleave End:"
            placeholder="YYYY-MM-DD"
            name="sickLeave.endDate"
            component={TextField}
          />
        </>
      );
    default:
      return <h1>Select EntryType to continue</h1>;
  }
};

export default EntryTypesSpecifics;
