import Products from "@/components/modules/products";
import FilterSidebar from "@/components/modules/products/filterSidebar";
import { getAllProducts } from "@/services/product";
import { IMeta, IProduct } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Products ‣ Nanantha",
    description:
        "Browse our list of qualified tutors across various subjects to find the perfect match for your learning needs.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const ProductsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;

    const { data: products, meta }: { data: IProduct[]; meta: IMeta } =
        await getAllProducts(undefined, "6", query);
    const { data: filteringProducts } = await getAllProducts();

    return (
        <main className="products-section pt-24 pb-32 max-w-[1920px] mx-auto">
            <h1 className="text-3xl md:text-5xl text-center font-bold text-secondary mb-16">
                Explore Books of Nanantha
            </h1>
            <div className="lg:flex gap-8">
                <div className="w-full max-w-xs bg-it-light-dark lg:ml-6 lg:rounded-r-md">
                    <FilterSidebar products={filteringProducts} />
                </div>
                <div className="w-full">
                    <Products products={products} meta={meta} />
                </div>
            </div>
        </main>
    );
};

export default ProductsPage;
