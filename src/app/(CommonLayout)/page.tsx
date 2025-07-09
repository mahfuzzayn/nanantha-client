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
        "Welcome to Nanantha – your trusted online bookstore. Discover bestsellers, new releases, and timeless classics across every genre. Explore, shop, and fuel your love for reading!",
};

const HomePage = async () => {
    const { data: products } = await getAllProducts();
    const { data: trendingProducts } = await getAllProducts(
        undefined,
        "8",
        "-rating"
    );

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
