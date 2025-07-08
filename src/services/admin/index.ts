"use server";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { getValidToken } from "@/lib/verifyToken";
import { IUser } from "@/types";
import { revalidateTag } from "next/cache";

// User Management
export const getAllUsers = async (
    page?: string,
    limit?: string,
    sort?: string,
    query?: {
        [key: string]: string | string[] | undefined;
    }
) => {
    const token = await getValidToken();
    const params = new URLSearchParams();

    if (query?.role) {
        params.append("role", query?.role.toString());
    }

    if (query?.isActive) {
        params.append("isActive", query?.isActive.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users?limit=${limit}&page=${page}&${params}&sort=${sort}`,
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

export const updateUserStatus = async (
    userId: string,
    updatedData: Partial<IUser>
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/change-status/${userId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(updatedData),
            }
        );

        const result = await res.json();

        console.log(result)

        revalidateTag("USER");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
