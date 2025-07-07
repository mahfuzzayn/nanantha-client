"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { toastStyles } from "@/constants";
import { useUser } from "@/context/UserContext";
import { clearCart, removeItem, updateQuantity } from "@/services/cart";
import { createOrder } from "@/services/order";
import { ICart } from "@/types";
import { Minus, Plus, ShoppingCart, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "sonner";

const CartOverview = ({ cart }: { cart: ICart }) => {
    const [isCheckOutOpen, setIsCheckOutOpen] = useState(false);
    const [isQuantityUpdating, setIsQuantityUpdating] = useState(false);
    const { user, setCart } = useUser();
    const router = useRouter();

    const handlePayNow = async () => {
        setIsQuantityUpdating(true);

        const toastId = toast.loading(`Preparing for a Payment...`, {
            style: toastStyles.loading,
        });

        try {
            const res = await createOrder();

            if (res.success) {
                setCart(null);

                toast.success(res.message, {
                    id: toastId,
                    style: toastStyles.success,
                });

                setTimeout(() => {
                    toast.loading("Redirecting to Checkout Page", {
                        id: toastId,
                        style: toastStyles.loading,
                    });

                    setTimeout(() => {
                        router.push(res?.data?.checkoutUrl);
                    }, 1000);
                }, 1000);
            } else {
                toast.error(res.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error) {
            toast.error("Failed to prepare payment", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }

        setIsQuantityUpdating(false);
    };

    const handleRemoveProduct = async (productId: string) => {
        setIsQuantityUpdating(true);

        const toastId = toast.loading(`Removing product...`, {
            style: toastStyles.success,
        });

        try {
            const cartData = {
                productId,
            };

            const res = await removeItem(cartData);

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
            toast.error("Failed to remove the product", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }

        setIsQuantityUpdating(false);
    };

    const handleQuantityChange = async (
        productId: string,
        type: "inc" | "dec"
    ) => {
        setIsQuantityUpdating(true);

        const toastId = toast.loading(
            `${
                type === "inc" ? "Increasing" : "Decreasing"
            } product quantity...`,
            {
                style: toastStyles.success,
            }
        );

        try {
            const cartData = {
                productId,
                quantity: type === "inc" ? 1 : -1,
            };

            const res = await updateQuantity(cartData);

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
            toast.error(
                `Failed to ${
                    type === "inc" ? "increment" : "decrement"
                } product quantity`,
                {
                    id: toastId,
                    style: toastStyles.error,
                }
            );

            console.error(error);
        }

        setIsQuantityUpdating(false);
    };

    const handleClearCart = async () => {
        setIsQuantityUpdating(true);

        const toastId = toast.loading("Clearting the Cart...", {
            style: toastStyles.success,
        });

        try {
            const res = await clearCart();

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
            toast.error("Failed to clear the Cart", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }

        setIsQuantityUpdating(false);
    };

    return (
        <div className="cart-overview flex justify-between gap-x-20">
            <div className="products grid grid-cols-1 lg:grid-cols-2 gap-10 w-full max-w-lg lg:max-w-4xl">
                {cart.items.length > 0 ? (
                    <>
                        {cart.items.map((product, index) => (
                            <div key={index} className="bg-muted rounded-md">
                                <div className="flex justify-between items-center p-4">
                                    <h2 className="text-md font-medium">
                                        {product.title}
                                    </h2>
                                    <Button
                                        onClick={() =>
                                            handleRemoveProduct(
                                                product?.productId
                                            )
                                        }
                                        className="bg-secondary hover:bg-secondary cursor-pointer"
                                    >
                                        Remove
                                    </Button>
                                </div>
                                <Separator />
                                <div className="p-4 space-y-4">
                                    <Image
                                        src={product?.image}
                                        height={500}
                                        width={500}
                                        className="h-[250px] max-w-lg w-full object-cover rounded-md"
                                        alt={`Product ${index + 1} Image`}
                                    />
                                    <h2 className="font-medium">
                                        Author{" "}
                                        <span className="text-primary font-semibold">
                                            {product?.author}
                                        </span>
                                    </h2>
                                    <p className="font-medium">
                                        Price:{" "}
                                        <span className="text-accent font-semibold">
                                            {product?.price}$
                                        </span>
                                    </p>
                                    <div className="flex items-center gap-x-3">
                                        <Button
                                            disabled={isQuantityUpdating}
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product?.productId,
                                                    "dec"
                                                )
                                            }
                                            className="bg-accent hover:bg-accent cursor-pointer"
                                        >
                                            <Minus strokeWidth={3} />
                                        </Button>
                                        <span className="font-semibold">
                                            {product?.quantity}
                                        </span>
                                        <Button
                                            disabled={isQuantityUpdating}
                                            onClick={() =>
                                                handleQuantityChange(
                                                    product?.productId,
                                                    "inc"
                                                )
                                            }
                                            className="cursor-pointer"
                                        >
                                            <Plus strokeWidth={3} />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </>
                ) : (
                    <div>
                        <h2 className="text-xl font-medium bg-muted p-4 text-center rounded-md">
                            No items in your cart.{" "}
                            <Link
                                href="/products"
                                className="underline text-primary"
                            >
                                Add Item
                            </Link>
                            ?
                        </h2>
                    </div>
                )}
            </div>
            <div className="lg:hidden hamburger-close fixed top-36 right-0">
                <button
                    onClick={() => setIsCheckOutOpen(true)}
                    className="flex gap-x-3 cursor-pointer text-white py-2 px-4 bg-destructive hover:bg-destructive rounded-full rounded-r-none"
                >
                    <p className="font-semibold">Checkout</p>
                    <ShoppingCart size={24} />
                </button>
            </div>
            <div
                className={`${
                    !isCheckOutOpen ? "hidden lg:block" : "block z-[100]"
                } checkout h-full fixed top-0 right-0 lg:h-auto lg:static w-full max-w-2xs bg-primary text-white pt-12 lg:pt-4 p-4 lg:rounded-md`}
            >
                <div className="relative space-y-4">
                    <div className="lg:hidden hamburger-close absolute top-0 -right-4">
                        <button
                            onClick={() => setIsCheckOutOpen(false)}
                            className="cursor-pointer p-1 bg-destructive hover:bg-destructive rounded-full rounded-r-none"
                        >
                            <X size={24} />
                        </button>
                    </div>
                    <h2 className="text-2xl font-semibold">Subtotal</h2>
                    <ul className="space-y-2">
                        {cart?.items?.map((product, index) => (
                            <li key={index}>
                                {index + 1}. {product?.price}$ x{" "}
                                {product?.quantity} ={" "}
                                {product?.price * product?.quantity}$
                            </li>
                        ))}
                    </ul>
                    {cart?.items?.length > 0 ? (
                        <p className="text-lg font-medium">
                            Total: {cart?.totalPrice}$
                        </p>
                    ) : (
                        <>
                            <p className="font-medium">
                                View Orders on{" "}
                                <Link
                                    href={`${user?.role}/dashboard/orders`}
                                    className="text-accent underline"
                                >
                                    Dashboard
                                </Link>
                            </p>
                            <p className="text-sm font-medium">
                                <span className="text-accent">Note:</span> Add
                                Items to calculate subtotal
                            </p>
                        </>
                    )}
                    <div className="flex flex-col gap-3">
                        {cart?.items?.length > 0 && (
                            <>
                                <Button
                                    onClick={handlePayNow}
                                    className="bg-accent hover:bg-accent cursor-pointer"
                                >
                                    Pay Now
                                </Button>
                                <Button
                                    onClick={handleClearCart}
                                    className="bg-red-700 hover:bg-red-800 cursor-pointer"
                                >
                                    Clear Cart
                                </Button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartOverview;
