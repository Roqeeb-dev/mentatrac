"use client";

import { forwardRef, useId } from "react";

export interface SwitchProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  label?: string;
  description?: string;
  disabled?: boolean;
  id?: string;
}

export const Switch = forwardRef<HTMLButtonElement, SwitchProps>(
  ({ checked, onCheckedChange, label, description, disabled, id }, ref) => {
    const generatedId = useId();
    const switchId = id ?? generatedId;

    return (
      <div className="flex items-center justify-between rounded-xl border border-gray-200 bg-surface-2/40 p-4 transition-colors">
        {(label || description) && (
          <div className="flex flex-col gap-0.5">
            {label && (
              <label
                htmlFor={switchId}
                className="cursor-pointer text-body-md font-semibold text-text-primary"
              >
                {label}
              </label>
            )}
            {description && (
              <p className="text-body-sm text-text-secondary">{description}</p>
            )}
          </div>
        )}

        <button
          ref={ref}
          id={switchId}
          type="button"
          role="switch"
          aria-checked={checked}
          disabled={disabled}
          onClick={() => onCheckedChange(!checked)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-700 disabled:cursor-not-allowed disabled:opacity-50 ${
            checked ? "bg-purple-700" : "bg-gray-300"
          }`}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow-sm ring-0 transition duration-200 ease-in-out ${
              checked ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
      </div>
    );
  },
);

Switch.displayName = "Switch";
