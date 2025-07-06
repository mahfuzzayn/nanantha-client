"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IProduct } from "@/types";
import Image from "next/image";
import Link from "next/link";
import userAvatar from "../../../../assets/images/user.png";
import readersImage from "../../../../assets/images/readers.png";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./HeroSection.css";

const HeroSection = ({ products }: { products: IProduct[] }) => {
    const router = useRouter();
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [matchedSearch, setMatchedSearch] = useState<IProduct[] | []>([]);

    const handleSearchbar = (value: string) => {
        setSearchQuery(value.trim());

        const matchedByProducts = products.filter(
            (product) =>
                product?.title
                    .toLowerCase()
                    .includes(value.trim().toLowerCase()) ||
                product?.author
                    .toLowerCase()
                    .includes(value.trim().toLowerCase()) ||
                product?.category
                    .toLowerCase()
                    .includes(value.trim().toLowerCase())
        );

        setMatchedSearch(matchedByProducts);
    };

    const handleButtonSearch = () => {
        if (searchQuery.trim().length > 0) {
            router.push(`/products?searchQuery=${searchQuery}`);
        }
    };

    return (
        <section className="hero-section">
            <div className="text-it-medium-dark h-[600px] sm:h-[640px] md:h-[680px] relative pt-36">
                <div className="max-w-7xl mx-auto text-center px-6 relative z-[15]">
                    <h1 className="text-3xl md:text-5xl font-extrabold text-secondary mb-4">
                        Find the Perfect Book for Your Needs
                    </h1>
                    <p className="text-lg mb-6 text-it-secondary font-medium">
                        Search by author, title, or category to get need ones.
                    </p>
                    <div className="flex justify-center relative">
                        <div className="w-full max-w-lg">
                            <Input
                                type="text"
                                placeholder="Search for books..."
                                className="bg-white text-black placeholder:text-gray-500 rounded-r-none"
                                onChange={(e) =>
                                    handleSearchbar(e.target.value)
                                }
                            />
                            {matchedSearch.length > 0 &&
                                searchQuery.trim().length > 0 && (
                                    <div className="absolute w-full rounded-xl max-w-lg top-10 backdrop-blur-[20px] border-[2px] border-[#ffffff4f] p-4 flex flex-col gap-y-2 mt-2">
                                        {matchedSearch.map((product) => (
                                            <Link
                                                href={`/products/${product?._id}`}
                                                key={product?._id}
                                                className="flex items-center gap-x-2 text-left bg-accetn rounded-md text-gray-800 font-semibold cursor-pointer hover:text-it-secondary"
                                            >
                                                <Image
                                                    src={
                                                        product?.image ||
                                                        userAvatar
                                                    }
                                                    height={240}
                                                    width={240}
                                                    alt="Profile Image"
                                                    className="rounded-md rounded-r-none h-[42px] w-[56px] object-cover bg-cover"
                                                />
                                                {product?.title}{" "}
                                                <span className="font-medium">
                                                    by
                                                </span>{" "}
                                                {product?.author}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                        </div>
                        <Button
                            onClick={handleButtonSearch}
                            className="bg-primary cursor-pointer text-white hover:bg-it-destructive rounded-l-none"
                        >
                            Search
                        </Button>
                    </div>
                </div>
                <div className="products-image-container absolute left-0 bottom-0 select-none pointer-events-none">
                    <Image
                        src={readersImage}
                        alt="Readers Image"
                        className="mx-auto"
                    />
                </div>
            </div>
        </section>
    );
};

export default HeroSection;
