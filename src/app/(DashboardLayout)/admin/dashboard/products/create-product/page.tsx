import CreateProductForm from "@/components/modules/products/admin/create-product/CreateProductForm";
import { getMe } from "@/services/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Product ‣ Admin Dashboard ‣ Nanantha",
    description:
        "Review and update your upcoming and past bookings to stay on top of your schedule.",
};

const UpdateProductPage = async () => {
    const { data: user } = await getMe();

    return <CreateProductForm user={user} />;
};

export default UpdateProductPage;
