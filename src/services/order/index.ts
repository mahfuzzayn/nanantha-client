/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getValidToken } from "@/lib/verifyToken";
import { revalidateTag } from "next/cache";

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
