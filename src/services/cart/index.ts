/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

export const getMyCart = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/carts/me`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["CART"],
                },
            }
        );

        
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const addItem = async (cartData: FieldValues) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(cartData),
        });

        const result = await res.json();

        revalidateTag("CART");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const removeItem = async (cartData: FieldValues) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(cartData),
        });

        revalidateTag("CART");
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateQuantity = async (cartData: FieldValues) => {
    const token = await getValidToken();

    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/carts`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: token,
            },
            body: JSON.stringify(cartData),
        });

        revalidateTag("CART");
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const clearCart = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/carts/clear`,
            {
                method: "DELETE",
                headers: {
                    Authorization: token,
                },
            }
        );

        const result = await res.json();

        revalidateTag("CART");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

// Admin Options
export const getAllCarts = async (
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
            `${process.env.NEXT_PUBLIC_BASE_API}/carts?limit=${limit}&page=${page}&${params}&sort=-createdAt`,
            {
                method: "GET",
                next: {
                    tags: ["CART"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
