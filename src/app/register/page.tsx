import RegisterForm from "@/components/modules/auth/register/RegisterForm";
import { Home } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Register ‣ Nanantha",
    description:
        "Create your free Nanantha account today. Unlock personalized recommendations, faster checkout, and exclusive book deals!",
};

const RegisterPage = () => {
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
                <RegisterForm />
            </div>
        </div>
    );
};

export default RegisterPage;
