import React from "react";
import { ErrorMessage, Field, FieldProps } from "formik";
import { Form } from "semantic-ui-react";
import { EntryType } from "../types";

export type EntryTypeOption = {
  value: EntryType;
  label: string;
};

interface TextProps extends FieldProps {
  label: string;
  placeholder: string;
}

export const TextField = ({ field, label, placeholder }: TextProps) => (
  <Form.Field>
    <label>{label}</label>
    <Field placeholder={placeholder} {...field} />
    <div style={{ color: "red" }}>
      <ErrorMessage name={field.name} />
    </div>
  </Form.Field>
);
