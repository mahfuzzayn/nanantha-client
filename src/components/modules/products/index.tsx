"use client";

import { IMeta, IProduct } from "@/types";
import TablePagination from "@/components/ui/core/NNTable/TablePagination";
import ProductCard from "./ProductCard";

const Products = ({ products, meta }: { products: IProduct[]; meta: IMeta }) => {
    return (
        <div className="ml-5 lg:ml-0 mt-0 m-5">
            {products?.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-10">
                    {products.map((product) => (
                        <ProductCard key={product?._id} product={product} />
                    ))}
                </div>
            ) : (
                <div className="w-full mt-12">
                    <h2 className="text-xl font-bold text-center">No Books were found.</h2>
                </div>
            )}
            <div className="mt-10">
                {products?.length > 0 && (
                    <TablePagination totalPage={meta?.totalPage} />
                )}
            </div>
        </div>
    );
};

export default Products;
