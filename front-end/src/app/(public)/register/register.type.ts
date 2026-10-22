export interface IRegisterFormInput {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
    terms?: boolean;
}