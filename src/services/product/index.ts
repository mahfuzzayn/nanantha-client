/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

export const getAllProducts = async (
    page?: string,
    limit?: string,
    sort?: string,
    query?: {
        [key: string]: string | string[] | undefined;
    }
) => {
    const params = new URLSearchParams();

    if (query?.authors) {
        params.append("authors", query?.authors.toString());
    }

    if (query?.category) {
        params.append("category", query?.category.toString());
    }

    if (query?.rating) {
        params.append("rating", query?.rating.toString());
    }

    if (query?.maxPrice) {
        params.append("maxPrice", query?.maxPrice.toString());
    }

    if (query?.keywords) {
        params.append("keywords", query?.keywords.toString());
    }

    if (query?.inStock) {
        params.append("inStock", query?.inStock.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products?limit=${limit}&page=${page}&${params}&sort=${sort}`,
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

export const getAllAuthors = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products/authors`,
            {
                method: "GET",
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
export const createProduct = async (productData: FormData) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products/create-product`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["PRODUCT"],
                },
                body: productData,
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const updateProduct = async (
    productId: string,
    productData: FormData
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/products/${productId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
                body: productData,
            }
        );

        const result = await res.json();

        revalidateTag("PRODUCT");

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
                method: "DELETE",
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
