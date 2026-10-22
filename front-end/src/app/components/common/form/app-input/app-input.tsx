"use client";

import { Input } from "@/components/ui/input";
import { IAppInputProps } from "./app-input.type";
import { Controller, useFormContext } from "react-hook-form";

const AppInput = (props: IAppInputProps) => {
    const {
        name,
        label,
        type = "text",
        placeholder,
        required,
        disabled,
        readOnly,
        error,
        className,
        autoComplete,
        rules,
    } = props;

    const { control } = useFormContext();

    return (
        <div className="w-full space-y-1.5">
            <Controller
                control={control}
                name={name}
                rules={
                    rules ||
                    (required
                        ? { required: `${label || name} is required` }
                        : undefined)
                }
                render={({ field, fieldState }) => {
                    const hasError = !!fieldState.error || !!error;
                    const errorMessage = fieldState.error?.message || error;

                    return (
                        <div className="space-y-1.5">
                            {label && (
                                <label
                                    htmlFor={name}
                                    className="block text-sm font-medium text-foreground cursor-pointer"
                                >
                                    {label}
                                    {required && <span className="text-error ml-1">*</span>}
                                </label>
                            )}
                            <Input
                                id={name}
                                type={type}
                                placeholder={placeholder}
                                required={required}
                                disabled={disabled}
                                readOnly={readOnly}
                                autoComplete={autoComplete}
                                className={className}
                                {...field}
                                value={field.value ?? ""}
                            />
                            {hasError && errorMessage && (
                                <p className="text-xs text-error mt-1.5">{errorMessage}</p>
                            )}
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default AppInput;