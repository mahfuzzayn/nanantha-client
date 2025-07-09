import ManageUserOrders from "@/components/modules/orders/user/ManageUserOrders";
import { getMyOrders } from "@/services/order";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Orders ‣ User Dashboard ‣ Nanantha",
    description:
        "Check your recent book orders on Nanantha’s dashboard. Track order status, view details, and manage your purchases easily.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UserOrdersPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;
    const { data: orders, meta } = await getMyOrders(
        (query?.page as string) || undefined,
        "5",
        (query?.sort as string) || "-createdAt",
        query
    );

    return <ManageUserOrders orders={orders} meta={meta}></ManageUserOrders>;
};

export default UserOrdersPage;
