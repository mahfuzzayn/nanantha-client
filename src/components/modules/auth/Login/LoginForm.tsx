/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginFormSchema } from "./loginFormValidation";
import { toast } from "sonner";
import { toastStyles } from "@/constants/toaster";
import { loginUser, reCaptchaTokenVerification } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

const LoginForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const { handleUser, setIsLoading } = useUser();
    const [redirect, setRedirect] = useState<string | null>(null);
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(loginFormSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setRedirect(searchParams.get("redirectPath"));
    }, []);

    const {
        formState: { isSubmitting },
    } = form;

    const handleReCaptcha = async (value: string | null) => {
        try {
            const res = await reCaptchaTokenVerification(value!);

            if (res?.success) {
                setReCaptchaStatus(true);
            }
        } catch (error: any) {
            console.error(Error(error));
        }
    };

    const handleLoadDemoCredentials = (role: "user" | "admin") => {
        if (role === "user") {
            form.setValue(
                "email",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_USER_EMAIL as string
            );
            form.setValue(
                "password",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_USER_PASSWORD as string
            );

            toast.success("Demo User credentials has been filled.");
        } else if (role === "admin") {
            form.setValue(
                "email",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_ADMIN_EMAIL as string
            );
            form.setValue(
                "password",
                process.env.NEXT_PUBLIC_LOGIN_DEMO_ADMIN_PASSWORD as string
            );

            toast.success("Demo Admin credentials has been filled.");
        }
    };

    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        const toastId = toast.loading("Logging...", {
            style: toastStyles.loading,
        });

        try {
            const res = await loginUser(data);
            setIsLoading(true);

            if (res.success) {
                handleUser();
                toast.success("Logged in successfully.", {
                    id: toastId,
                    style: toastStyles.success,
                });

                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/");
                }
            } else {
                toast.error(res.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error) {
            toast.error("There was an error while logging in.", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }
    };

    return (
        <div className={cn("flex flex-col gap-6", className)} {...props}>
            <Card>
                <CardHeader className="text-center">
                    <CardTitle className="text-xl text-secondary">Login</CardTitle>
                    <CardDescription>
                        Welcome back! Log in with your credentials below.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="mb-4 relative">
                        <h2 className="font-semibold">Quick Login (Demo)</h2>
                        <div className="flex justify-between gap-3 mt-4">
                            <button
                                onClick={() =>
                                    handleLoadDemoCredentials("user")
                                }
                                className="w-full cursor-pointer bg-transparent text-it-secondary hover:bg-accent hover:text-white font-semibold border-[1px] border-it-secondary px-2 py-1 rounded-md transition-all duration-300"
                            >
                                User
                            </button>
                            <button
                                onClick={() =>
                                    handleLoadDemoCredentials("admin")
                                }
                                className="w-full cursor-pointer bg-transparent text-it-secondary hover:bg-accent hover:text-white font-semibold border-[1px] border-it-secondary px-2 py-1 rounded-md transition-all duration-300"
                            >
                                Admin
                            </button>
                        </div>
                    </div>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Email</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="email"
                                                            placeholder="Enter your email"
                                                            {...field}
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="password"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        Password
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="password"
                                                            placeholder="Enter your password"
                                                            {...field}
                                                            value={
                                                                field.value ||
                                                                ""
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <ReCAPTCHA
                                        sitekey={
                                            process.env
                                                .NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string
                                        }
                                        className="mx-auto my-4"
                                        onChange={handleReCaptcha}
                                    />
                                    <Button
                                        disabled={
                                            reCaptchaStatus ? false : true
                                        }
                                        type="submit"
                                        className="w-full cursor-pointer"
                                    >
                                        {isSubmitting ? "Logging..." : "Login"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        href="/register"
                                        className="underline underline-offset-4"
                                    >
                                        Register
                                    </Link>
                                </div>
                                <div className="text-center text-sm">
                                    Back to{" "}
                                    <Link
                                        href="/"
                                        className="underline underline-offset-4"
                                    >
                                        Home
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </Form>
                </CardContent>
            </Card>
        </div>
    );
};

export default LoginForm;
