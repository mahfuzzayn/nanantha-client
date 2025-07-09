import React from "react";
import Image from "next/image";
import Link from "next/link";
import LiquidCheck from "@/assets/gifs/animated-check.gif";
import CrossCheck from "@/assets/gifs/animated-cross-x.gif";
import orangeGradientBg from "@/assets/images/orange-gradient-bg.jpg";
import { getOrderByPaymentId } from "@/services/order";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Success ‣ Nanantha",
    description:
        "Thank you for your purchase at Nanantha! Your payment was successful, and your books are on their way. Happy reading!",
};

const PaymentSuccessPage = async ({
    searchParams,
}: {
    searchParams: Promise<{ paymentId: string }>;
}) => {
    const { paymentId } = await searchParams;
    const { data: order } = await getOrderByPaymentId(paymentId);

    if (!order) {
        return (
            <div className="min-h-screen pt-36 pb-20 flex justify-center items-center px-4">
                <div
                    className="space-y-5 p-10 rounded-xl border-[1px] border-[#fffff36f]"
                    style={{
                        backgroundImage: `url('${orangeGradientBg.src}')`,
                    }}
                >
                    <div className="flex gap-x-2 md:gap-x-3 items-center">
                        <Image
                            src={CrossCheck}
                            height={50}
                            width={50}
                            className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
                            alt="Payment Failed"
                        />
                        <h2 className="text-3xl md:text-4xl text-destructive font-bold">
                            Invalid Payment ID
                        </h2>
                    </div>
                    <p className="max-w-lg text-it-secondary">
                        <span className="font-semibold">Note:</span> If a new
                        order was initiated then previous payment ID of your
                        order may have been changed, head over to{" "}
                        <Link
                            href="/user/dashboard/orders"
                            className="font-semibold underline"
                        >
                            Dashboard
                        </Link>{" "}
                        to overlook changes. .
                    </p>
                    <p className="text-it-secondary text-center">
                        Back to{" "}
                        <Link href="/" className="font-semibold underline">
                            Home
                        </Link>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-36 pb-20 flex justify-center items-center">
            <div
                className="space-y-10 p-10 rounded-xl"
                style={{
                    backgroundImage: `url('${orangeGradientBg.src}')`,
                }}
            >
                <div className="flex gap-x-2 md:gap-x-3 items-center">
                    <Image
                        src={LiquidCheck}
                        height={50}
                        width={50}
                        className="h-[40px] w-[40px] md:h-[50px] md:w-[50px]"
                        alt="Successful Payment"
                    />
                    <h2 className="text-3xl md:text-4xl text-destructive font-bold">
                        Payment Success
                    </h2>
                </div>
                <p className="text-it-secondary text-center">
                    View Order on{" "}
                    <Link
                        href={`/user/dashboard/orders/${order?._id}`}
                        className="font-semibold underline"
                    >
                        Dashboard
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
