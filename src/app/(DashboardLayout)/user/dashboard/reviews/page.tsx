import UserReviews from "@/components/modules/reviews/user/UserReviews";
import { getMyReviews } from "@/services/review";
import { IMeta, IReview } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Reviews ‣ User Dashboard ‣ Nanantha",
    description:
        "See all your submitted book reviews on Nanantha. Manage your feedback and keep track of your reading journey.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const UserReviewsPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;
    const { data: reviews, meta }: { data: IReview[]; meta: IMeta } =
        await getMyReviews(
            (query?.page as string) || undefined,
            "5",
            (query?.sort as string) || "-createdAt",
            query
        );

    return <UserReviews reviews={reviews} meta={meta} />;
};

export default UserReviewsPage;
