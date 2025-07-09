"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SquareArrowOutUpRight } from "lucide-react";
import { IMeta, IOrder, IPaymentStatus, IStatus } from "@/types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import { NNTable } from "@/components/ui/core/NNTable";
import TablePagination from "@/components/ui/core/NNTable/TablePagination";
import { NNStatusBadge } from "@/components/ui/core/NNStatusBadge/NNStatusBadge";
import { NNPaymentStatusBadge } from "@/components/ui/core/NNPaymentStatusBadge/NNPaymentStatusBadge";
import ChangeStatusByAdmin from "./ChangeStatusByAdmin/ChangeStatusByAdmin";

const ManageAdminOrders = ({
    orders,
    meta,
}: {
    orders: IOrder[];
    meta: IMeta;
}) => {
    const { user } = useUser();
    const columns: ColumnDef<IOrder>[] = [
        {
            accessorKey: "items",
            header: "Items",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.items?.length}{" "}
                        {row?.original?.items?.length > 1 ? "Items" : "Item"}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: "Total Amount",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate text-secondary p-2 rounded-md">
                        {row.original.amount}{" "}
                        <span className="font-semibold">$</span>
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <NNStatusBadge status={row.original.status as IStatus} />
                </div>
            ),
        },
        {
            accessorKey: "paymentStatus",
            header: "Payment Status",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <NNPaymentStatusBadge
                        status={row.original.paymentStatus as IPaymentStatus}
                    />
                </div>
            ),
        },
        {
            accessorKey: "createdAt",
            header: "Created At",
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
            accessorKey: "updatedAt",
            header: "Updated At",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        {moment(row.original.updatedAt).format(
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
                    <Link
                        href={`/${user?.role}/dashboard/orders/${row.original._id}`}
                    >
                        <Button className="text-white bg-primary hover:bg-secondary cursor-pointer">
                            View
                            <SquareArrowOutUpRight />
                        </Button>
                    </Link>
                    <ChangeStatusByAdmin
                        orderId={row?.original?._id}
                        status={row?.original?.status as IStatus}
                    />
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="mb-4 space-y-2">
                <h1 className="text-2xl text-secondary font-bold">
                    Manage Orders
                </h1>
                {meta?.total && (
                    <p className="font-medium text-primary">
                        Total Orders: <span>{meta?.total}</span>
                    </p>
                )}
            </div>
            <NNTable columns={columns} data={orders || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default ManageAdminOrders;
