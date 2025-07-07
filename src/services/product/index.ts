/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";
import { FieldValues } from "react-hook-form";

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

    if (query?.authors) {
        params.append("authors", query?.authors.toString());
    }

    if (query?.rating) {
        params.append("authors", query?.rating.toString());
    }

    if (query?.maxPrice) {
        params.append("maxPrice", query?.maxPrice.toString());
    }

    if (query?.sort) {
        params.append("sort", query?.sort.toString());
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

export const getSingleProduct = async (productId: string) => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products/${productId}`,
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

// Admin Options
export const createProduct = async (productData: FieldValues) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/product/create-product`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(productData),
            }
        );

        const result = await res.json();

        revalidateTag("PRODUCT");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateProduct = async (
    productId: string,
    productData: FieldValues
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products/${productId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(productData),
            }
        );

        revalidateTag("PRODUCT");
        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const deleteProduct = async (productId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products/${productId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
            }
        );

        const result = await res.json();

        revalidateTag("PRODUCT");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
