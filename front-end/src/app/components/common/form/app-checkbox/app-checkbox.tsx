"use client";

import { Controller, useFormContext } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { cn } from "@/lib/utils";
import { IAppCheckboxProps } from "./app-checkbox.type";

const AppCheckbox = (props: IAppCheckboxProps) => {
    const {
        name,
        label,
        description,
        required,
        disabled,
        error,
        className,
        rules,
    } = props;

    const { control } = useFormContext();

    return (
        <div className="w-full">
            <Controller
                control={control}
                name={name}
                rules={
                    rules ||
                    (required
                        ? { required: `${typeof label === "string" ? label : name} is required` }
                        : undefined)
                }
                render={({ field, fieldState }) => {
                    const hasError = !!fieldState.error || !!error;
                    const errorMessage = fieldState.error?.message || error;

                    return (
                        <div className="space-y-1">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id={name}
                                    checked={!!field.value}
                                    onCheckedChange={(checked) => field.onChange(checked)}
                                    disabled={disabled}
                                    className={className}
                                />
                                {label && (
                                    <label
                                        htmlFor={name}
                                        className={cn(
                                            "text-xs sm:text-sm font-medium text-muted-foreground select-none cursor-pointer hover:text-foreground transition-colors",
                                            disabled && "cursor-not-allowed opacity-50"
                                        )}
                                    >
                                        {label}
                                        {required && <span className="text-error ml-1">*</span>}
                                    </label>
                                )}
                            </div>
                            {description && (
                                <p className="text-xs text-muted-foreground pl-6">{description}</p>
                            )}
                            {hasError && errorMessage && (
                                <p className="text-xs text-error mt-1">{errorMessage}</p>
                            )}
                        </div>
                    );
                }}
            />
        </div>
    );
};

export default AppCheckbox;
