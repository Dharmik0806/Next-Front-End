"use client";

import { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { IAppPasswordProps } from "./app-password.type";

const AppPassword = (props: IAppPasswordProps) => {
    const {
        name,
        label,
        placeholder = "••••••••",
        required,
        disabled,
        readOnly,
        error,
        className,
        autoComplete = "current-password",
        showToggle = true,
        rules,
    } = props;

    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { control } = useFormContext();

    const toggleVisibility = () => {
        if (!disabled && !readOnly) {
            setShowPassword((prev) => !prev);
        }
    };

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
                            <div className="relative flex items-center">
                                <Input
                                    id={name}
                                    type={showPassword ? "text" : "password"}
                                    placeholder={placeholder}
                                    required={required}
                                    disabled={disabled}
                                    readOnly={readOnly}
                                    autoComplete={autoComplete}
                                    className={cn(showToggle ? "pr-9" : "", className)}
                                    {...field}
                                    value={field.value ?? ""}
                                />
                                {showToggle && (
                                    <button
                                        type="button"
                                        onClick={toggleVisibility}
                                        disabled={disabled || readOnly}
                                        tabIndex={0}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                        aria-pressed={showPassword}
                                        className="absolute right-1 top-1/2 -translate-y-1/2 flex size-6 items-center justify-center rounded text-muted-foreground transition-colors hover:text-foreground hover:bg-muted/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="size-3.5 shrink-0" aria-hidden="true" />
                                        ) : (
                                            <Eye className="size-3.5 shrink-0" aria-hidden="true" />
                                        )}
                                    </button>
                                )}
                            </div>
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

export default AppPassword;
