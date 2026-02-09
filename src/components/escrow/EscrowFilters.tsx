"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { cn } from "@/lib/utils";
import { EscrowStatus } from "@/types";

const STATUS_FILTERS: { label: string; value: EscrowStatus | "all" }[] = [
    { label: "All", value: "all" },
    { label: "Created", value: "created" },
    { label: "Funded", value: "funded" },
    { label: "In Progress", value: "in_progress" },
    { label: "Completed", value: "completed" },
    { label: "Released", value: "released" },
    { label: "Disputed", value: "disputed" },
    { label: "Cancelled", value: "cancelled" },
];

export function EscrowFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentStatus = searchParams.get("status") || "all";

    const createQueryString = useCallback(
        (name: string, value: string) => {
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            return params.toString();
        },
        [searchParams]
    );

    const handleStatusChange = (status: string) => {
        router.push(`?${createQueryString("status", status)}`);
    };

    return (
        <div className="flex flex-wrap items-center gap-2 mb-6">
            <span className="text-sm text-slate-500 font-medium mr-2">Status:</span>
            {STATUS_FILTERS.map((filter) => (
                <button
                    key={filter.value}
                    onClick={() => handleStatusChange(filter.value)}
                    className={cn(
                        "px-3 py-1.5 text-sm font-medium rounded-full transition-colors border",
                        currentStatus === filter.value
                            ? "bg-finure-100 text-finure-700 border-finure-200"
                            : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:text-slate-900"
                    )}
                >
                    {filter.label}
                </button>
            ))}
        </div>
    );
}
