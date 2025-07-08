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
import { IUser } from "@/types";
import ReCAPTCHA from "react-google-recaptcha";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { productCategories, toastStyles } from "@/constants";
import { reCaptchaTokenVerification } from "@/services/auth";
import { createProduct } from "@/services/product";
import ImagePreviewer from "@/components/ui/core/NNImageUploader/ImagePreviewer";
import NNImageUploader from "@/components/ui/core/NNImageUploader";
import { Textarea } from "@/components/ui/textarea";
import { createProductValidationSchema } from "./createProductValidation";

const CreateProductForm = ({ user }: { user: IUser }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(createProductValidationSchema),
        defaultValues: {
            title: "",
            author: "",
            price: 1,
            category: "",
            description: "",
            quantity: 0,
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
        } else if (!imageFile) {
            toast.warning("Product Image is required!", {
                style: toastStyles.warning,
            });

            return;
        }

        const toastId = toast.loading("Creating product...", {
            style: toastStyles.loading,
        });

        const formData = new FormData();
        const modifiedProductData = {
            ...data,
        };

        formData.append("data", JSON.stringify(modifiedProductData));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await createProduct(formData);

            if (res.success) {
                form.reset();

                toast.success("Product created successfully", {
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
            toast.error("Failed to create the product", {
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
            <Link href={`/${user?.role}/dashboard/products`}>
                <Button className="bg-primary hover:bg-secondary cursor-pointer font-semibold mb-10">
                    <ArrowLeft /> Products
                </Button>
            </Link>
            <div className="flex items-center space-x-4">
                <div className="space-y-2 mb-4">
                    <h1 className="text-2xl text-secondary font-bold">
                        Create Product
                    </h1>
                    <p className="font-normal text-md">
                        Fill up the form and publish a product!
                    </p>
                </div>
            </div>
            <div className="flex justify-start mb-5">
                {imagePreview ? (
                    <ImagePreviewer
                        className="flex flex-wrap gap-4"
                        setImageFile={setImageFile}
                        imagePreview={imagePreview}
                        setImagePreview={setImagePreview}
                    />
                ) : (
                    <NNImageUploader
                        setImageFile={setImageFile}
                        setImagePreview={setImagePreview}
                        label="Upload Image"
                        className="w-full max-w-44 mt-0"
                    />
                )}
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="title"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Title
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="bg-gray-100 text-black placeholder:text-gray-700"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="author"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Author
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="bg-gray-100 text-black placeholder:text-gray-700"
                                                {...field}
                                                value={field.value || ""}
                                            />
                                        </FormControl>
                                        <FormMessage className="text-red-500" />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="price"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Price
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={1}
                                                className="bg-gray-100 text-black placeholder:text-gray-700"
                                                {...field}
                                                value={field.value || 1}
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
                        </div>
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="quantity"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Quantity
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="number"
                                                min={0}
                                                className="bg-gray-100 text-black placeholder:text-gray-700"
                                                {...field}
                                                value={field.value || 0}
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
                        </div>
                    </div>
                    <Controller
                        name="category"
                        control={control}
                        rules={{ required: "Category is required" }}
                        render={({ field }) => (
                            <div className="form-item">
                                <FormLabel
                                    className={`font-bold text-sm ${
                                        errors.category
                                            ? "text-destructive"
                                            : "text-black"
                                    }`}
                                >
                                    Category
                                </FormLabel>
                                <Select
                                    onValueChange={field.onChange}
                                    value={field.value}
                                    defaultValue=""
                                >
                                    <SelectTrigger className="mt-2 w-full bg-gray-100 text-black placeholder:text-gray-700">
                                        <SelectValue placeholder="Select a grade" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectGroup>
                                            {productCategories.map(
                                                (category, idx) => (
                                                    <SelectItem
                                                        key={idx}
                                                        value={category.value}
                                                    >
                                                        {category.label}
                                                    </SelectItem>
                                                )
                                            )}
                                        </SelectGroup>
                                    </SelectContent>
                                </Select>
                                {errors.category && (
                                    <p className="text-red-500 text-sm mt-2">
                                        {errors.category.message as string}
                                    </p>
                                )}
                            </div>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Description
                                </FormLabel>
                                <FormControl>
                                    <Textarea
                                        className="bg-gray-100 text-black placeholder:text-gray-700"
                                        {...field}
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
                        {isSubmitting ? "Creating..." : "Create"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default CreateProductForm;
