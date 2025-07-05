import z from "zod";

export const registerFormSchema = z.object({
    name: z
        .string({ required_error: "Name is required" })
        .min(1, "Name must be at least 6 characters"),
    email: z
        .string({ required_error: "Email is required" })
        .email("Email is invalid"),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, "Password must be at least 6 characters"),
});
