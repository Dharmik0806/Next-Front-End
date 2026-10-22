import type { ReactNode } from "react";
import type { RegisterOptions } from "react-hook-form";

export interface IAppCheckboxProps {
    name: string;
    label?: ReactNode;
    description?: ReactNode;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    className?: string;
    rules?: RegisterOptions;
}
