import UserProfile from "@/components/modules/profile/user-profile/UserProfile";
import { getMe } from "@/services/auth";
import { IUser } from "@/types";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
    title: "Profile ‣ User Dashboard ‣ Nanantha",
    description:
        "User Profile | Nanantha: Manage your personal information, update account settings, and customize your bookstore experience.",
};

const UserProfilePage = async () => {
    const { data: user }: { data: IUser } = await getMe();

    return (
        <main className="admin-profile-page flex flex-col items-start space-y-2 m-5">
            <div className="space-y-2 p-5 pb-0">
                <h2 className="text-3xl font-bold text-center">
                    Welcome,{" "}
                    <span className="text-secondary">{user?.name}</span>
                </h2>
                <p className="text-md">
                    Manage your user profile settings here!
                </p>
            </div>
            <UserProfile user={user} />
        </main>
    );
};

export default UserProfilePage;
