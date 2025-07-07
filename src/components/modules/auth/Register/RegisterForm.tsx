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
import { registerFormSchema } from "./registerFormValidation";
import { toast } from "sonner";
import { toastStyles } from "@/constants/toaster";
import { reCaptchaTokenVerification, registerUser } from "@/services/auth";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useRouter } from "next/navigation";

const RegisterForm = ({ className, ...props }: React.ComponentProps<"div">) => {
    const { handleUser, setIsLoading } = useUser();
    const [redirect, setRedirect] = useState<string | null>(null);
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(registerFormSchema),
        defaultValues: {
            name: "",
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

    const onSubmit: SubmitHandler<FieldValues> = async (data: FieldValues) => {
        const toastId = toast.loading("Registering...", {
            style: toastStyles.loading,
        });

        try {
            const res = await registerUser(data);
            setIsLoading(true);

            if (res.success) {
                handleUser();
                toast.success("Registration completed successfully.", {
                    id: toastId,
                    style: toastStyles.success,
                });

                if (redirect) {
                    router.push(redirect);
                } else {
                    router.push("/");
                }
            } else {
                toast.error("Failed to register.", {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error) {
            toast.error("There was an error while registering.", {
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
                    <CardTitle className="text-xl text-secondary">Register</CardTitle>
                    <CardDescription>
                        Get started with purchases right after the registration
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <div className="grid gap-6">
                                <div className="grid gap-6">
                                    <div className="grid gap-3">
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>Name</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="text"
                                                            placeholder="Enter your name"
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
                                        {isSubmitting
                                            ? "Registering..."
                                            : "Register"}
                                    </Button>
                                </div>
                                <div className="text-center text-sm">
                                    Have an account already?{" "}
                                    <Link
                                        href="/login"
                                        className="underline underline-offset-4"
                                    >
                                        Login
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

export default RegisterForm;
