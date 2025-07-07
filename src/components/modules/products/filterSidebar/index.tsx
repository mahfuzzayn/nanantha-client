"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { IProduct } from "@/types";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortByOptions = [
    {
        value: "-quantity",
        label: "Relevance",
    },
    {
        value: "-rating",
        label: "Rating",
    },
    {
        value: "price",
        label: "Price (low to high)",
    },
    {
        value: "-price",
        label: "Price (high to low)",
    },
    {
        value: "-createdAt",
        label: "Newest",
    },
];

const productCategories = [
    "Fiction",
    "Science",
    "SelfDevelopment",
    "Poetry",
    "Religious",
];

export default function FilterSidebar({ products }: { products: IProduct[] }) {
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState<boolean>(false);
    const [price, setPrice] = useState([0]);
    const [rating, setRating] = useState<number | string>("All");
    const [location, setLocation] = useState<string>("Set None");
    const [selectedAuthors, setSelectedAuthors] = useState<string[]>([]);
    const [sortBy, setSortBy] = useState<string>();
    const [category, setCategory] = useState<string>();

    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearchQuery = (query: string, value: string | number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(query, value.toString());

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const handleAuthorChange = (authorName: string) => {
        let updatedAuthors = [...selectedAuthors];

        if (updatedAuthors.includes(authorName)) {
            updatedAuthors = updatedAuthors.filter(
                (author) => author !== author
            );
        } else {
            updatedAuthors.push(authorName);
        }

        setSelectedAuthors(updatedAuthors);
        handleSearchQuery("authors", updatedAuthors.join(","));
    };

    const handleSortByChange = (value: string) => {
        if (value === sortBy) {
            setSortBy("");
            handleSearchQuery("sort", "");
        } else {
            setSortBy(value);
            handleSearchQuery("sort", value);
        }
    };

    const handleCategoryChange = (value: string) => {
        if (value === category) {
            setCategory("");
            handleSearchQuery("category", "");
        } else {
            setCategory(value);
            handleSearchQuery("category", value);
        }
    };

    return (
        <section className="filter-products-section">
            <div
                className={`fixed top-0 z-[1020] ${
                    isFilterMenuOpen ? "left-[0px]" : "left-[-400px]"
                } overflow-y-scroll lg:overflow-y-auto lg:static p-6 h-full space-y-4 w-[300px] lg:w-auto bg-accent text-white z-[5] transition-all lg:rounded-md`}
            >
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl font-bold">Filter</h2>
                    {searchParams.toString().length > 0 && (
                        <Button
                            onClick={() => {
                                setRating("All");
                                setPrice([0]);
                                setLocation("Set None");
                                setCategory("");
                                setSortBy("");
                                setSelectedAuthors([]);
                                router.push(`${pathname}`, {
                                    scroll: false,
                                });
                            }}
                            size="sm"
                            className="bg-red-500 cursor-pointer hover:bg-red-700"
                        >
                            Clear Filters
                        </Button>
                    )}
                    <Button
                        className="lg:hidden bg-muted cursor-pointer hover:bg-it-destructive text-black rounded-full !p-3"
                        onClick={() => setIsFilterMenuOpen(false)}
                    >
                        <X />
                    </Button>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Authors</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {products.map((product) => (
                            <li
                                key={product._id}
                                onClick={() =>
                                    handleAuthorChange(product.author)
                                }
                                className={`px-2 py-1 cursor-pointer text-sm rounded list-none ${
                                    selectedAuthors.includes(product.author)
                                        ? "bg-primary text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {product.author}
                            </li>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Category</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {productCategories.map((option, index) => (
                            <li
                                key={index}
                                onClick={() => handleCategoryChange(option)}
                                className={`px-2 py-1 text-sm list-none rounded  cursor-pointer ${
                                    option === category
                                        ? "bg-primary text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {option}
                            </li>
                        ))}
                    </div>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Rating</h2>
                    <div className="flex justify-between my-2">
                        <span>0</span>
                        <span>5</span>
                    </div>
                    <Slider
                        max={5}
                        step={0.1}
                        onValueChange={(value) => {
                            setRating(Number(value));
                            handleSearchQuery("rating", value[0]);
                        }}
                        className="w-full cursor-move"
                    />
                    <p className="text-sm mt-2">Selected Rating: {rating}</p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Price (Taka)</h2>
                    <div className="flex justify-between my-2">
                        <span>0</span>
                        <span>1000</span>
                    </div>
                    <Slider
                        max={1000}
                        step={1}
                        onValueChange={(value) => {
                            setPrice(value);
                            handleSearchQuery("maxPrice", value[0]);
                        }}
                        value={price}
                        className="w-full cursor-move"
                    />
                    <p className="text-sm mt-2">
                        Selected Price Rate: {price[0]}
                    </p>
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Keywords</h2>
                    <span className="text-sm">Insert (Title, Description)</span>
                    <Input
                        onChange={(e) => {
                            const value = e.target.value;
                            setLocation(value);
                            handleSearchQuery("keywords", value);
                        }}
                        value={location !== "Set None" ? location : ""}
                        className="w-full mt-2 border-white bg-it-medium-dark"
                    />
                </div>
                <div>
                    <h2 className="text-lg font-semibold">Sort By</h2>
                    <div className="flex flex-wrap gap-2 mt-2">
                        {sortByOptions.map((option) => (
                            <li
                                key={option.label}
                                onClick={() => handleSortByChange(option.value)}
                                className={`px-2 py-1 text-sm list-none rounded  cursor-pointer ${
                                    option.value === sortBy
                                        ? "bg-primary text-white"
                                        : "bg-gray-200 text-black"
                                }`}
                            >
                                {option.label}
                            </li>
                        ))}
                    </div>
                </div>
            </div>
            <div className="fixed lg:hidden top-24 left-0 z-[1000]">
                <Button
                    className="flex items-center gap-x-2 bg-destructive cursor-pointer hover:bg-it-destructive p-1 pr-2 text-white rounded-l-none rounded-r-[8px]"
                    onClick={() => setIsFilterMenuOpen(true)}
                >
                    <p className="text-lg font-semibold">Filter</p>
                    <Menu />
                </Button>
            </div>
        </section>
    );
}
