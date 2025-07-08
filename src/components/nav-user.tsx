"use client";

import { ChevronsUpDown, LogOut, Settings } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    useSidebar,
} from "@/components/ui/sidebar";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { IUser } from "@/types";
import { logout } from "@/services/auth";

export function NavUser({
    user,
    setUser,
    setIsLoading,
}: {
    user: {
        name?: string;
        email?: string;
        profileUrl?: string;
        role?: string;
    } | null;
    setUser: (user: IUser | null) => void;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}) {
    const { isMobile } = useSidebar();
    const router = useRouter();

    const handleLogOut = async () => {
        await logout();
        setUser(null);
        setIsLoading(true);

        router.push("/");
        router.refresh();
    };

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton
                            size="lg"
                            className="cursor-pointer bg-primary hover:bg-secondary text-white hover:text-white data-[state=open]:bg-accent data-[state=open]:text-white"
                        >
                            <Avatar className="h-8 w-8 rounded-lg">
                                <AvatarImage
                                    src={user?.profileUrl}
                                    alt={user?.name}
                                />
                                <AvatarFallback className="bg-it-light-dark rounded-lg text-white font-bold">
                                    {user?.name?.slice(0, 1)}
                                </AvatarFallback>
                            </Avatar>
                            <div className="grid flex-1 text-left text-sm leading-tight">
                                <span className="truncate font-semibold">
                                    {user?.name}
                                </span>
                                <span className="truncate text-xs">
                                    {user?.email}
                                </span>
                            </div>
                            <ChevronsUpDown className="ml-auto size-4" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
                        side={isMobile ? "bottom" : "right"}
                        align="end"
                        sideOffset={4}
                    >
                        <DropdownMenuLabel className="p-0 font-normal">
                            <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                <Avatar className="h-8 w-8 rounded-lg">
                                    <AvatarImage
                                        src={user?.profileUrl}
                                        alt={user?.name}
                                    />
                                    <AvatarFallback className="bg-it-light-dark rounded-lg text-white font-bold">
                                        {user?.name
                                            ?.split(" ")
                                            .slice(0, 2)
                                            .map((name) => name[0])
                                            .join("")}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="grid flex-1 text-left text-sm leading-tight">
                                    <span className="truncate font-semibold">
                                        {user?.name}
                                    </span>
                                    <span className="truncate text-xs">
                                        {user?.email}
                                    </span>
                                </div>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                            <Link href={`/${user?.role}/dashboard/profile`}>
                                <DropdownMenuItem className="cursor-pointer">
                                    <Settings />
                                    Manage Profile
                                </DropdownMenuItem>
                            </Link>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={handleLogOut}
                            className="cursor-pointer"
                        >
                            <LogOut />
                            Log out
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    );
}
