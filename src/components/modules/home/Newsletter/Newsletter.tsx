/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import "./Newsletter.css";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type FormValues = {
    email: string;
};

const Newsletter = () => {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        reset,
    } = useForm<FormValues>();

    const [success, setSuccess] = useState(false);

    const onSubmit = async (data: FormValues) => {
        // console.log("Submitted email:", data.email);

        await new Promise((resolve) => setTimeout(resolve, 1500));

        setSuccess(true);
        reset();
    };

    return (
        <section className="news-letter-section relative">
            <div className="overlay py-24 px-4 relative">
                <div className="max-w-lg mx-auto text-center text-white">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        Subscribe to our Newsletter
                    </h2>
                    <p className="mb-6 text-white">
                        Get the latest updates and exclusive content delivered
                        straight to your inbox.
                    </p>
                    {success ? (
                        <div className="bg-it-medium-dark p-2 rounded-lg">
                            <p className="text-it-light-primary font-semibold">
                                Thanks for subscribing!
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <div className="flex">
                                <Input
                                    type="email"
                                    placeholder="Your email"
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            message: "Invalid email address",
                                        },
                                    })}
                                    className={`w-full p-2 rounded-lg rounded-r-none bg-white text-black placeholder:text-gray-700 ${
                                        errors.email
                                            ? "border-red-500 border"
                                            : "border-none"
                                    }`}
                                />
                                <Button
                                    type="submit"
                                    disabled={isSubmitting}
                                    className="bg-accent cursor-pointer text-white font-semibold px-6 py-3 rounded-lg rounded-l-none transition duration-300 hover:bg-it-medium-dark disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isSubmitting
                                        ? "Subscribing..."
                                        : "Subscribe"}
                                </Button>
                            </div>
                            {errors.email && (
                                <p className="mt-2 ml-4 text-red-200 text-left text-sm">
                                    {errors.email.message}
                                </p>
                            )}
                        </form>
                    )}
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
