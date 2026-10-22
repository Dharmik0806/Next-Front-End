import type { RegisterOptions } from "react-hook-form";

export interface IAppPasswordProps {
    name: string;
    label?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    error?: string;
    touched?: boolean;
    className?: string;
    autoComplete?: string;
    showToggle?: boolean;
    rules?: RegisterOptions;
}

