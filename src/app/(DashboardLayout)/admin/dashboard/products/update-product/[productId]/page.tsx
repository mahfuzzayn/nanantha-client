import UpdateProductForm from "@/components/modules/products/admin/update-product/UpdateProductForm";
import { Button } from "@/components/ui/button";
import { getMe } from "@/services/auth";
import { getSingleProduct } from "@/services/product";
import { IProduct } from "@/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;
    const { data: subject }: { data: IProduct } = await getSingleProduct(
        productId
    );

    return {
        title: `${
            subject?.createdAt
                ? `Update Product (${subject?._id.slice(
                      0,
                      3
                  )}...${subject?._id.slice(
                      subject?._id.length - 3,
                      subject?._id.length
                  )})`
                : "Invalid Product"
        } ‣ Admin Dashboard ‣ Nanantha`,
        description: `${
            subject?.createdAt
                ? `Update product for to specialize in as an admin to better serve your students.`
                : "Invalid Product, so we can't provide any description."
        }`,
    };
};

const UpdateProductPage = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;
    const { data: user } = await getMe();
    const { data: product } = await getSingleProduct(productId);

    if (!product) {
        return (
            <div className="min-h-screen flex flex-col gap-5 justify-center items-center">
                <h2 className="text-2xl md:text-3xl text-it-medium-dark font-bold">
                    Invalid Product ID
                </h2>
                <p className="text-lg text-center">
                    Product ID:{" "}
                    <span className="font-semibold">{productId}</span>
                </p>
                <Link href="/admin/dashboard/products">
                    <Button className="bg-primary hover:bg-secondary font-semibold mb-5">
                        <ArrowLeft /> Products
                    </Button>
                </Link>
            </div>
        );
    }

    return <UpdateProductForm user={user} product={product} />;
};

export default UpdateProductPage;
