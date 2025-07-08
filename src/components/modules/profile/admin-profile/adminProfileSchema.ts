import { z } from "zod";

export const adminProfileSchema = z.object({
    name: z.string().optional(),
    oldPassword: z.string().optional(),
    newPassword: z.string().optional(),
});
