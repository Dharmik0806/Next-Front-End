"use client";

import { useState } from "react";
import Link from "next/link";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { Lock, Mail, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import AppInput from "@/app/components/common/form/app-input/app-input";
import AppPassword from "@/app/components/common/form/app-password/app-password";
import AppCheckbox from "@/app/components/common/form/app-checkbox/app-checkbox";
import { Button } from "@/components/ui/button";
import { useLoginMutation } from "@/hooks/api/use-auth";
import { ILoginFormInput } from "./login.type";

const Login = () => {
    const { mutate: login, isPending } = useLoginMutation();

    const methods = useForm<ILoginFormInput>({
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
        mode: "onTouched",
    });

    const {
        handleSubmit,
        formState: { isSubmitting },
    } = methods;
    // console.log("🚀 ~ Login ~ isSubmitting:", isSubmitting)
    // console.log("🚀 ~ Login ~ isSubmitting:", isSubmitting)
    // console.log("🚀 ~ Login ~ isSubmitting:", isSubmitting)
    // console.log("🚀 ~ Login ~ isSubmitting:", isSubmitting)
    // console.log("🚀 ~ Login ~ isSubmitting:", isSubmitting)



    const isLoading = isSubmitting || isPending;

    const onSubmit: SubmitHandler<ILoginFormInput> = (data) => {
        login({
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

            {/* Login Card */}
            <div className="w-full max-w-md rounded-2xl border border-border/80 bg-card/85 p-6 sm:p-8 shadow-xl backdrop-blur-md transition-all">
                {/* Header Section */}
                <div className="mb-6 flex flex-col items-center text-center">
                    <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-md ring-4 ring-primary/15">
                        <Lock className="size-6" />
                    </div>
                    <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                        Welcome back
                    </h1>
                    <p className="mt-1 text-sm text-muted-foreground">
                        Please sign in to access your dashboard
                    </p>
                </div>

                {/* Success Banner (when submitted in demo) */}
                {/* {submittedData && (
                    <div className="mb-6 flex items-start gap-3 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-700 dark:text-emerald-400">
                        <ShieldCheck className="size-5 shrink-0 mt-0.5" />
                        <div>
                            <p className="font-medium">Form successfully submitted!</p>
                            <p className="text-xs opacity-90">
                                Authenticated as {submittedData.email}
                            </p>
                        </div>
                    </div>
                )} */}

                {/* Form Section */}
                <FormProvider {...methods}>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
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
                            placeholder="Enter your password"
                            autoComplete="current-password"
                            required
                            rules={{
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters",
                                },
                            }}
                        />

                        {/* Options: Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between text-xs sm:text-sm gap-2">
                            <AppCheckbox
                                name="rememberMe"
                                label="Remember me"
                            />
                            <a
                                href="#forgot-password"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert("Password reset functionality will be sent to your registered email.");
                                }}
                                className="font-medium text-primary hover:underline whitespace-nowrap shrink-0"
                            >
                                Forgot password?
                            </a>
                        </div>

                        {/* Submit Button */}
                        <Button
                            type="submit"
                            disabled={isLoading}
                            className="w-full h-10 mt-2 font-medium cursor-pointer transition-all"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="size-4 animate-spin mr-2" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign in
                                    <ArrowRight className="size-4 ml-1" />
                                </>
                            )}
                        </Button>
                    </form>
                </FormProvider>

                {/* Footer Section */}
                <div className="mt-6 text-center text-xs text-muted-foreground">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/register"
                        className="font-semibold text-primary hover:underline transition-colors"
                    >
                        Create an account
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Login;