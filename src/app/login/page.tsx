import LoginForm from "@/components/modules/auth/login/LoginForm";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Login ‣ Nanantha",
    description:
        "Login to your Nanantha account to manage orders, track your wishlist, and enjoy a personalized book shopping experience.",
};

const LoginPage = () => {
    return (
        <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-sm flex-col gap-6">
                <Link
                    href="/"
                    className="flex items-center gap-2 self-center font-medium"
                >
                    <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                        <Home className="size-4" />
                    </div>
                    Nanantha
                </Link>
                <LoginForm />
            </div>
        </div>
    );
};

export default LoginPage;
