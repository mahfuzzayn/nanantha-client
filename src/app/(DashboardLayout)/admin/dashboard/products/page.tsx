import AdminManageProducts from "@/components/modules/products/admin/manage-products/AdminManageProducts";
import { getMe } from "@/services/auth";
import { getAllProducts } from "@/services/product";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Products ‣ Admin Dashboard ‣ Nanantha",
    description:
        "Add or edit subjects and courses you specialize in as a tutor to better serve your students.",
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
        (query?.sort as string) || undefined,
        query
    );

    return (
        <>
            <AdminManageProducts user={user} products={products} meta={meta} />
        </>
    );
};

export default AdminProductsPage;
