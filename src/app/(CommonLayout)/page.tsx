import HeroSection from "@/components/modules/home/HeroSection/HeroSection";
import KeyFeatures from "@/components/modules/home/KeyFeatures/KeyFeatures";
import Testimonials from "@/components/modules/home/Testimonials/Testimonials";
import GetStarted from "@/components/modules/home/GetStarted/GetStarted";
import { Metadata } from "next";
import Products from "@/components/modules/home/Products/Products";
import Newsletter from "@/components/modules/home/Newsletter/Newsletter";
import Blogs from "@/components/modules/home/Blogs/Blogs";
import { getAllProducts } from "@/services/product";
import TrendingProducts from "@/components/modules/home/TrendingProducts/TrendingProducts";

export const metadata: Metadata = {
    title: "Nanantha",
    description:
        "Explore our platform to connect with expert tutors and embark on a personalized learning journey.",
};

const HomePage = async () => {
    const { data: products } = await getAllProducts();
    const { data: trendingProducts } = await getAllProducts();

    return (
        <div className="home-page min-h-screen bg-gray-50">
            <HeroSection products={products} />
            <Products products={products} />
            <TrendingProducts products={trendingProducts} />
            <KeyFeatures />
            <Testimonials />
            <GetStarted />
            <Blogs />
            <Newsletter />
        </div>
    );
};

export default HomePage;
