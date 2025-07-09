import CartOverview from "@/components/modules/cart";
import { Button } from "@/components/ui/button";
import { getMyCart } from "@/services/cart";
import { ArrowLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import React from "react";

export const generateMetadata = async (): Promise<Metadata> => {
    const { data: cart } = await getMyCart();

    return {
        title: `Cart${
            cart?.totalItems ? ` (${cart?.totalItems})` : ""
        } ‣ Nanantha`,
        description:
            "Review your selected books in the Nanantha cart. Adjust quantities or proceed to secure checkout and enjoy seamless book shopping.",
    };
};

const CartPage = async () => {
    const { data: cart } = await getMyCart();

    return (
        <section className="cart-section max-w-[1280px] pt-20 pb-40 px-5 mx-auto">
            <div className="flex flex-col md:flex-row gap-x-4 mb-10">
                <div className="flex mb-6">
                    <Link href="/products">
                        <Button className="bg-primary cursor-pointer hover:bg-secondary font-semibold">
                            <ArrowLeft /> Products
                        </Button>
                    </Link>
                </div>
                <h2 className="text-3xl font-semibold">
                    Cart of{" "}
                    <span className="font-bold text-secondary">
                        {cart?.user?.name}
                    </span>
                </h2>
            </div>
            <CartOverview cart={cart}></CartOverview>
        </section>
    );
};

export default CartPage;
