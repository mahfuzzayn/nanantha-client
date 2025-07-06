/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const createSubject = async (subjectData: FieldValues) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/create-subject`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(subjectData),
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getAllProducts = async (
    page?: string,
    limit?: string,
    query?: {
        [key: string]: string | string[] | undefined;
    }
) => {
    const params = new URLSearchParams();

    if (query?.category) {
        params.append("category", query?.category.toString());
    }

    if (query?.gradeLevel) {
        params.append("gradeLevel", query?.gradeLevel.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products?limit=${limit}&page=${page}&${params}&sort=-createdAt`,
            {
                method: "GET",
                next: {
                    tags: ["PRODUCT"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getSingleSubject = async (subjectId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${subjectId}`,
            {
                method: "GET",
                next: {
                    tags: ["SUBJECT"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateSubject = async (
    subjectId: string,
    subjectData: FieldValues
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${subjectId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(subjectData),
            }
        );

        revalidateTag("SUBJECT");
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const deleteSubject = async (subjectId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/subjects/${subjectId}/discontinue`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
            }
        );

        revalidateTag("SUBJECT");
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
