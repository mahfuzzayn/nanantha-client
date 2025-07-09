import AdminManageProducts from "@/components/modules/products/admin/manage-products/AdminManageProducts";
import { getMe } from "@/services/auth";
import { getAllProducts } from "@/services/product";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Products ‣ Admin Dashboard ‣ Nanantha",
    description:
        "Admin Product List | Nanantha: View and manage the entire bookstore catalog. Edit details, pricing, and inventory in one place.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AdminProductsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;
    const { data: user } = await getMe();
    const { data: products, meta } = await getAllProducts(
        (query?.page as string) || undefined,
        "5",
        (query?.sort as string) || "-createdAt",
        query
    );

    return (
        <>
            <AdminManageProducts user={user} products={products} meta={meta} />
        </>
    );
};

export default AdminProductsPage;
