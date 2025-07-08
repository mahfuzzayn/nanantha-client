"use client";

import { Button } from "@/components/ui/button";
import { toastStyles } from "@/constants";
import { useUser } from "@/context/UserContext";
import { addItem } from "@/services/cart";
import { IProduct } from "@/types";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";

const TrendingProducts = ({ products }: { products: IProduct[] }) => {
    const [isSubmitting, setIsSubmitting] = useState<string | null>(null);
    const { setCart } = useUser();

    const handleAddToCart = async (productId: string) => {
        setIsSubmitting(productId);

        const toastId = toast.loading("Adding to Cart...", {
            style: toastStyles.success,
        });

        try {
            const cartData = { productId: productId, quantity: 1 };

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

        setIsSubmitting(null);
    };

    return (
        <section className="trending-products-section bg-muted py-28 md:pt-32 md:py-36">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl text-center md:text-5xl font-extrabold text-secondary mb-16">
                    Trending Books
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {products.slice(0, 8).map((product, index) => (
                        <div
                            key={index}
                            className="bg-primary rounded-md overflow-hidden flex flex-col"
                        >
                            <div className="p-4">
                                <Image
                                    src={product?.image}
                                    height={500}
                                    width={500}
                                    className="h-[240px] w-full object-cover rounded-md"
                                    alt={`Product ${index + 1} Image`}
                                />
                            </div>
                            <div className="flex-1 flex flex-col text-muted space-y-3 p-4">
                                <h3 className="text-xl font-bold">
                                    {product.title}
                                </h3>
                                <div className="flex gap-x-2 text-[15px] font-semibold">
                                    <p className="flex gap-x-2">
                                        Average Rating:
                                        <span className="text-accent">
                                            {product?.rating || 0}
                                        </span>
                                    </p>
                                    <Rating
                                        style={{ width: 80 }}
                                        value={product?.rating || 0}
                                        readOnly
                                    />
                                </div>
                                <p className="text-[15px] font-semibold">
                                    Hourly Rate:{" "}
                                    <span className="text-it-secondary">
                                        {product.author} taka
                                    </span>
                                </p>
                                <div className="flex flex-col gap-4 mt-auto overflow-hidden">
                                    <Link
                                        href={`/products/${product?._id}`}
                                        className="w-full"
                                    >
                                        <Button className="w-full bg-muted text-black cursor-pointer hover:bg-it-light-dark">
                                            See Full Details
                                        </Button>
                                    </Link>
                                    <li className="w-full list-none">
                                        <Button
                                            onClick={() =>
                                                handleAddToCart(product?._id)
                                            }
                                            disabled={
                                                product?.quantity > 0
                                                    ? false
                                                    : true || isSubmitting
                                            }
                                            className="w-full bg-accent cursor-pointer hover:bg-accent"
                                        >
                                            {isSubmitting === product?._id
                                                ? "Adding..."
                                                : "Add to Cart"}
                                        </Button>
                                    </li>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
