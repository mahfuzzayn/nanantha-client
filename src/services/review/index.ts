/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";

export const getAllReviews = async (
    page?: string,
    limit?: string,
    sort?: string,
    query?: {
        [key: string]: string | string[] | undefined;
    }
) => {
    const token = await getValidToken();
    const params = new URLSearchParams();

    if (query?.isVisible) {
        params.append("isVisible", query?.isVisible.toString());
    }

    if (query?.rating) {
        params.append("rating", query?.rating.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews?limit=${limit}&page=${page}&${params}&sort=${sort}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["REVIEW"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
