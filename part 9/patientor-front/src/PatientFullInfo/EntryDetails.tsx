import React from "react";
import {
  Entry,
  HealthCheckEntry,
  OccupationalHealthcareEntry,
  HospitalEntry,
} from "../types";
import { assertNever } from "../utils";

import { Card, Icon } from "semantic-ui-react";

const HealthCheckEntryDetails: React.FC<{
  entry: HealthCheckEntry;
}> = ({ entry }) => {
  return (
    <Card>
      <Icon name="doctor" size="big" />
      <Card.Header>{entry.date}</Card.Header>
      <Card.Description>{entry.description}</Card.Description>
      <label>Rating 0-3: {entry.healthCheckRating}</label>
    </Card>
  );
};

const HospitalEntryDetails: React.FC<{
  entry: HospitalEntry;
}> = ({ entry }) => {
  return (
    <Card>
      <Icon name="hospital" size="big" />
      <Card.Header>{entry.date}</Card.Header>
      <Card.Description>{entry.description}</Card.Description>
      <label>
        <strong>discharge:</strong>
        <label>
          {entry.discharge.date}: {entry.discharge.criteria}
        </label>
      </label>
    </Card>
  );
};

const OccupationalHealthcare: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  return (
    <Card>
      <Icon name="id badge" size="big" />
      <Card.Header>{entry.date}</Card.Header>
      <Card.Description>{entry.description}</Card.Description>
      {entry.sickLeave && (
        <label>
          <strong>sickleave:</strong>
          <label>
            {entry.sickLeave?.startDate} until {entry.sickLeave?.endDate}
          </label>
        </label>
      )}
    </Card>
  );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />;
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />;
    case "OccupationalHealthcare":
      return <OccupationalHealthcare entry={entry} />;
    default:
      return assertNever(entry);
  }
};

export default EntryDetails;
