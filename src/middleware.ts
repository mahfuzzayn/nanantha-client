import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "./services/auth";

type Role = keyof typeof roleBasedPrivateRoutes;

const authRoutes = ["/login", "/register"];
const roleBasedPrivateRoutes = {
    admin: [/^\/admin/, /^\/admin\/dashboard/],
    user: [
        /^\/user/,
        /^\/user\/dashboard/,
        /^\/payment-success/,
        /^\/payment-failed/,
    ],
};

export const middleware = async (request: NextRequest) => {
    const { pathname } = request.nextUrl;
    const userInfo = await getCurrentUser();

    if (!userInfo) {
        if (authRoutes.includes(pathname)) {
            return NextResponse.next();
        } else {
            return NextResponse.redirect(
                new URL(
                    `http://localhost:3000/login?redirectPath=${pathname}`,
                    request.url
                )
            );
        }
    }

    if (userInfo?.role && roleBasedPrivateRoutes[userInfo?.role as Role]) {
        const routes = roleBasedPrivateRoutes[userInfo?.role as Role];

        if (routes.some((route) => pathname.match(route))) {
            return NextResponse.next();
        }

        return NextResponse.redirect(new URL("/", request.url));
    }
};

export const config = {
    matcher: [
        "/login",
        "/payment-success",
        "/payment-failed",

        "/admin",
        "/admin/:page",
        "/admin/:page/:page",
        "/admin/:page/:page/:page",
        "/admin/:page/:page/:page/:page",

        "/user",
        "/user/:page",
        "/user/:page/:page",
        "/user/:page/:page/:page",
        "/user/:page/:page/:page/:page",
    ],
};
