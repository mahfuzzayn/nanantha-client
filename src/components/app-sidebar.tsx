"use client";

import * as React from "react";
import { BookOpen, Package, SquareActivity, StarIcon, Undo2, Users } from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/components/ui/sidebar";
import { IUser } from "@/types/user";
import { useUser } from "@/context/UserContext";

export function AppSidebar({
    user,
    ...props
}: {
    user: IUser;
    props?: React.ComponentProps<typeof Sidebar>;
}) {
    const { setUser, setIsLoading } = useUser();

    const data = {
        user,
        adminNav: [
            {
                title: "Overview",
                url: `/${user?.role}/dashboard`,
                icon: SquareActivity,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Users",
                url: `/${user?.role}/dashboard/users`,
                icon: Users,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Orders",
                url: `/${user?.role}/dashboard/orders`,
                icon: Package,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Products",
                url: `/${user?.role}/dashboard/products`,
                icon: BookOpen,
                collapsible: false,
            },
            {
                title: "Reviews",
                url: `/${user?.role}/dashboard/reviews`,
                icon: StarIcon,
                collapsible: false,
            },
            {
                title: "Back to Home",
                url: `/`,
                icon: Undo2,
                collapsible: false,
            },
        ],
        userNav: [
            {
                title: "Overview",
                url: `/${user?.role}/dashboard`,
                icon: SquareActivity,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Orders",
                url: `/${user?.role}/dashboard/orders`,
                icon: Package,
                isActive: true,
                collapsible: false,
            },
            {
                title: "Reviews",
                icon: StarIcon,
                url: `/${user?.role}/dashboard/reviews`,
                items: [
                    {
                        title: "Give Review",
                        url: `/${user?.role}/dashboard/reviews/give-review`,
                    },
                    {
                        title: "My Reviews",
                        url: `/${user?.role}/dashboard/reviews`,
                    },
                ],
                collapsible: true,
            },
            {
                title: "Back to Home",
                url: `/`,
                icon: Undo2,
                collapsible: false,
            },
        ],
    };

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarContent className="bg-muted">
                <NavMain
                    items={
                        user?.role === "admin" ? data.adminNav : data.userNav
                    }
                />
            </SidebarContent>
            <SidebarFooter className="bg-muted">
                <NavUser
                    user={data.user}
                    setUser={setUser}
                    setIsLoading={setIsLoading}
                />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
}
