"use client"

import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toastStyles } from "@/constants";
import {
    changeOrderStatusByUser,
} from "@/services/order";
import {
    IStatus,
    StatusActionName,
    validUserStatusTransitions,
} from "@/types";
import React from "react";
import { toast } from "sonner";
import "./ChangeStatusByUser.css";

const ChangeStatusByUser = ({
    orderId,
    status,
}: {
    orderId: string;
    status: IStatus;
}) => {
    const currentStatus = status as IStatus;

    const userAllowedOptions = validUserStatusTransitions[currentStatus] || [];

    const handleCancelOrder = async () => {
        const toastId = toast.loading("Cancelling order...", {
            style: toastStyles.success,
        });

        try {
            const res = await changeOrderStatusByUser(orderId);

            if (res.success) {
                toast.success(res.message, {
                    id: toastId,
                    style: toastStyles.success,
                });
            } else {
                toast.error(res.message, {
                    id: toastId,
                    style: toastStyles.error,
                });
            }
        } catch (error) {
            toast.error("Failed to cancel the order", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }
    };

    return (
        <Select onValueChange={() => handleCancelOrder()}>
            <SelectTrigger className="select-trigger bg-destructive !text-white w-[180px] cursor-pointer">
                <SelectValue placeholder="Change Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Statuses</SelectLabel>
                    {userAllowedOptions.length > 0 ? (
                        userAllowedOptions.map((status) => (
                            <SelectItem
                                key={status}
                                value={status as string}
                                className="cursor-pointer"
                            >
                                {StatusActionName[status]}
                            </SelectItem>
                        ))
                    ) : (
                        <SelectItem disabled value="no-transition">
                            No transitions available
                        </SelectItem>
                    )}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default ChangeStatusByUser;
