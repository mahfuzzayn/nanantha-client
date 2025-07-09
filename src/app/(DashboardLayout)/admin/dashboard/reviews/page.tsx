import AdminReviews from "@/components/modules/reviews/admin/AdminReviews";
import { getAllReviews } from "@/services/review";
import { IMeta, IReview } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Reviews ‣ Admin Dashboard ‣ Nanantha",
    description:
        "Manage customer reviews in Nanantha’s admin dashboard. Moderate feedback, change visibility, and ensure a trustworthy shopping experience.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AdminReviewsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;
    const { data: reviews, meta }: { data: IReview[]; meta: IMeta } =
        await getAllReviews(
            (query?.page as string) || undefined,
            "5",
            (query?.sort as string) || "-createdAt",
            query
        );

    return <AdminReviews reviews={reviews} meta={meta} />;
};

export default AdminReviewsPage;
