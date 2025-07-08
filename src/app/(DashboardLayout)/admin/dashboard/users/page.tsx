import AdminUsers from "@/components/modules/admin/AdminUsers";
import { getAllUsers } from "@/services/admin";
import { IMeta, IUser } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Users ‣ Admin Dashboard ‣ Nanantha",
    description: "View users of instructly's and know about them as an admin.",
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
            (query?.sort as string) || undefined,
            query
        );

    return <AdminUsers users={users} meta={meta} />;
};

export default AdminUsersPage;
