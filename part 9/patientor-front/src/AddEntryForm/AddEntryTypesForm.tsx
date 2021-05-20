import React, { useState } from "react";
import { EntryTypeOption } from "./FormField";
import { EntryType, EntryFormValues } from "../types";
import HospitalEntryForm from "./HospitalEntryForm";
import OccupationalEntryForm from "./OccupationalEntryForm";
import HealthcheckEntryForm from "./HealthcheckEntryForm";
import { Dropdown, DropdownProps, Form } from "semantic-ui-react";

const entryTypeOptions: EntryTypeOption[] = [
  { value: EntryType.HealthCheck, label: "HealthCheck" },
  { value: EntryType.Hospital, label: "Hospital" },
  { value: EntryType.OccupationalHealthcare, label: "OccupationalHealthcare" },
];

interface Props {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
}

const AddEntryForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType] = useState<EntryType | undefined>(undefined);

  const renderEntryForms = () => {
    switch (type) {
      case EntryType.Hospital:
        return <HospitalEntryForm onSubmit={onSubmit} onCancel={onCancel} />;
      case EntryType.OccupationalHealthcare:
        return (
          <OccupationalEntryForm onSubmit={onSubmit} onCancel={onCancel} />
        );
      case EntryType.HealthCheck:
        return <HealthcheckEntryForm onSubmit={onSubmit} onCancel={onCancel} />;
      default:
        return <div>Select Entry Type for extra inputs</div>;
    }
  };

  const handleChange = (
    _e: React.SyntheticEvent,
    { value }: DropdownProps
  ): void => {
    if (value) setType(value as EntryType);
  };

  return (
    <>
      <Form>
        <Form.Field>
          <label>Entry Type</label>
          <Dropdown
            fluid
            onChange={handleChange}
            options={entryTypeOptions}
            selection
            value={type}
          />
        </Form.Field>
      </Form>
      {renderEntryForms()}
    </>
  );
};

export default AddEntryForm;
