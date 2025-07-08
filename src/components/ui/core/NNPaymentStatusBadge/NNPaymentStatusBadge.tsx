import { IPaymentStatus, PaymentStatusDisplayName } from "@/types";

export const StatusColorMap: Record<IPaymentStatus, string> = {
    [IPaymentStatus.PENDING_FOR_PAYMENT]:
        "bg-yellow-200 text-yellow-800 hover:bg-yellow-800 border-yellow-400 hover:text-white transition-all",
    [IPaymentStatus.CANCELLED]:
        "bg-red-200 text-red-800 hover:bg-red-800 border-red-400 hover:text-white transition-all",
    [IPaymentStatus.PAID]:
        "bg-green-200 text-green-800 hover:bg-green-800 border-green-400 hover:text-white transition-all",
};

export const NNPaymentStatusBadge = ({
    status,
}: {
    status: IPaymentStatus;
}) => {
    const colorClass = StatusColorMap[status];
    return (
        <div
            className={`cursor-pointer px-2 py-1 text-xs rounded-md ${colorClass}`}
        >
            {PaymentStatusDisplayName[status]}
        </div>
    );
};
