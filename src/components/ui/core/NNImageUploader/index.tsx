import React, { Dispatch, SetStateAction } from "react";
import { Input } from "../../input";
import { cn } from "@/lib/utils";

type TImageUploaderProps = {
    label?: string;
    className?: string;
    setImageFile: Dispatch<SetStateAction<File | null>>;
    setImagePreview: Dispatch<SetStateAction<string | null>>;
};

const ITImageUploader = ({
    label = "Upload Images",
    className,
    setImageFile,
    setImagePreview,
}: TImageUploaderProps) => {
    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files![0];
        setImageFile(file);

        if (file) {
            const reader = new FileReader();

            reader.onloadend = () => {
                setImagePreview(reader.result as string);
            };
            reader.readAsDataURL(file);

            event.target.value = "";
        }
    };

    return (
        <div
            className={cn("flex flex-col items-center w-full gap-4", className)}
        >
            <Input
                id="image-uploader"
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
            />
            <label
                className="w-full h-44 md:size-44 flex items-center justify-center border-2 border-dashed border-it-light-primary rounded-md cursor-pointer text-center text-sm text-it-medium-dark hover:bg-white transition"
                htmlFor="image-uploader"
            >
                {label}
            </label>
        </div>
    );
};

export default ITImageUploader;
