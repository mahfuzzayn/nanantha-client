import Image from "next/image";
import React from "react";
import { Button } from "../../button";
import { X } from "lucide-react";

type TImagePreviewer = {
    setImageFile: React.Dispatch<React.SetStateAction<File | null>>;
    imagePreview: string | null;
    setImagePreview: React.Dispatch<React.SetStateAction<string | null>>;
    className?: string;
};

const ImagePreviewer = ({
    setImageFile,
    imagePreview,
    setImagePreview,
    className,
}: TImagePreviewer) => {
    const handleRemove = () => {
        setImageFile(null);
        setImagePreview(null);
    };

    return (
        <div className={className}>
            {imagePreview ? (
                <div className="relative w-44 h-44 rounded-md overflow-hidden border border-dashed border-gray-300">
                    <Image
                        width={600}
                        height={600}
                        src={imagePreview}
                        alt="Image Preview"
                        className="object-cover w-full h-full"
                    />
                    <Button
                        type="button"
                        size="sm"
                        onClick={handleRemove}
                        className="bg-it-light-dark hover:bg-it-medium-dark absolute -top-0 -right-0 w-6 h-6 p-0 rounded-full"
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            ) : (
                <div className="w-36 h-36 rounded-md overflow-hidden border border-dashed border-gray-300 flex items-center justify-center text-gray-500">
                    No image uploaded
                </div>
            )}
        </div>
    );
};

export default ImagePreviewer;
