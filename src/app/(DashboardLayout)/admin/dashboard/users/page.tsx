import AdminUsers from "@/components/modules/admin/AdminUsers";
import { getAllUsers } from "@/services/admin";
import { IMeta, IUser } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Users ‣ Admin Dashboard ‣ Nanantha",
    description: "Manage bookstore users in the Nanantha admin panel. View profiles, roles, and activity for effective user administration.",
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const AdminUsersPage = async ({
    searchParams,
}: {
    searchParams: SearchParams;
}) => {
    const query = await searchParams;
    const { data: users, meta }: { data: IUser[]; meta: IMeta } =
        await getAllUsers(
            (query?.page as string) || undefined,
            "10",
            (query?.sort as string) || "-createdAt",
            query
        );

    return <AdminUsers users={users} meta={meta} />;
};

export default AdminUsersPage;
