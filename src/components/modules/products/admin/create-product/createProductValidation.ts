import { z } from "zod";

export const createProductValidationSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author is required"),
    price: z.number().min(1, "Price is required"),
    category: z.string().min(1, "Category is required"),
    description: z.string().min(1, "Description is required"),
    quantity: z.number().min(0, "Quantity is required"),
});
