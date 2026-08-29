"use client";

import { forwardRef, useId } from "react";
import type { InputHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface InputProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "size"
> {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  containerClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      helperText,
      leftIcon,
      rightIcon,
      required,
      disabled,
      id,
      className,
      containerClassName,
      value,
      defaultValue,
      ...props
    },
    ref,
  ) => {
    const generatedId = useId();
    const inputId = id ?? generatedId;
    const helperId = `${inputId}-helper`;
    const hasValue =
      (value !== undefined && value !== "") ||
      (defaultValue !== undefined && defaultValue !== "");
    const state = error
      ? "error"
      : disabled
        ? "disabled"
        : hasValue
          ? "filled"
          : undefined;

    return (
      <div className={cn("flex flex-col gap-1.5", containerClassName)}>
        {label && (
          <label
            htmlFor={inputId}
            className="text-body-sm font-medium text-text-primary"
          >
            {label}
            {required && <span className="ml-0.5 text-error">*</span>}
          </label>
        )}

        <div className="relative">
          {leftIcon && (
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {leftIcon}
            </span>
          )}

          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            value={value}
            defaultValue={defaultValue}
            data-state={state}
            aria-invalid={!!error}
            aria-describedby={error || helperText ? helperId : undefined}
            className={cn(
              "input",
              leftIcon && "!pl-10",
              rightIcon && "!pr-10",
              className,
            )}
            {...props}
          />

          {rightIcon && (
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
              {rightIcon}
            </span>
          )}
        </div>

        {(error || helperText) && (
          <p
            id={helperId}
            className={cn(
              "text-caption",
              error ? "text-error" : "text-text-tertiary",
            )}
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
