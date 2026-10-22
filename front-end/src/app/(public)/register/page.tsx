"use client";

import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { UserPlus, ArrowRight, Loader2 } from "lucide-react";
import AppInput from "@/app/components/common/form/app-input/app-input";
import AppPassword from "@/app/components/common/form/app-password/app-password";
import AppCheckbox from "@/app/components/common/form/app-checkbox/app-checkbox";
import { Button } from "@/components/ui/button";
import { useRegisterMutation } from "@/hooks/api/use-auth";
import { IRegisterFormInput } from "./register.type";

const Register = () => {
    const { mutate: registerUser, isPending } = useRegisterMutation();

    const methods = useForm<IRegisterFormInput>({
        defaultValues: {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            terms: false,
        },
        mode: "onTouched",
    });

    const {
        handleSubmit,
        getValues,
        formState: { isSubmitting },
    } = methods;

    const isLoading = isSubmitting || isPending;

    const onSubmit: SubmitHandler<IRegisterFormInput> = (data) => {
        registerUser({
            name: data.name,
            email: data.email,
            password: data.password,
        });
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center px-4 py-12 overflow-hidden bg-background">
            {/* Ambient background decoration */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
            >
                <div className="h-[480px] w-[480px] rounded-full bg-primary/10 blur-[120px] dark:bg-primary/20" />
                <div className="h-[360px] w-[360px] translate-x-1/3 -translate-y-1/4 rounded-full bg-secondary/30 blur-[100px]" />
            </div>

            {/* Registration Card */}
            <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card/85 p-6 sm:p-8 shadow-xl backdrop-blur-md transition-all">
                {/* Header Section */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md ring-4 ring-primary/15">
                        <UserPlus className="size-6" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Create an account
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Enter your information to register a new account
                    </p>
                </div>

                {/* Form Section */}
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
                        {/* Name Input */}
                        <AppInput
                            name="name"
                            label="Full Name"
                            type="text"
                            placeholder="John Doe"
                            autoComplete="name"
                            required
                            rules={{
                                required: "Full name is required",
                                minLength: {
                                    value: 2,
                                    message: "Full name must be at least 2 characters",
                                },
                            }}
                        />

                        {/* Email Input */}
                        <AppInput
                            name="email"
                            label="Email Address"
                            type="email"
                            placeholder="name@example.com"
                            autoComplete="email"
                            required
                            rules={{
                                required: "Email address is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Please enter a valid email address",
                                },
                            }}
                        />

                        {/* Password Input */}
                        <AppPassword
                            name="password"
                            label="Password"
                            placeholder="Create a password"
                            autoComplete="new-password"
                            required
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                        />

                        {/* Confirm Password Input */}
                        <AppPassword
                            name="confirmPassword"
                            label="Confirm Password"
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
                            required
                            rules={{
                                required: "Please confirm your password",
                                validate: (value: string) =>
                                    value === getValues("password") || "Passwords do not match",
                            }}
                        />

                        {/* Terms and Conditions Checkbox */}
                        <AppCheckbox
                            name="terms"
                            label={
                                <span>
                                    I agree to the{" "}
                                    <a
                                        href="#terms"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            alert("Terms and Conditions terms modal/page.");
                                        }}
                                        className="font-medium text-primary hover:underline"
                                    >
                                        Terms & Conditions
                                    </a>
                                </span>
                            }
                            required
                            rules={{
                                required: "You must agree to the Terms & Conditions",
                            }}
                        />

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-10 mt-2 font-medium cursor-pointer transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin mr-2" />
                                    Creating account...
                                </>
                            ) : (
                                <>
                                    Create account
                                    <ArrowRight className="size-4 ml-1" />
                                </>
                            )}
                        </Button>
                    </form>
                </FormProvider>

                {/* Footer Section */}
                <div className="mt-6 text-center text-xs text-muted-foreground">
                    Already have an account?{" "}
                    <Link
                        href="/login"
                        className="font-semibold text-primary hover:underline transition-colors"
                    >
                        Sign in
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Register;
