"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IMeta, IReview } from "@/types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { SquareArrowOutUpRight } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import { NNTable } from "@/components/ui/core/NNTable";
import TablePagination from "@/components/ui/core/NNTable/TablePagination";

const UserReviews = ({
    reviews,
    meta,
}: {
    reviews: IReview[];
    meta: IMeta;
}) => {
    const { user } = useUser();

    const columns: ColumnDef<IReview>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.user?.name}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "comment",
            header: "Comment",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.comment.slice(0, 30)}...
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "product",
            header: "Product",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.product?.title?.slice(0, 20)}
                        {row.original.product?.title?.length >= 20 && "..."}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "author",
            header: "Author",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate font-semibold">
                        {row.original.product?.author}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "rating",
            header: "Rating",
            cell: ({ row }) => (
                <div className="flex items-center space-x-2">
                    <p className="truncate">{row.original.rating}</p>
                    <Rating
                        style={{ width: 80 }}
                        value={row.original?.rating}
                        readOnly
                    />
                </div>
            ),
        },
        {
            accessorKey: "givenAt",
            header: "Given At",
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
                        <Link
                            href={`/${user?.role}/dashboard/reviews/${row.original._id}`}
                        >
                            <Button className="text-white hover:bg-secondary cursor-pointer">
                                View
                                <SquareArrowOutUpRight />
                            </Button>
                        </Link>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-4">
                <div className="mb-4 space-y-2">
                    <h1 className="text-2xl text-secondary font-bold">
                        Manage Reviews
                    </h1>
                    {meta?.total && (
                        <p className="font-medium text-primary">
                            Total Reviews: <span>{meta?.total}</span>
                        </p>
                    )}
                </div>
                <Link href={`/${user?.role}/dashboard/reviews/give-review`}>
                    <Button className="bg-primary hover:bg-secondary cursor-pointer font-semibold">
                        Give Review
                        <SquareArrowOutUpRight />
                    </Button>
                </Link>
            </div>
            <NNTable columns={columns} data={reviews || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default UserReviews;
