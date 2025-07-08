import ManageAdminOrders from "@/components/modules/orders/ManageAdminOrders";
import { getAllOrders } from "@/services/order";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Orders ‣ Admin Dashboard ‣ Nanantha",
    description:
        "Review and update your upcoming and past bookings to stay on top of your schedule.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AdminOrdersPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;
    const { data: orders, meta } = await getAllOrders(
        (query?.page as string) || undefined,
        "5",
        (query?.sort as string) || undefined,
        query
    );

    return <ManageAdminOrders orders={orders} meta={meta}></ManageAdminOrders>;
};

export default AdminOrdersPage;
