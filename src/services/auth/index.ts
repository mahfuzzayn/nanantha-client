/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { jwtDecode } from "jwt-decode";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { FieldValues } from "react-hook-form";

export const registerUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/register-user`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const result = await res.json();

        if (result.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
            (await cookies()).set("refreshToken", result?.data?.refreshToken);
        }

        revalidateTag("USER");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const loginUser = async (userData: FieldValues) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/login`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            }
        );

        const result = await res.json();

        if (result.success) {
            (await cookies()).set("accessToken", result?.data?.accessToken);
            (await cookies()).set("refreshToken", result?.data?.refreshToken);
        }

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const reCaptchaTokenVerification = async (token: string) => {
    try {
        const res = await fetch(
            "https://www.google.com/recaptcha/api/siteverify",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    secret: process.env.NEXT_PUBLIC_RECAPTCHA_SERVER_KEY!,
                    response: token,
                }),
            }
        );

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};

export const getCurrentUser = async () => {
    const accessToken = (await cookies()).get("accessToken")?.value;
    let decodedData = null;

    if (accessToken) {
        decodedData = await jwtDecode(accessToken);
        return decodedData;
    } else {
        return null;
    }
};

export const getMe = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/me`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["USER"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const logout = async () => {
    (await cookies()).delete("accessToken");
};

export const getNewToken = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/auth/refresh-token`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: (await cookies()).get("refreshToken")!.value,
                },
            }
        );

        return res.json();
    } catch (error: any) {
        return Error(error);
    }
};
