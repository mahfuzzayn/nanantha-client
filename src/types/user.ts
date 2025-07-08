import { JwtPayload } from "jwt-decode";

export interface IUser {
    _id: string;
    name: string;
    email: string;
    profileUrl: string;
    password: string;
    passwordChangedAt?: Date;
    location: string;
    role: "user" | "admin";
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface CustomJwtPayload extends JwtPayload {
    role?: string;
}
