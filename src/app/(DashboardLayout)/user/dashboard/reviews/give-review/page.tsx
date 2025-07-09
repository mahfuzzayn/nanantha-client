import GiveReviewForm from "@/components/modules/reviews/user/give-review/GiveReviewForm";
import { getMe } from "@/services/auth";
import { getAllProducts } from "@/services/product";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Give Review ‣ User Dashboard ‣ Nanantha",
    description:
        "Leave a review for your purchased books on Nanantha. Share your reading experience and help other book lovers decide!",
};

const GiveReviewPage = async () => {
    const { data: user } = await getMe();
    const { data: products } = await getAllProducts(
        undefined,
        undefined,
        "-createdAt",
        undefined
    );

    return <GiveReviewForm user={user} products={products} />;
};

export default GiveReviewPage;
