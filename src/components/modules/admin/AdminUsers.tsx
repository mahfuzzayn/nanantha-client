/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IMeta, IUser } from "@/types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { UserCheck, UserX } from "lucide-react";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { updateUserStatus } from "@/services/admin";
import { NNTable } from "@/components/ui/core/NNTable";
import TablePagination from "@/components/ui/core/NNTable/TablePagination";
import { toastStyles } from "@/constants";
import { Badge } from "@/components/ui/badge";

const AdminUsers = ({ users, meta }: { users: IUser[]; meta: IMeta }) => {
    const handleUserUpdateByAdmin = async (
        userId: string,
        status: "activate" | "deactivate"
    ) => {
        const toastId = toast.loading("Updating user status...", {
            style: toastStyles.loading,
        });

        try {
            const updatedData = {
                isActive: status === "activate" ? true : false,
            };

            const res = await updateUserStatus(userId, updatedData);

            if (res.success) {
                toast.success(`User has been ${status}d`, {
                    id: toastId,
                    style: toastStyles.success,
                });
            } else {
                toast.error(`Failed to to update user status`, {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error: any) {
            toast.error("Failed to update user status", {
                id: toastId,
                style: toastStyles.error,
            });
            return Error(error);
        }
    };

    const columns: ColumnDef<IUser>[] = [
        {
            accessorKey: "profileUrl",
            header: "Picture",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center space-x-3">
                        <Avatar className="h-12 w-12 rounded-lg">
                            <AvatarImage
                                src={
                                    users.find(
                                        (user) =>
                                            user?._id === row?.original?._id
                                    )?.profileUrl
                                }
                                height={120}
                                width={120}
                                className="pointer-events-none select-none"
                                alt={row?.original?.name}
                            />
                            <AvatarFallback className="bg-it-light-dark rounded-lg text-white font-bold">
                                {row?.original?.name
                                    ?.split(" ")
                                    .slice(0, 2)
                                    .map((name) => name[0])
                                    .join("")}
                            </AvatarFallback>
                        </Avatar>
                    </div>
                );
            },
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original?.name}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "email",
            header: "Email",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.email}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="font-semibold cursor-pointer select-none">
                        {row.original?.role === "admin" ? (
                            <Badge variant="default">Admin</Badge>
                        ) : (
                            <Badge variant="destructive">User</Badge>
                        )}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "userId",
            header: "User Id",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original?._id.slice(0, 5)}...
                        {row.original?._id.slice(
                            row.original?._id.length - 5,
                            row.original?._id.length
                        )}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "CreatedAt At",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        {moment(row.original.createdAt).format(
                            "h:mm A MMMM D, YYYY"
                        )}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "action",
            header: "Action",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <div className="flex items-center space-x-3">
                        {row?.original?.isActive ? (
                            <Button
                                className="text-white bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
                                title="Deactivate"
                                onClick={() =>
                                    handleUserUpdateByAdmin(
                                        row?.original?._id,
                                        "deactivate"
                                    )
                                }
                            >
                                Deactivate
                                <UserX />
                            </Button>
                        ) : (
                            <Button
                                className="text-white bg-primary hover:bg-secondary cursor-pointer"
                                title="Activate"
                                onClick={() =>
                                    handleUserUpdateByAdmin(
                                        row?.original?._id,
                                        "activate"
                                    )
                                }
                            >
                                Activate
                                <UserCheck />
                            </Button>
                        )}
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="mb-4 space-y-2">
                <h1 className="text-2xl text-secondary font-bold">
                    Manage Users
                </h1>
                {meta?.total && (
                    <p className="font-medium text-primary">
                        Total Users: <span>{meta?.total}</span>
                    </p>
                )}
            </div>
            <NNTable columns={columns} data={users || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default AdminUsers;
