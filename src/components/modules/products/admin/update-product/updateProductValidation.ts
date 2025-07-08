import { z } from "zod";

export const updateProductValidationSchema = z.object({
    title: z.string().optional(),
    author: z.string().optional(),
    price: z.number().optional(),
    category: z.string().optional(),
    description: z.string().optional(),
    quantity: z.number().optional(),
});
