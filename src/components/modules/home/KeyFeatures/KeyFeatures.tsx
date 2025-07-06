import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BadgeCheck, DollarSign, Package, UserCheck } from "lucide-react";
import "./KeyFeatures.css";
import React from "react";

const keyFeaturesData = [
    {
        title: "Curated Collection",
        icon: BadgeCheck,
        description:
            "Discover handpicked books across genres, carefully selected for quality and interest.",
    },
    {
        title: "Personalized Recommendations",
        icon: UserCheck,
        description:
            "Get book suggestions tailored to your tastes for a perfect reading experience.",
    },
    {
        title: "Secure Payments with Mollie",
        icon: DollarSign,
        description:
            "Shop confidently and pay securely through Mollie for a hassle-free checkout.",
    },
    {
        title: "Fast & Easy Shopping",
        icon: Package,
        description:
            "Quickly find and order your favorite books with our user-friendly platform.",
    },
];

const KeyFeatures = () => {
    return (
        <section className="key-features-section py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-16">
                    Why Choose Us?
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {keyFeaturesData.map((feature, index) => (
                        <Card
                            key={index}
                            className="bg-it-extra-light hover:bg-primary transition-all group"
                        >
                            <CardHeader>
                                <feature.icon className="text-it-primary group-hover:text-white transition-all h-12 w-12 mx-auto mb-4" />
                                <CardTitle className="mt-4 leading-6 group-hover:text-white">
                                    {feature.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="group-hover:text-white">
                                    {feature.description}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default KeyFeatures;
