import React from "react";
import CrossCheck from "@/assets/gifs/animated-cross-x.gif";
import orangeGradientBg from "@/assets/images/orange-gradient-bg.jpg";
import Image from "next/image";
import Link from "next/link";

const PaymentSuccessPage = async () => {
    return (
        <div className="min-h-screen flex justify-center items-center">
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
                        alt="Loading"
                    />
                    <h2 className="text-3xl md:text-4xl text-destructive font-bold">
                        Payment Failed
                    </h2>
                </div>
                <p className="text-it-secondary text-center">
                    Back to{" "}
                    <Link href="/" className="font-semibold underline">
                        Home
                    </Link>
                </p>
            </div>
        </div>
    );
};

export default PaymentSuccessPage;
