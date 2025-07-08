"use server";

import { getValidToken } from "@/lib/verifyToken";

/* eslint-disable @typescript-eslint/no-explicit-any */

export const updateProfile = async (userData: FormData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/users/update-profile`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
                body: userData,
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
