import NNBlogs from "@/components/modules/blogs";
import { IArticle } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Blogs ‣ Nanantha",
    description:
        "Discover insights, tips, and inspiring stories on topics that matter. Join us on a journey of learning and discovery.",
};

const BlogsPage = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_API}/news`, {
        cache: "force-cache",
    });
    const { data: news }: { data: { articles: IArticle[] } } = await res.json();
  
    return (
        <section className="blogs-section min-h-screen">
            <NNBlogs articles={news.articles} />
        </section>
    );
};

export default BlogsPage;
