/* eslint-disable react/no-unescaped-entities */
import ChangeStatusByUser from "@/components/modules/orders/user/ChangeStatusByUser/ChangeStatusByUser";
import { Button } from "@/components/ui/button";
import { NNPaymentStatusBadge } from "@/components/ui/core/NNPaymentStatusBadge/NNPaymentStatusBadge";
import { NNStatusBadge } from "@/components/ui/core/NNStatusBadge/NNStatusBadge";
import { getSingleOrder } from "@/services/order";
import { IOrder, IStatus } from "@/types";
import { ArrowLeft } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ orderId: string }>;
}) => {
    const { orderId } = await params;
    const { data: order }: { data: IOrder } = await getSingleOrder(orderId);

    return {
        title: `${
            order?.createdAt
                ? `Order (${order?._id.slice(0, 3)}...${order?._id.slice(
                      order?._id.length - 3,
                      order?._id.length
                  )})`
                : "Invalid Order"
        } ‣ User Dashboard ‣ Nanantha`,
        description: `${
            order?.createdAt
                ? `View complete details of a specific book order in your Nanantha dashboard. Track shipping, status, and item details.`
                : "Invalid Order, so we can't provide any description."
        }`,
    };
};

const UserOrderPage = async ({
    params,
}: {
    params: Promise<{ orderId: string }>;
}) => {
    const { orderId } = await params;
    const { data: order }: { data: IOrder } = await getSingleOrder(orderId);

    if (!order) {
        return (
            <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
                <h2 className="text-2xl md:text-3xl text-secondary font-bold text-center">
                    Invalid Order ID
                </h2>
                <p className="text-lg text-center">
                    Order ID: <span className="font-semibold">{orderId}</span>
                </p>
                <Link href="/user/dashboard/orders">
                    <Button className="bg-primary hover:bg-secondary cursor-pointer font-semibold mb-5">
                        <ArrowLeft /> Orders
                    </Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-5">
            <Link href={`/user/dashboard/orders/`}>
                <Button className="bg-primary hover:bg-secondary cursor-pointer font-semibold mb-10">
                    <ArrowLeft /> Orders
                </Button>
            </Link>
            <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-x-1.5 items-start sm:items-center">
                    <h2 className="text-2xl text-secondary font-bold">Order</h2>
                    <p className="space-x-1">
                        <span>(</span>
                        <span className="font-semibold">{order?._id}</span>
                        <span>)</span>
                    </p>
                </div>
                <div className="space-y-2 !mb-6">
                    <p className="font-medium">
                        User Email:{" "}
                        <span className="font-bold text-secondary">
                            {order?.user?.email}
                        </span>
                    </p>
                    <p className="font-medium">
                        Address:{" "}
                        <span className="font-bold text-secondary">
                            {order?.user?.location || (
                                <i className="text-destructive">Unknown</i>
                            )}
                        </span>
                    </p>
                    <p className="font-medium">
                        Total Items:{" "}
                        <span className="font-bold">
                            {order?.items?.length}
                        </span>
                    </p>
                    <p className="font-medium">
                        Total Amount:{" "}
                        <span className="font-bold text-destructive">
                            {order?.amount}$
                        </span>
                    </p>
                    <p className="font-medium">
                        Purchase Date:{" "}
                        <span className="font-bold text-secondary">
                            {moment(order?.createdAt).format(
                                "h:mm A DD MMM, YYYY"
                            )}
                        </span>
                    </p>
                </div>
                <div className="space-y-2 !mb-6">
                    <h2 className="font-bold text-xl text-secondary">
                        Products that user will receive
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4 max-w-[980px]">
                        {order?.items?.map((product, idx) => (
                            <div
                                key={idx}
                                className="text-sm list-none bg-primary text-white p-2 space-y-2 rounded-sm"
                            >
                                <Image
                                    src={product?.image}
                                    height={200}
                                    width={200}
                                    className="h-[100px] object-cover w-full rounded-md"
                                    alt={`Product Image ${idx + 1}`}
                                />
                                <h4 className="font-semibold">
                                    {product?.title}
                                </h4>
                                <p>
                                    Quantity:{" "}
                                    <span className="font-medium">
                                        {product?.quantity} pcs
                                    </span>
                                </p>
                                <p>
                                    Price:{" "}
                                    <span className="font-medium text-accent">
                                        {product?.price}$
                                    </span>
                                </p>
                                <p>
                                    Total Price:{" "}
                                    <span className="font-medium">
                                        {product?.totalPrice}$
                                    </span>
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="!mt-8">
                    <h2 className="text-xl text-secondary font-bold">
                        Payment Information
                    </h2>
                    <span className="border-2 border-secondary"></span>
                    <div className="space-y-4">
                        <p className="flex gap-x-2 font-medium">
                            Total Price:{" "}
                            <span className="font-semibold text-secondary">
                                {order?.amount}$
                            </span>
                        </p>
                        <p className="flex gap-x-2 font-medium">
                            Status:{" "}
                            <NNStatusBadge status={order?.status as IStatus} />
                        </p>
                        <p className="flex gap-x-2 font-medium">
                            Payment Status:
                            <NNPaymentStatusBadge
                                status={order?.paymentStatus}
                            />
                        </p>
                        <p className="flex flex-col sm:flex-row gap-2 font-medium items-start sm:items-center">
                            Transaction ID:{" "}
                            <span className="font-semibold text-white bg-destructive px-2 py-0.5 rounded-md cursor-pointer">
                                {order?.paymentId || (
                                    <i>Payment isn't initiated yet</i>
                                )}
                            </span>
                        </p>
                    </div>
                    <div className="mt-8 space-y-2">
                        <h2 className="text-xl font-bold text-secondary">
                            Action
                        </h2>
                        <ChangeStatusByUser
                            orderId={order?._id}
                            status={order?.status as IStatus}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserOrderPage;
