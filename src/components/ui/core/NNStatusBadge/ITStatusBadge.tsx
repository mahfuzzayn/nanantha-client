import { IStatus, StatusDisplayName } from "@/types";

export const StatusColorMap: Record<IStatus, string> = {
    [IStatus.PENDING_APPROVAL]:
        "bg-gray-300 hover:bg-gray-500 text-gray-600 hover:text-white",
    [IStatus.WAITING_FOR_PAYMENT]:
        "bg-yellow-300 hover:bg-yellow-500 text-yellow-600 hover:text-white",
    [IStatus.CONFIRMED]:
        "bg-green-300 hover:bg-green-500 text-green-600 hover:text-white",
    [IStatus.CANCELED_BY_TUTOR]:
        "bg-red-300 hover:bg-red-500 text-red-600 hover:text-white",
    [IStatus.CANCELED_BY_STUDENT]:
        "bg-red-300 hover:bg-red-500 text-red-600 hover:text-white",
    [IStatus.COMPLETED]:
        "bg-blue-300 hover:bg-blue-500 text-blue-600 hover:text-white",
};

export const ITStatusBadge = ({ status }: { status: IStatus }) => {
    const colorClass = StatusColorMap[status];

    return (
        <div className={`cursor-pointer px-2 py-1 text-xs rounded-md ${colorClass}`}>
            {StatusDisplayName[status]}
        </div>
    );
};
