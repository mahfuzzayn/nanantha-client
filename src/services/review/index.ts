/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const giveReview = async (reviewData: FieldValues) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews/give-review`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(reviewData),
            }
        );

        const result = await res.json();

        revalidateTag("REVIEW");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

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

export const getMyReviews = async (
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
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews/me?limit=${limit}&page=${page}&${params}&sort=${sort}`,
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

export const getSingleReview = async (reviewId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}`,
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

export const updateReviewStatus = async (
    reviewId: string,
    reviewData: FieldValues
) => {
    const token = await getValidToken();

    const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API}/reviews/${reviewId}/change-visibility`,
        {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(reviewData),
        }
    );

    const result = await res.json();

    revalidateTag("REVIEW");

    return result;
};
