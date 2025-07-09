import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import "@smastrom/react-rating/style.css";
import { Toaster } from "sonner";
import Providers from "@/providers/Providers";

const poppins = Poppins({
    variable: "--font-poppins",
    weight: ["400", "500", "600", "700", "800", "900"],
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Nanantha",
    description:
        "Welcome to Nanantha – your trusted online bookstore. Discover bestsellers, new releases, and timeless classics across every genre. Explore, shop, and fuel your love for reading!",
    icons: {
        icon: "./favicon.ico",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${poppins.variable} font-poppins antialiased`}>
                <Providers>
                    <Toaster />
                    {children}
                </Providers>
            </body>
        </html>
    );
}
