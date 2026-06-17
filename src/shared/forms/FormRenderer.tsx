import type React from "react";
import { FormField } from "@/shared/components/ui/FormField";
import type { FieldConfig } from "./types";

type Props = {
  fields: FieldConfig[];
  values: Record<string, unknown>;
  errors: Record<string, string>;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
};

export default function FormRenderer({
  fields,
  values,
  errors,
  onChange,
}: Props) {
  return (
    <>
      {fields.map((field) => (
        <FormField
          key={field.name}
          label={field.label}
          name={field.name}
          type={field.type}
          textarea={field.textarea}
          value={
            values[field.name] as string | number | null | undefined
          }
          onChange={onChange}
          error={errors[field.name]}
        />
      ))}
    </>
  );
}