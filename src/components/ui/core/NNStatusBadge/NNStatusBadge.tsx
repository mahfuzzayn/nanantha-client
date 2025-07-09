import { IStatus, StatusDisplayName } from "@/types";

export const StatusColorMap: Record<IStatus, string> = {
    [IStatus.PENDING_FOR_PAYMENT]:
        "bg-gray-300 hover:bg-gray-500 text-gray-600 hover:text-white",
    [IStatus.APPROVED]:
        "bg-violet-300 hover:bg-violet-500 text-violet-600 hover:text-white",
    [IStatus.CANCELLED_BY_ADMIN]:
        "bg-red-300 hover:bg-red-500 text-red-600 hover:text-white",
    [IStatus.CANCELLED_BY_USER]:
        "bg-red-300 hover:bg-red-500 text-red-600 hover:text-white",
    [IStatus.SHIPPED]:
        "bg-green-300 hover:bg-green-500 text-green-600 hover:text-white",
    [IStatus.DELIVERED]:
        "bg-blue-300 hover:bg-blue-500 text-blue-600 hover:text-white",
};

export const NNStatusBadge = ({ status }: { status: IStatus }) => {
    const colorClass = StatusColorMap[status];

    return (
        <span
            className={`cursor-pointer px-2 py-1 text-xs rounded-md ${colorClass}`}
        >
            {StatusDisplayName[status]}
        </span>
    );
};
