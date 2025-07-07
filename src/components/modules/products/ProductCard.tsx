"use client";

import { IProduct } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { Rating } from "@smastrom/react-rating";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import orangeGradientBg from "@/assets/images/orange-gradient-bg.jpg";
import "./ProductCard.css";
import { toastStyles } from "@/constants";
import { toast } from "sonner";
import { addItem } from "@/services/cart";
import { useUser } from "@/context/UserContext";

const ProductCard = ({ product }: { product: IProduct }) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { setCart } = useUser();

    const handleAddToCart = async () => {
        setIsSubmitting(true);

        const toastId = toast.loading("Adding to Cart...", {
            style: toastStyles.success,
        });

        try {
            const cartData = { productId: product?._id, quantity: 1 };

            const res = await addItem(cartData);

            if (res.success) {
                setCart(res.data);

                toast.success(res.message, {
                    id: toastId,
                    style: toastStyles.success,
                });
            } else {
                toast.error(res.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error) {
            toast.error("Failed to add the book into the Cart", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }

        setIsSubmitting(false);
    };

    return (
        <div
            className="tutor-card py-6 px-4 rounded-md border-[1px] border-[#fffff363]"
            style={{
                backgroundImage: `url('${orangeGradientBg.src}')`,
            }}
        >
            <Image
                src={product?.image}
                height={600}
                width={1000}
                alt={`Profile Photo of ${product.title}`}
                className="h-[200px] mx-auto object-cover rounded-t-md"
            />
            <div className="space-y-3 py-4">
                <h2 className="text-2xl bg-secondary text-white py-1 text-center rounded-md font-bold">
                    {product.title}
                </h2>
                <p className="text-lg text-white rounded-md font-bold">
                    Author{" "}
                    <span className="text-secondary">{product.author}</span>
                </p>
                <h2 className="text-lg font-normal">
                    Price{" "}
                    <span className="font-semibold">{product?.price}$</span>
                </h2>
                <h2 className="text-lg font-normal">
                    {product?.quantity > 0 ? (
                        <>
                            Stock{" "}
                            <span className="font-semibold">
                                {product?.quantity} left
                            </span>
                        </>
                    ) : (
                        <i className="font-semibold text-red-600">
                            Out of Stock
                        </i>
                    )}
                </h2>
                <div className="flex gap-x-2">
                    <h2 className="text-lg font-normal flex items-center gap-x-2">
                        <p>Rating</p>
                        <p className="font-semibold">{product?.rating || 0}</p>
                    </h2>
                    <Rating
                        style={{ maxWidth: 120 }}
                        value={product?.rating || 0}
                        readOnly
                    />
                </div>
                <div className="flex gap-4 mt-10 overflow-hidden">
                    <Link href={`/products/${product?._id}`} className="w-full">
                        <Button className="w-full bg-muted text-black cursor-pointer hover:bg-it-light-dark">
                            See Full Details
                        </Button>
                    </Link>
                    <li className="w-full list-none">
                        <Button
                            onClick={handleAddToCart}
                            disabled={
                                product?.quantity > 0
                                    ? false
                                    : true || isSubmitting
                            }
                            className="w-full bg-primary cursor-pointer hover:bg-it-light-dark"
                        >
                            {isSubmitting ? "Adding..." : "Add to Cart"}
                        </Button>
                    </li>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
