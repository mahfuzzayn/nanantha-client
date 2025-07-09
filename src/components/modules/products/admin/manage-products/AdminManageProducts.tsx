"use client";

import { ColumnDef } from "@tanstack/react-table";
import {
    ArrowDown,
    ArrowUp,
    Edit,
    SquareArrowOutUpRight,
    Trash,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IMeta, IProduct, IUser } from "@/types";
import moment from "moment";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { NNTable } from "@/components/ui/core/NNTable";
import TablePagination from "@/components/ui/core/NNTable/TablePagination";
import { productCategories, toastStyles } from "@/constants";
import { deleteProduct } from "@/services/product";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

const AdminManageProducts = ({
    user,
    products,
    meta,
}: {
    user: IUser;
    products: IProduct[];
    meta: IMeta;
}) => {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const handleSearchQuery = (
        query: string,
        value: string | number,
        remove?: boolean
    ) => {
        const params = new URLSearchParams(searchParams.toString());

        if (!remove) {
            params.set(query, value.toString());
        } else {
            params.delete(query);
        }

        router.push(`${pathname}?${params.toString()}`, {
            scroll: false,
        });
    };

    const handleProductDelete = async (productId: string) => {
        const toastId = toast.loading("Deleting the product...", {
            style: toastStyles.success,
        });

        try {
            const res = await deleteProduct(productId);

            if (res.success) {
                toast.success(res.message, {
                    id: toastId,
                    style: toastStyles.success,
                });
            } else {
                toast.error(res.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error) {
            toast.error("Failed to delete the product", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }
    };

    const columns: ColumnDef<IProduct>[] = [
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate">
                        {row.original.title.slice(0, 20)}
                        {row.original.title.length >= 20 && "..."}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "category",
            header: "Category",
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate bg-green-200 py-0.5 px-2 rounded-md">
                        {productCategories.find(
                            (product) => product.value === row.original.category
                        )?.label || row.original.category}
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "price",
            header: ({ column }) => (
                <button
                    onClick={() => {
                        column.toggleSorting();

                        if (column.getIsSorted() === "asc") {
                            handleSearchQuery("sort", "", true);
                        } else if (column.getIsSorted() === "desc") {
                            handleSearchQuery("sort", "-price");
                        } else {
                            handleSearchQuery("sort", "price");
                        }
                    }}
                    className="cursor-pointer hover:text-accent flex items-center gap-x-1"
                >
                    <span>Price</span>
                    {column.getIsSorted() === "asc" && (
                        <span>
                            <ArrowUp size={16} />
                        </span>
                    )}
                    {column.getIsSorted() === "desc" && (
                        <span>
                            <ArrowDown size={16} />
                        </span>
                    )}
                </button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    <span className="truncate text-secondary p-2 rounded-md">
                        {row.original.price}{" "}
                        <span className="font-semibold">$</span>
                    </span>
                </div>
            ),
        },
        {
            accessorKey: "quantity",
            header: ({ column }) => (
                <button
                    onClick={() => {
                        column.toggleSorting();

                        if (column.getIsSorted() === "asc") {
                            handleSearchQuery("sort", "", true);
                        } else if (column.getIsSorted() === "desc") {
                            handleSearchQuery("sort", "-quantity");
                        } else {
                            handleSearchQuery("sort", "quantity");
                        }
                    }}
                    className="cursor-pointer hover:text-accent flex items-center gap-x-1"
                >
                    <span>Quantity</span>
                    {column.getIsSorted() === "asc" && (
                        <span>
                            <ArrowUp size={16} />
                        </span>
                    )}
                    {column.getIsSorted() === "desc" && (
                        <span>
                            <ArrowDown size={16} />
                        </span>
                    )}
                </button>
            ),
            cell: ({ row }) => (
                <div className="flex items-center space-x-3">
                    {row.original.quantity > 0 ? (
                        <span className="truncate">
                            {row.original.quantity}
                        </span>
                    ) : (
                        <span className="truncate text-red-500 font-medium">
                            Out of Stock
                        </span>
                    )}
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
                        href={`/${user?.role}/dashboard/products/update-product/${row.original._id}`}
                    >
                        <Button className="bg-accent hover:bg-yellow-600 cursor-pointer">
                            Edit
                            <Edit className="w-5 h-5" />
                        </Button>
                    </Link>
                    {/* Delete Product Confirmation Modal */}
                    <Dialog>
                        <DialogTrigger>
                            <Button className="bg-red-600 hover:bg-red-700 cursor-pointer">
                                Delete
                                <Trash className="w-5 h-5" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle className="text-secondary">
                                    Are you absolutely sure?
                                </DialogTitle>
                                <DialogDescription>
                                    <div className="mt-4 space-y-6">
                                        <p>
                                            This action cannot be undone. This
                                            will permanently hide the product
                                            from all types users including
                                            admin.
                                        </p>
                                        <Button
                                            onClick={() =>
                                                handleProductDelete(
                                                    row?.original?._id
                                                )
                                            }
                                            className="bg-red-600 hover:bg-red-700 cursor-pointer"
                                        >
                                            Confirm Deletetion
                                        </Button>
                                    </div>
                                </DialogDescription>
                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                </div>
            ),
        },
    ];

    return (
        <div className="m-5">
            <div className="flex flex-col md:flex-row justify-between mb-6 md:mb-4">
                <div className="space-y-2">
                    <h1 className="text-2xl text-secondary font-bold">
                        Manage Products
                    </h1>
                    {meta?.total && (
                        <p className="font-medium text-primary">
                            Total Products: <span>{meta?.total}</span>
                        </p>
                    )}
                </div>
                <Link href={`/${user?.role}/dashboard/products/create-product`}>
                    <Button className="bg-primary hover:bg-secondary cursor-pointer font-semibold">
                        Create Product
                        <SquareArrowOutUpRight />
                    </Button>
                </Link>
            </div>
            <NNTable columns={columns} data={products || []} />
            <TablePagination totalPage={meta?.totalPage} />
        </div>
    );
};

export default AdminManageProducts;
