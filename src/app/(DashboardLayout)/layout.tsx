import { AppSidebar } from "@/components/app-sidebar";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar";

import logo from "../../assets/images/logo_2.png";
import Image from "next/image";
import { getMe } from "@/services/auth";

export default async function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { data: user } = await getMe();

    return (
        <SidebarProvider>
            <AppSidebar user={user} />
            <SidebarInset className="overflow-hidden">
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 cursor-pointer" />
                        <Separator
                            orientation="vertical"
                            className="mr-2 h-4"
                        />
                        <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="block">
                                    <BreadcrumbLink className="text-black flex items-center gap-x-2">
                                        <Image
                                            src={logo}
                                            height={24}
                                            width={24}
                                            alt="Nanantha Logo"
                                        />
                                        <span className="font-medium hidden md:block">
                                            Nanantha{" "}
                                            {user?.role === "admin"
                                                ? "Admin Dashboard Management"
                                                : "User Dashboard Management"}
                                        </span>
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb>
                    </div>
                </header>
                <section className="p-4 pt-0">{children}</section>
            </SidebarInset>
        </SidebarProvider>
    );
}
