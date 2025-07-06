import { IProduct } from "@/types";
import React from "react";

const Products = ({ products }: { products: IProduct[] }) => {
    return (
        <section className="products-section py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-16">
                    Our Collection
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.slice(0, 8).map((product, index) => (
                        <div
                            key={index}
                            className="bg-accent hover:bg-primary transition-all group rounded-md py-4"
                        >
                            <h3 className="group-hover:text-white text-lg font-bold">
                                {product.title}
                            </h3>
                            <div className="mt-2">
                                <p className="text-[15px] font-semibold group-hover:text-white">
                                    Author{" "}
                                    <span className="text-primary group-hover:text-white">
                                        {product.author}
                                    </span>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Products;
