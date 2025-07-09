import AdminOverview from "@/components/modules/admin/AdminOverview";
import { getAllUsers } from "@/services/admin";
import { getMe } from "@/services/auth";
import { getAllOrders } from "@/services/order";
import { getAllProducts } from "@/services/product";
import { getAllReviews } from "@/services/review";
import { IOrder, IProduct, IReview, IUser } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Overview ‣ Admin Dashboard ‣ Nanantha",
    description:
        "Admin Overview | Nanantha: Get a quick snapshot of sales, orders, products, and activity insights for seamless bookstore management.",
};

const AdminDashboardPage = async () => {
    const { data: admin }: { data: IUser } = await getMe();
    const { data: users }: { data: IUser[] } = await getAllUsers();
    const { data: products }: { data: IProduct[] } = await getAllProducts();
    const { data: orders }: { data: IOrder[] } = await getAllOrders();
    const { data: reviews }: { data: IReview[] } = await getAllReviews();

    return (
        <main className="admin-dashboard-page space-y-5 m-5">
            <section className="space-y-6 w-full">
                <AdminOverview
                    admin={admin}
                    users={users}
                    orders={orders}
                    products={products}
                    reviews={reviews}
                />
            </section>
        </main>
    );
};

export default AdminDashboardPage;
