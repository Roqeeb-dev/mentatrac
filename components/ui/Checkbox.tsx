"use client";

import { forwardRef, useId } from "react";
import { Check } from "lucide-react";

export interface CheckboxProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ checked, onCheckedChange, label, description, disabled, id }, ref) => {
    const generatedId = useId();
    const checkboxId = id ?? generatedId;

    return (
      <label
        htmlFor={checkboxId}
        className={`flex items-start gap-3 rounded-xl border p-3.5 transition-colors ${
          disabled ? "cursor-not-allowed opacity-50" : "cursor-pointer"
        } ${
          checked
            ? "border-purple-700 bg-purple-50/50"
            : "border-gray-200 bg-white hover:border-gray-300"
        }`}
      >
        <div className="relative flex items-center pt-0.5">
          <input
            ref={ref}
            id={checkboxId}
            type="checkbox"
            checked={checked}
            disabled={disabled}
            onChange={(e) => onCheckedChange(e.target.checked)}
            className="peer sr-only"
          />
          <div
            className={`flex h-5 w-5 items-center justify-center rounded-md border transition-all ${
              checked
                ? "border-purple-700 bg-purple-700 text-white"
                : "border-gray-300 bg-white peer-focus-visible:ring-2 peer-focus-visible:ring-purple-700"
            }`}
          >
            {checked && <Check className="h-3.5 w-3.5 stroke-[3]" />}
          </div>
        </div>

        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <span className="text-body-md font-semibold text-text-primary">
                {label}
              </span>
            )}
            {description && (
              <span className="text-body-sm text-text-secondary">
                {description}
              </span>
            )}
          </div>
        )}
      </label>
    );
  },
);

Checkbox.displayName = "Checkbox";
