import HeroSection from "@/components/modules/home/HeroSection/HeroSection";
import KeyFeatures from "@/components/modules/home/KeyFeatures/KeyFeatures";
import Testimonials from "@/components/modules/home/Testimonials/Testimonials";
import GetStarted from "@/components/modules/home/GetStarted/GetStarted";
import { Metadata } from "next";
import Subjects from "@/components/modules/home/Subjects/Subjects";
import Newsletter from "@/components/modules/home/Newsletter/Newsletter";
import Blogs from "@/components/modules/home/Blogs/Blogs";
import { getAllProducts } from "@/services/product";

export const metadata: Metadata = {
    title: "Nanantha",
    description:
        "Explore our platform to connect with expert tutors and embark on a personalized learning journey.",
};

const HomePage = async () => {
    const { data: products } = await getAllProducts();
    // const { data: subjects } = await getAllSubjects();

    return (
        <div className="min-h-screen bg-gray-50">
            <HeroSection products={products} />
            {/* <Subjects subjects={subjects} />
            <Tutors tutors={tutors} /> */}
            <KeyFeatures />
            <Testimonials />
            <GetStarted />
            <Blogs />
            <Newsletter />
        </div>
    );
};

export default HomePage;
