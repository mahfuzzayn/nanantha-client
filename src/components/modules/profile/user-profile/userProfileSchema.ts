import { z } from "zod";

export const userProfileSchema = z.object({
    name: z.string().optional(),
    location: z.string().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
});
