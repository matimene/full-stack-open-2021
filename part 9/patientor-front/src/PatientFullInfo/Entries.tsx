import React from "react";
import { Patient, Entry } from "../types";
import { useStateValue } from "../state";

const mapDiagnosisCodes = (entry: Entry) => {
  const [{ diagnosisCodes }] = useStateValue();

  const returnDesc = (code: string): string => {
    return diagnosisCodes.find((d) => d.code === code)!.name;
  };

  if (entry && entry.diagnosisCodes) {
    return (
      <ul>
        {entry.diagnosisCodes.map((code) => (
          <li key={code}>
            {code}: {returnDesc(code)}
          </li>
        ))}
      </ul>
    );
  }
};

interface EntriesProps {
  patient: Patient;
}

const Entries: React.FC<EntriesProps> = ({ patient }: EntriesProps) => {
  if (!patient.entries) {
    return <p>No entries to show yet!</p>;
  }

  return (
    <>
      <h3>Entries: </h3>
      {patient.entries.map((entry) => {
        return (
          <div key={entry.id}>
            <p>
              {entry.date}: {entry.description}
            </p>
            {mapDiagnosisCodes(entry)}
          </div>
        );
      })}
    </>
  );
};

export default Entries;
