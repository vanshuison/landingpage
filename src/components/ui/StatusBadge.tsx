import { EscrowStatus } from "@/types";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
    status: EscrowStatus;
    className?: string;
}

const statusStyles: Record<EscrowStatus, string> = {
    created: "bg-slate-100 text-slate-700 border-slate-200",
    funded: "bg-finure-100 text-finure-700 border-finure-200",
    in_progress: "bg-blue-50 text-blue-700 border-blue-200",
    completed: "bg-indigo-50 text-indigo-700 border-indigo-200",
    released: "bg-emerald-50 text-emerald-700 border-emerald-200",
    cancelled: "bg-gray-100 text-gray-500 border-gray-200 line-through",
    disputed: "bg-red-50 text-red-700 border-red-200",
};

const statusLabels: Record<EscrowStatus, string> = {
    created: "Created",
    funded: "Funded",
    in_progress: "In Progress",
    completed: "Completed",
    released: "Released",
    cancelled: "Cancelled",
    disputed: "Disputed",
};

export function StatusBadge({ status, className }: StatusBadgeProps) {
    return (
        <span
            className={cn(
                "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
                statusStyles[status],
                className
            )}
        >
            {statusLabels[status]}
        </span>
    );
}
