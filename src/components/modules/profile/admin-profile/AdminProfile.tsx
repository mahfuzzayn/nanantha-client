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
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import ReCAPTCHA from "react-google-recaptcha";
import { IUser } from "@/types";
import { updateProfile } from "@/services/user";
import ImagePreviewer from "@/components/ui/core/NNImageUploader/ImagePreviewer";
import NNImageUploader from "@/components/ui/core/NNImageUploader";
import { reCaptchaTokenVerification } from "@/services/auth";
import { adminProfileSchema } from "./adminProfileSchema";
import { toastStyles } from "@/constants";

const AdminProfile = ({ admin }: { admin: IUser }) => {
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(
        admin?.profileUrl || null
    );
    const [reCaptchaStatus, setReCaptchaStatus] = useState(false);

    const form = useForm({
        resolver: zodResolver(adminProfileSchema),
        defaultValues: {
            name: admin?.name,
            location: admin?.location,
            oldPassword: "",
            newPassword: "",
        },
    });

    const {
        formState: { isSubmitting },
    } = form;

    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        if (!reCaptchaStatus) {
            toast.warning("Complete the Captcha First!", {
                style: toastStyles.warning,
            });

            return;
        }

        const toastId = toast.loading("Updating your profile...", {
            style: toastStyles.loading,
        });

        const formData = new FormData();
        const modifiedData = {
            ...data,
        };

        formData.append("data", JSON.stringify(modifiedData));

        if (imageFile) {
            formData.append("image", imageFile);
        }

        try {
            const res = await updateProfile(formData);

            if (res.success) {
                toast.success("Your profile has been updated", {
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
            toast.error("Failed to update your profile", {
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
        <div className="rounded-xl flex-grow w-full mx-auto p-5 login-form">
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
                    className="space-y-4"
                >
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="w-full">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Name
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="bg-gray-100 text-black placeholder:text-gray-700"
                                                placeholder="Enter your name"
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
                                name="location"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel className="font-bold">
                                            Location
                                        </FormLabel>
                                        <FormControl>
                                            <Input
                                                type="text"
                                                className="bg-gray-100 text-black placeholder:text-gray-700"
                                                placeholder="Enter your location"
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
                    <FormField
                        control={form.control}
                        name="oldPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    Old Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="bg-gray-100 text-black placeholder:text-gray-700"
                                        placeholder="Enter your old password"
                                        {...field}
                                        value={field.value || ""}
                                    />
                                </FormControl>
                                <FormMessage className="text-red-500" />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="newPassword"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-bold">
                                    New Password
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        className="bg-gray-100 text-black placeholder:text-gray-700"
                                        placeholder="Enter new password"
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
                        className="!mt-5 bg-accent hover:bg-accent font-semibold px-6 cursor-pointer"
                    >
                        {isSubmitting
                            ? "Updating Profile..."
                            : "Update Profile"}
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default AdminProfile;
