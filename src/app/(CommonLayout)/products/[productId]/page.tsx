import ProductDetails from "@/components/modules/products/ProductDetails";
import { getSingleProduct } from "@/services/product";
import { IProduct } from "@/types";
import { redirect } from "next/navigation";

export const generateMetadata = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;
    const { data: product }: { data: IProduct } = await getSingleProduct(
        productId
    );

    return {
        title: `${
            product?.title ? product?.title : "Unknown"
        } ‣ Tutors ‣ Instructly`,
        description: `${
            product?.description ||
            `Explore tutoring services offered by ${product?.title}. ${product?.author} is ready to help you succeed.`
        }`,
    };
};

const ProductDetailsPage = async ({
    params,
}: {
    params: Promise<{ productId: string }>;
}) => {
    const { productId } = await params;
    const { data: product } = await getSingleProduct(productId);

    if (!product) {
        redirect("/products");
    }

    return <ProductDetails product={product}></ProductDetails>;
};

export default ProductDetailsPage;
