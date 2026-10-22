import type { RegisterOptions } from "react-hook-form";

export interface IAppInputProps {
    name: string;
    label?: string;
    type?: string;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    readOnly?: boolean;
    error?: string;
    touched?: boolean;
    className?: string;
    autoComplete?: string;
    rules?: RegisterOptions;
}
