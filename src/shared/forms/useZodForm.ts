import { useState } from "react";
import type React from "react";
import type { ZodType } from "zod";

export function useZodForm<T extends Record<string, unknown>>(
  initialData: T,
  schema: ZodType<T>,
) {
  const [form, setForm] = useState<T>(initialData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]:
        value === ""
          ? null
          : type === "number"
            ? Number(value)
            : value,
    }));
  };

  const validate = (): T | null => {
    const result = schema.safeParse(form);

    if (result.success) {
      setErrors({});
      return result.data;
    }

    const nextErrors: Record<string, string> = {};

    result.error.issues.forEach((issue) => {
      const key = issue.path[0];

      if (typeof key === "string") {
        nextErrors[key] = issue.message;
      }
    });

    setErrors(nextErrors);

    return null;
  };

  const reset = (nextValue: T) => {
    setForm(nextValue);
    setErrors({});
  };

  return {
    form,
    setForm,
    errors,
    setErrors,
    submitting,
    setSubmitting,
    handleChange,
    validate,
    reset,
  };
}