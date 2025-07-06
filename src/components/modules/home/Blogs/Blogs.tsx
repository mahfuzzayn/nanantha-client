"use client";

import React from "react";
import "./Blogs.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import blogImg1 from "@/assets/images/blogs/blog-image-1.jpg";
import blogImg2 from "@/assets/images/blogs/blog-image-2.jpg";
import blogImg3 from "@/assets/images/blogs/blog-image-3.jpg";
import blogImg4 from "@/assets/images/blogs/blog-image-4.jpg";
import blogImg5 from "@/assets/images/blogs/blog-image-5.jpg";
import blogImg6 from "@/assets/images/blogs/blog-image-6.jpg";
import blogImg7 from "@/assets/images/blogs/blog-image-7.jpg";
import blogImg8 from "@/assets/images/blogs/blog-image-8.jpg";
import blogImg9 from "@/assets/images/blogs/blog-image-9.jpg";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

interface IBlogData {
    category: string;
    title: string;
    thumbnail: StaticImageData;
    category_href: string;
    href: string;
}

const blogsData: IBlogData[] = [
    {
        category: "Branding",
        title: "Technologies Shaping the Future",
        thumbnail: blogImg1,
        category_href: "/blog-category/branding/",
        href: "/blog/technologies-shaping-the-future/",
    },
    {
        category: "Idea",
        title: "The Evolution of Machine Learning",
        thumbnail: blogImg2,
        category_href: "/blog-category/idea/",
        href: "/blog/the-evolution-of-machine-learning/",
    },
    {
        category: "Design",
        title: "Unleashing the Power of Data",
        thumbnail: blogImg3,
        category_href: "/blog-category/design/",
        href: "/blog/unleashing-the-power-of-data/",
    },
    {
        category: "Idea",
        title: "Securing the Digital Tech World",
        thumbnail: blogImg4,
        category_href: "/blog-category/idea/",
        href: "/blog/securing-the-digital-tech-world/",
    },
    {
        category: "Branding",
        title: "Mastering the Art of Software",
        thumbnail: blogImg5,
        category_href: "/blog-category/branding/",
        href: "/blog/mastering-the-art-of-software/",
    },
    {
        category: "Branding",
        title: "Navigating the Future of design",
        thumbnail: blogImg6,
        category_href: "/blog-category/branding/",
        href: "/blog/navigating-the-future-of-design/",
    },
    {
        category: "Branding",
        title: "Technologies Shaping the Future",
        thumbnail: blogImg7,
        category_href: "/blog-category/branding/",
        href: "/blog/technologies-shaping-the-future/",
    },
    {
        category: "Idea",
        title: "The Evolution of Machine Learning",
        thumbnail: blogImg8,
        category_href: "/blog-category/idea/",
        href: "/blog/the-evolution-of-machine-learning/",
    },
    {
        category: "Design",
        title: "Unleashing the Power of Data",
        thumbnail: blogImg9,
        category_href: "/blog-category/design/",
        href: "/blog/unleashing-the-power-of-data/",
    },
];

const Blogs = () => {
    return (
        <section className="blogs-section">
            <div className="h-[350px] md:h-[400px] lg:h-[450px] bg-destructive px-2.5 pt-[45px] md:pt-[100px]">
                <div className="max-w-[1140px] flex flex-col gap-y-5 md:flex-row justify-center md:items-center text-white gap-x-10 mx-auto">
                    <h1 className="text-5xl md:text-[80px] lg:text-[110px] md:w-1/2 font-syne font-bold leading-[42px]">
                        Blogs
                    </h1>
                    <p className="text-[18px] md:w-1/2 font-dm-sans">
                        Discover insights, tips, and inspiring stories on topics
                        that matter. Join us on a journey of learning and
                        discovery.
                    </p>
                </div>
                <div className="mx-3">
                    <Swiper
                        breakpoints={{
                            0: {
                                slidesPerView: 1,
                            },
                            768: {
                                slidesPerView: 3,
                            },
                            1024: {
                                slidesPerView: 4,
                            },
                        }}
                        spaceBetween={10}
                        grabCursor={true}
                        speed={2000}
                        autoplay={{
                            delay: 2500,
                        }}
                        pagination={{
                            el: ".swiper-pagination-blog",
                            clickable: true,
                            type: "bullets",
                        }}
                        loop={true}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper lg:max-w-[1170px] select-none relative top-[32px] md:top-[24px] lg:top-[64px]"
                    >
                        {blogsData.map((pf, index) => (
                            <SwiperSlide key={index}>
                                <div className="group md:max-w-[330px] lg:max-w-[280px] overflow-hidden relative">
                                    <div className="blog-thumbnail">
                                        <Link href={`/blogs`}>
                                            <Image
                                                src={pf.thumbnail}
                                                alt={`blog-image-${index + 1}`}
                                                height={499}
                                                width={768}
                                                className="w-full h-[300px] lg:h-[400px] object-cover object-center group-hover:scale-[1.05] transition-all duration-300 cursor-pointer"
                                            />
                                        </Link>
                                    </div>
                                    <div className="blog-content bg-white w-[90%] absolute bottom-0 left-0 py-5 px-[30px] group-hover:pb-[75px] transition-all duration-300">
                                        <div className="flex">
                                            <Link href={`/blogs`}>
                                                <p className="category-link flex items-center font-semibold gap-x-1.5 text-[#666666] font-syne text-[14px] cursor-pointer mb-1">
                                                    <span className="h-0.5 w-[15px] bg-it-primary block"></span>
                                                    {pf.category}
                                                </p>
                                            </Link>
                                        </div>
                                        <h3 className="font-syne text-[18px] font-semibold leading-6">
                                            <Link href={`/blogs`}>
                                                {pf.title}
                                            </Link>
                                        </h3>
                                        <Link href={`/blogs`}>
                                            <div className="h-[40px] w-[40px] flex justify-center items-center translate-y-[200px] group-hover:translate-y-[10px] transition-all duration-300 cursor-pointer border-[1px] border-[#DDDDDD] rounded-full hover:bg-destructive hover:text-white absolute">
                                                <ArrowRight
                                                    strokeWidth={1.5}
                                                    size={20}
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                    <div className="swiper-pagination-blog !top-[62px] md:!top-[54px] lg:!top-[94px]"></div>
                </div>
            </div>
            <div className="bg-it-extra-light h-[250px] lg:h-[300px]"></div>
        </section>
    );
};

export default Blogs;
