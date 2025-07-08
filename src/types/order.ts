import { IUser } from "./user";

export interface IOrder {
    _id: string;
    mollieId: string;
    user: IUser;
    items: IOrderItem[];
    amount: number;
    status: TOrderStatus;
    paymentId: string;
    paymentStatus: IPaymentStatus;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface IOrderItem {
    productId: string;
    title: string;
    author: string;
    image: string;
    price: number;
    quantity: number;
    totalPrice: number;
    _id: string;
}

export type TOrderStatus =
    | "pending_for_payment"
    | "approved"
    | "cancelled_by_user"
    | "cancelled_by_admin"
    | "shipped"
    | "delivered";

export enum IStatus {
    PENDING_FOR_PAYMENT = "pending_for_payment", // Default
    APPROVED = "approved", // System 1
    CANCELLED_BY_USER = "cancelled_by_user", // User 1
    CANCELLED_BY_ADMIN = "cancelled_by_admin", // Admin 1
    SHIPPED = "shipped", // Admin 2
    DELIVERED = "delivered", // Admin 3
}

export enum IStatusForAdmin {
    CANCELLED_BY_ADMIN = "cancelled_by_admin", // Admin 1
    SHIPPED = "shipped", // Admin 2
    DELIVERED = "delivered", // Admin 3
}

export enum IStatusForStudent {
    CANCELLED_BY_USER = "cancelled_by_user", // User 1
}

export enum IPaymentStatus {
    PENDING_FOR_PAYMENT = "pending",
    CANCELLED = "cancelled",
    PAID = "paid",
}

export const StatusDisplayName: Record<IStatus, string> = {
    [IStatus.PENDING_FOR_PAYMENT]: "Pending for Payment",
    [IStatus.APPROVED]: "Approved",
    [IStatus.CANCELLED_BY_USER]: "Cancelled by User",
    [IStatus.CANCELLED_BY_ADMIN]: "Cancelled by Admin",
    [IStatus.SHIPPED]: "Shipped",
    [IStatus.DELIVERED]: "Delivered",
};

export const StatusActionName: Record<IStatus, string> = {
    [IStatus.PENDING_FOR_PAYMENT]: "Pending for Payment",
    [IStatus.APPROVED]: "Approve",
    [IStatus.CANCELLED_BY_ADMIN]: "Cancel",
    [IStatus.CANCELLED_BY_USER]: "Cancel",
    [IStatus.SHIPPED]: "Shipped",
    [IStatus.DELIVERED]: "Delivered",
};

export const PaymentStatusDisplayName: Record<IPaymentStatus, string> = {
    [IPaymentStatus.PENDING_FOR_PAYMENT]: "Pending",
    [IPaymentStatus.CANCELLED]: "Cancelled",
    [IPaymentStatus.PAID]: "Paid",
};

export const validStatusTransitions: Record<IStatus, IStatus[]> = {
    [IStatus.PENDING_FOR_PAYMENT]: [IStatus.APPROVED, IStatus.CANCELLED_BY_USER],
    [IStatus.APPROVED]: [IStatus.SHIPPED, IStatus.CANCELLED_BY_ADMIN],
    [IStatus.SHIPPED]: [IStatus.DELIVERED],
    [IStatus.DELIVERED]: [],
    [IStatus.CANCELLED_BY_USER]: [],
    [IStatus.CANCELLED_BY_ADMIN]: [],
};
