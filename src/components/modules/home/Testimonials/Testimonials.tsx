/* eslint-disable react/no-unescaped-entities */
import { Card, CardContent } from "@/components/ui/card";
import "./Testimonials.css";
import React from "react";

const testimonialsData = [
    {
        name: "Sarah, Reader",
        comment:
            "Nanantha has an incredible selection of books. I found my favorite mystery novel here and the checkout was super easy!",
    },
    {
        name: "David, Book Lover",
        comment:
            "Thanks to Nanantha, I discovered amazing science fiction titles I’d never heard of before. Great prices too!",
    },
    {
        name: "Aisha, Parent",
        comment:
            "I bought wonderful children’s books from Nanantha for my daughter. She’s absolutely loving story time now!",
    },
    {
        name: "Liam, Student",
        comment:
            "Nanantha helped me find all the textbooks I needed for my classes. It saved me so much time and money!",
    },
    {
        name: "Priya, Avid Reader",
        comment:
            "Fantastic service! Nanantha’s staff is knowledgeable and always recommends the perfect book for me.",
    },
    {
        name: "Emma, Bookworm",
        comment:
            "I love how easy it is to browse and order books from Nanantha online. Their collection is amazing!",
    },
];

const Testimonials = () => {
    return (
        <section className="testimonials-section py-40">
            <div className="max-w-7xl mx-auto text-center px-6">
                <h2 className="text-3xl md:text-5xl font-extrabold text-secondary mb-16">
                    What Our Users Say
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {testimonialsData.map((review, index) => (
                        <Card
                            key={index}
                            className="bg-gradient-to-r from-destructive to-accent border-[1px] border-primary"
                        >
                            <CardContent className="pt-6">
                                <p className="italic font-medium text-white text-[18px]">
                                    "{review.comment}"
                                </p>
                                <p className="text-[16px] font-semibold text-it-medium-dark mt-4">
                                    ⎯ {review.name}
                                </p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
