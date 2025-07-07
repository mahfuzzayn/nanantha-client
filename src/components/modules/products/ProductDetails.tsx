"use client";

import { IProduct } from "@/types";
import Image from "next/image";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";
import { addItem } from "@/services/cart";
import { toastStyles } from "@/constants";

const ProductDetails = ({ product }: { product: IProduct }) => {
    const [isAdded, setIsAdded] = useState(false);
    const { user, setCart } = useUser();

    const handleAddToCart = async () => {
        const toastId = toast.loading("Adding to Cart...", {
            style: toastStyles.success,
        });

        try {
            const cartData = { productId: product?._id, quantity: 1 };

            const res = await addItem(cartData);

            if (res.success) {
                setIsAdded(true);
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
    };

    return (
        <div className="flex justify-center pt-24 pb-24 mx-5">
            <section className="flex flex-col lg:flex-row gap-y-12 gap-20 max-w-[1920px]">
                <div className="space-y-4">
                    <div className="flex mb-6">
                        <Link href="/products">
                            <Button className="bg-primary cursor-pointer hover:bg-secondary font-semibold">
                                <ArrowLeft /> Products
                            </Button>
                        </Link>
                    </div>
                    <h2 className="text-3xl max-w-lg leading-10">
                        Product{" "}
                        <span className="text-secondary font-bold">
                            {product?.title}
                        </span>
                    </h2>
                    <Image
                        src={product?.image}
                        height={300}
                        width={400}
                        alt={`${product?.title} Image`}
                        className="h-[300px] object-cover rounded-3xl mt-10"
                    />
                    <div>
                        <h4 className="text-lg font-bold">Description</h4>
                        <span className="border-2 border-it-medium-dark"></span>
                        <p className="max-w-md text-justify">
                            {product?.description}
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="flex flex-col gap-y-2">
                            <h4 className="text-lg font-semibold">Author</h4>
                            <p>
                                <span className="bg-secondary rounded-md py-1 px-2 font-bold text-white">
                                    {product?.author}
                                </span>
                            </p>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <h4 className="text-lg font-semibold">Price</h4>
                            <p>
                                <span className="bg-primary rounded-md py-1 px-2 font-bold text-white">
                                    {product?.price}$
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="mt-12">
                        <h4 className="text-lg font-semibold">Reviews</h4>
                        <div className="space-y-4 mt-2 max-w-lg">
                            {product?.reviews?.map((review) => (
                                <div
                                    key={review?._id}
                                    className="text-white bg-destructive p-2 px-4 rounded-sm"
                                >
                                    <div className="flex items-center gap-x-1">
                                        <h4 className="font-semibold">
                                            {review?.user?.name}
                                        </h4>
                                        <span className="font-medium">
                                            ({review?.rating})
                                        </span>
                                        <Rating
                                            style={{ maxWidth: 80 }}
                                            value={review?.rating}
                                            readOnly
                                        />
                                    </div>
                                    <p>{review?.comment}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="block">
                    <Separator orientation="vertical" className="bg-accent" />
                </div>
                <div className="space-y-10 lg:mt-[60px]">
                    <div>
                        {user && user?.role === "user" ? (
                            <div className="space-y-4">
                                {!isAdded ? (
                                    <>
                                        <h2 className="text-xl font-semibold text-secondary">
                                            Want to grab this book in your Cart?
                                        </h2>
                                        <Button
                                            disabled={product?.quantity < 0}
                                            onClick={handleAddToCart}
                                            className="bg-accent font-semibold hover:bg-accent cursor-pointer"
                                        >
                                            Add to Cart
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-semibold text-secondary">
                                            Book Added! Proceed to Checkout?
                                        </h2>
                                        <Link href="/cart">
                                            <Button
                                                disabled={product?.quantity < 0}
                                                onClick={handleAddToCart}
                                                className="bg-primary font-semibold hover:bg-primary cursor-pointer"
                                            >
                                                View Cart
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        ) : (
                            <p className="bg-destructive text-white text-center py-1 px-2 rounded-md mb-5">
                                Want to Order this book?{" "}
                                <Link
                                    href={`/login?redirectPath=/products/${product?._id}`}
                                    className="font-semibold underline"
                                >
                                    Login
                                </Link>{" "}
                                {user?.role === "admin" && "as an admin"} first
                            </p>
                        )}
                    </div>
                    <div>
                        <h2 className="text-xl">
                            More Books from{" "}
                            <span className="font-semibold">
                                {product?.author}
                            </span>
                        </h2>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default ProductDetails;
