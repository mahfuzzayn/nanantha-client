/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { IMeta, IReview } from "@/types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import { Eye, EyeOffIcon, SquareArrowOutUpRight } from "lucide-react";
import { useUser } from "@/context/UserContext";
import { Rating } from "@smastrom/react-rating";
import Link from "next/link";
import { toast } from "sonner";
import { NNTable } from "@/components/ui/core/NNTable";
import { updateReviewStatus } from "@/services/review";
import TablePagination from "@/components/ui/core/NNTable/TablePagination";
import { toastStyles } from "@/constants";

const AdminReviews = ({
    reviews,
    meta,
}: {
    reviews: IReview[];
    meta: IMeta;
}) => {
    const { user } = useUser();

    const handleUpdateReviewStatusByAdmin = async (
        reviewId: string,
        status: "visible" | "invisible"
    ) => {
        const toastId = toast.loading("Updating review status...", {
            style: toastStyles.loading,
        });

        try {
            const updatedData = {
                isVisible: status === "visible" ? true : false,
            };

            const res = await updateReviewStatus(reviewId, updatedData);

            if (res.success) {
                toast.success(`Review has been changed to ${status}`, {
                    id: toastId,
                    style: toastStyles.success,
                });
            } else {
                toast.error("Failed to update review status", {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error: any) {
            toast.error("Failed to update review status", {
                id: toastId,
                style: toastStyles.error,
            });
            return Error(error);
        }
    };

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
                        {row?.original?.isVisible ? (
                            <Button
                                className="text-white bg-yellow-600 hover:bg-yellow-700 cursor-pointer"
                                onClick={() =>
                                    handleUpdateReviewStatusByAdmin(
                                        row?.original?._id,
                                        "invisible"
                                    )
                                }
                            >
                                Hide
                                <EyeOffIcon />
                            </Button>
                        ) : (
                            <Button
                                className="text-white bg-green-700 hover:bg-green-900 cursor-pointer"
                                onClick={() =>
                                    handleUpdateReviewStatusByAdmin(
                                        row?.original?._id,
                                        "visible"
                                    )
                                }
                            >
                                Unhide
                                <Eye />
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
                    Manage Reviews
                </h1>
                {meta?.total && (
                    <p className="font-medium text-primary">
                        Total Reviews: <span>{meta?.total}</span>
                    </p>
                )}
            </div>
            <NNTable columns={columns} data={reviews || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default AdminReviews;
