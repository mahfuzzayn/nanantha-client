/* eslint-disable react/no-unescaped-entities */
"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { IArticle } from "@/types";
import Loading from "../../../assets/svgs/infinity-loading.svg";
import Image from "next/image";
import orangeGradientBg from "@/assets/images/orange-gradient-bg.jpg";

const NNBlogs = ({ articles }: { articles: IArticle[] }) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredArticles, setFilteredArticles] = useState<IArticle[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                if (articles) {
                    setFilteredArticles(articles);
                    setIsLoading(true);
                }
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        };

        fetchArticles();
    }, [articles]);

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value.toLowerCase();
        setSearchQuery(query);
        const filtered = articles.filter((article) =>
            article.title.toLowerCase().includes(query)
        );
        setFilteredArticles(filtered);
    };

    if (!isLoading) {
        return (
            <div className="flex min-h-screen flex-col justify-center items-center">
                <Image src={Loading} height={120} width={120} alt="Loader" />
                <p className="text-secondary font-bold">Loading</p>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto pt-24 mb-40 px-6">
            <h1 className="text-3xl md:text-5xl font-bold text-secondary text-center mb-8">
                Blogs
            </h1>
            <div className="flex items-center gap-x-2 mt-16 mb-8">
                <Input
                    placeholder="Search articles by just typing characters..."
                    className="bg-gray-100 text-black py-5 placeholder:text-gray-500"
                    value={searchQuery}
                    onChange={handleSearch}
                />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredArticles.length > 0 ? (
                    filteredArticles.map((article: IArticle, index) => (
                        <Card
                            key={index}
                            style={{
                                backgroundImage: `url('${orangeGradientBg.src}')`,
                            }}
                            className="h-full w-full object-cover bg-center"
                        >
                            <CardHeader>
                                <CardTitle className="text-2xl text-destructive font-bold">
                                    {article.title.length > 50
                                        ? `${article.title.slice(0, 50)}...`
                                        : article.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Image
                                    src={article.urlToImage}
                                    height={600}
                                    width={1000}
                                    className="h-[200px] w-full object-cover mb-4 rounded-md"
                                    alt="image"
                                />
                                <p className="text-md font-medium text-gray-800">
                                    {article.description
                                        ? `${article.description.slice(
                                              0,
                                              100
                                          )}...`
                                        : "No description available."}
                                </p>
                                <p className="flex">
                                    <Link
                                        href={article.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="bg-primary hover:bg-it-destructive text-white text-sm px-4 py-2 rounded-md mt-4 block"
                                    >
                                        Read More
                                    </Link>
                                </p>
                            </CardContent>
                        </Card>
                    ))
                ) : (
                    <p>No articles found for "{searchQuery}".</p>
                )}
            </div>
        </div>
    );
};

export default NNBlogs;
