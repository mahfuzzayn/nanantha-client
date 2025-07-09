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
import { changeOrderStatusByAdmin } from "@/services/order";
import {
    IStatus,
    StatusActionName,
    validAdminStatusTransitions,
} from "@/types";
import React from "react";
import { toast } from "sonner";
import "./ChangeStatusByAdmin.css";

const ChangeStatusByAdmin = ({
    orderId,
    status,
}: {
    orderId: string;
    status: IStatus;
}) => {
    const currentStatus = status as IStatus;

    const adminAllowedOptions = validAdminStatusTransitions[currentStatus] || [];

    const handleStatusChange = async (status: IStatus) => {
        const toastId = toast.loading("Changing order status...", {
            style: toastStyles.success,
        });

        try {
            const statusData = { status };

            const res = await changeOrderStatusByAdmin(orderId, statusData);

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
            toast.error("Failed to change the status", {
                id: toastId,
                style: toastStyles.error,
            });

            console.error(error);
        }
    };

    return (
        <Select
            onValueChange={(status) => handleStatusChange(status as IStatus)}
        >
            <SelectTrigger className="select-trigger bg-destructive !text-white w-[180px] cursor-pointer">
                <SelectValue placeholder="Change Status" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Statuses</SelectLabel>
                    {adminAllowedOptions.length > 0 ? (
                        adminAllowedOptions.map((status) => (
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

export default ChangeStatusByAdmin;
