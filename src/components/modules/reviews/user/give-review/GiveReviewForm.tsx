/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import {
    Controller,
    FieldValues,
    SubmitHandler,
    useForm,
} from "react-hook-form";
import { toast } from "sonner";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { IProduct, IUser } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { toastStyles } from "@/constants";
import { reCaptchaTokenVerification } from "@/services/auth";
import { Textarea } from "@/components/ui/textarea";
import { giveReviewValidationSchema } from "./giveReviewValidation";
import { giveReview } from "@/services/review";

const GiveReviewForm = ({
    user,
    products,
}: {
    user: IUser;
    products: IProduct[];
}) => {
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(giveReviewValidationSchema),
        defaultValues: {
            product: "",
            rating: 5,
            comment: "",
        },
    });

    const {
        control,
        formState: { isSubmitting, errors },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!reCaptchaStatus) {
            toast.warning("Complete the Captcha First!", {
                style: toastStyles.warning,
            });

            return;
        }

        const toastId = toast.loading("Giving review...", {
            style: toastStyles.loading,
        });

        const reviewData = {
            ...data,
        };
        try {
            const res = await giveReview(reviewData);

            if (res.success) {
                form.reset();

                toast.success("Review given successfully", {
                    id: toastId,
                    style: toastStyles.success,
                });
            } else {
                toast.error(res?.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error: any) {
            toast.error("Failed to give review", {
                id: toastId,
                style: toastStyles.error,
            });

            console.log(error);
        }
    };

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

    return (
        <div className="update-product-form rounded-xl flex-grow w-full p-5 login-form">
            <Link href={`/${user?.role}/dashboard/reviews`}>
                <Button className="bg-primary hover:bg-secondary cursor-pointer font-semibold mb-10">
                    <ArrowLeft /> Reviews
                </Button>
            </Link>
            <div className="flex items-center space-x-4">
                <div className="space-y-2 mb-4">
                    <h1 className="text-2xl text-secondary font-bold">
                        Give Review
                    </h1>
                    <p className="font-normal text-md">
                        Fill up the form to give your review!
                    </p>
                </div>
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <Controller
                        name="product"
                        control={control}
                        rules={{ required: "Product is required" }}
                        render={({ field }) => (
                            <div className="form-item">
                                <FormLabel
                                    className={`font-bold text-sm ${
                                        errors.product
                                            ? "text-destructive"
                                            : "text-black"
                                    }`}
                                >
                                    Product
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue=""
                                >
                                    <SelectTrigger className="mt-2 w-full bg-gray-100 text-black placeholder:text-gray-700">
                                        <SelectValue placeholder="Select product to review" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {products.map((product, idx) => (
                                                <SelectItem
                                                    key={idx}
                                                    value={product?._id}
                                                >
                                                    {product.title}
                                                </SelectItem>
                                            ))}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.product && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.product.message as string}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="rating"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Rating
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={0}
                                        max={5}
                                        step={0.1}
                                        className="bg-gray-100 text-black placeholder:text-gray-700"
                                        {...field}
                                        value={field.value || 1}
                                        placeholder="Enter rating of the review"
                                        onChange={(e) => {
                                            field.onChange(
                                                Number(e.target.value)
                                            );
                                        }}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="comment"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Comment
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-gray-100 text-black placeholder:text-gray-700"
                                        {...field}
                                        placeholder="Enter brief comment for the product's review..."
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <div className="flex my-3 w-full overflow-x-scroll sm:overflow-x-auto">
                        <ReCAPTCHA
                            sitekey={
                                process.env
                                    .NEXT_PUBLIC_RECAPTCHA_CLIENT_KEY as string
                            }
                            onChange={handleReCaptcha}
                            className="mt-5 mb-3"
                        />
                    </div>
                    <Button
                        disabled={reCaptchaStatus ? false : true}
                        type="submit"
                        className="!mt-5 bg-accent hover:bg-accent cursor-pointer font-semibold px-6"
                    >
                        {isSubmitting ? "Giving..." : "Give"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default GiveReviewForm;
