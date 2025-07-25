"use server";

import { getNewToken } from "@/services/auth";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";

export const isTokenExpired = async (token: string): Promise<boolean> => {
    if (!token) return true;

    try {
        const decoded: { exp: number } = jwtDecode(token);

        return decoded.exp * 1000 < Date.now();
    } catch (error) {
        console.log(error);

        return true;
    }
};

export const getValidToken = async (): Promise<string> => {
    const cookieStore = await cookies();
    let token = cookieStore.get("accessToken")!.value;

    if (!token || (await isTokenExpired(token))) {
        const { data } = await getNewToken();

        token = data?.accessToken;

        cookieStore.set("accessToken", data?.accessToken);
    }

    return token;
};
