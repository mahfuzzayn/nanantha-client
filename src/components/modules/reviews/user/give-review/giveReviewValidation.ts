import { z } from "zod";

export const giveReviewValidationSchema = z.object({
    product: z.string().min(1, "Title is required"),
    rating: z
        .number()
        .min(0, "Rating is required")
        .max(5, "Rating must be between 0-5"),
    comment: z.string().min(1, "Comment is required"),
});
