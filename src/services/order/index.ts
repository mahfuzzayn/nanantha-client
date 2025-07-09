/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { IStatus } from "@/types";
import { revalidateTag } from "next/cache";

export const getAllOrders = async (
    page?: string,
    limit?: string,
    sort?: string,
    query?: {
        [key: string]: string | string[] | undefined;
    }
) => {
    const token = await getValidToken();
    const params = new URLSearchParams();

    if (query?.status) {
        params.append("status", query?.status.toString());
    }

    if (query?.paymentStatus) {
        params.append("paymentStatus", query?.paymentStatus.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders?limit=${limit}&page=${page}&${params}&sort=${sort}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["ORDER"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getMyOrders = async (
    page?: string,
    limit?: string,
    sort?: string,
    query?: {
        [key: string]: string | string[] | undefined;
    }
) => {
    const token = await getValidToken();
    const params = new URLSearchParams();

    if (query?.status) {
        params.append("status", query?.status.toString());
    }

    if (query?.paymentStatus) {
        params.append("paymentStatus", query?.paymentStatus.toString());
    }

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/me?limit=${limit}&page=${page}&${params}&sort=${sort}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["ORDER"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getSingleOrder = async (orderId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
                next: {
                    tags: ["ORDER"],
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const createOrder = async () => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/create-order`,
            {
                method: "POST",
                headers: {
                    Authorization: token,
                },
            }
        );

        const result = await res.json();

        revalidateTag("CART");
        revalidateTag("ORDER");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const getOrderByPaymentId = async (paymentId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/payments/${paymentId}`,
            {
                method: "GET",
                headers: {
                    Authorization: token,
                },
            }
        );

        const result = await res.json();

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const changeOrderStatusByAdmin = async (
    orderId: string,
    orderData: { status: IStatus }
) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/${orderId}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: token,
                },
                body: JSON.stringify(orderData),
            }
        );

        const result = await res.json();

        revalidateTag("ORDER");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};

export const changeOrderStatusByUser = async (orderId: string) => {
    const token = await getValidToken();

    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_BASE_API}/orders/cancel/${orderId}`,
            {
                method: "PATCH",
                headers: {
                    Authorization: token,
                },
            }
        );

        const result = await res.json();

        revalidateTag("ORDER");

        return result;
    } catch (error: any) {
        return Error(error);
    }
};
