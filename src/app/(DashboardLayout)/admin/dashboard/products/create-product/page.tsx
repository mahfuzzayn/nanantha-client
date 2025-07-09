import CreateProductForm from "@/components/modules/products/admin/create-product/CreateProductForm";
import { getMe } from "@/services/auth";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Create Product ‣ Admin Dashboard ‣ Nanantha",
    description:
        "Add new books to Nanantha’s catalog with ease. Enter title, author, image, pricing, and descriptions to grow your inventory.",
};

const CreateProductPage = async () => {
    const { data: user } = await getMe();

    return <CreateProductForm user={user} />;
};

export default CreateProductPage;
