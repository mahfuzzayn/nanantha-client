import { Button } from "@/components/ui/button";
import { IProduct } from "@/types";
import { Rating } from "@smastrom/react-rating";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const TrendingProducts = ({ products }: { products: IProduct[] }) => {
    return (
        <section className="trending-products-section bg-muted py-28 md:py-40">
            <div className="max-w-7xl mx-auto px-6">
                <h2 className="text-3xl text-center md:text-5xl font-extrabold text-secondary mb-16">
                    Trending Books
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.slice(0, 8).map((product, index) => (
                        <div
                            key={index}
                            className="bg-primary rounded-md overflow-hidden"
                        >
                            <div className="p-4">
                                <Image
                                    src={product?.image}
                                    height={500}
                                    width={500}
                                    className="h-[240px] w-full object-cover rounded-md"
                                    alt={`Product ${index + 1} Image`}
                                />
                            </div>
                            <div className="text-muted space-y-3 p-4">
                                <h3 className="text-xl font-bold">
                                    {product.title}
                                </h3>
                                <div className="flex gap-x-2 text-[15px] font-semibold">
                                    <p className="flex gap-x-2">
                                        Average Rating:
                                        <span className="text-accent">
                                            {product?.rating || 0}
                                        </span>
                                    </p>
                                    <Rating
                                        style={{ width: 80 }}
                                        value={product?.rating || 0}
                                        readOnly
                                    />
                                </div>
                                <p className="text-[15px] font-semibold">
                                    Hourly Rate:{" "}
                                    <span className="text-it-secondary">
                                        {product.author} taka
                                    </span>
                                </p>
                                <Button className="bg-accent cursor-pointer w-full hover:bg-it-destructive mt-4">
                                    <Link href={`/tutors/${product?._id}`}>
                                        Add to Cart
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrendingProducts;
