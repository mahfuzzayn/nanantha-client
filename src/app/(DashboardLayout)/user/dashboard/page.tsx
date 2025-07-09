import UserOverview from "@/components/modules/user/UserOverview";
import { getMe } from "@/services/auth";
import { getMyOrders } from "@/services/order";
import { getMyReviews } from "@/services/review";
import { IOrder, IReview, IUser } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Overview ‣ User Dashboard ‣ Nanantha",
    description:
        "Dashboard Overview | Nanantha: Quickly view your orders, reviews, and personal account details all in one convenient place.",
};

const UserDashboardPage = async () => {
    const { data: user }: { data: IUser } = await getMe();
    const { data: orders }: { data: IOrder[] } = await getMyOrders();
    const { data: reviews }: { data: IReview[] } = await getMyReviews();

    return (
        <main className="user-dashboard-page space-y-5 m-5">
            <section className="space-y-6 w-full">
                <UserOverview user={user} orders={orders} reviews={reviews} />
            </section>
        </main>
    );
};

export default UserDashboardPage;
