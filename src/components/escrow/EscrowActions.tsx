"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Escrow, EscrowActionType, User } from "@/types";
import { performEscrowAction, getCurrentUser } from "@/lib/mock-service";
import { Loader2, AlertTriangle } from "lucide-react";

interface ActionButtonProps {
    label: string;
    onClick: () => void;
    variant?: "primary" | "secondary" | "danger";
    disabled?: boolean;
    loading?: boolean;
}

function ActionButton({ label, onClick, variant = "primary", disabled, loading }: ActionButtonProps) {
    const baseClasses = "inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg transition-colors focus:ring-2 focus:ring-offset-1 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
        primary: "bg-finure-600 hover:bg-finure-700 text-white focus:ring-finure-500",
        secondary: "bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 focus:ring-slate-400",
        danger: "bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 focus:ring-red-500",
    };

    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`${baseClasses} ${variants[variant]}`}
        >
            {loading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {label}
        </button>
    );
}

export function EscrowActions({ escrow }: { escrow: Escrow }) {
    const [loading, setLoading] = useState<EscrowActionType | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const router = useRouter();

    useEffect(() => {
        // In a real app, this would come from a session context or prop
        getCurrentUser().then(setCurrentUser);
    }, []);

    const handleAction = async (action: EscrowActionType) => {
        setLoading(action);
        const result = await performEscrowAction(escrow.id, action);

        if (result.success) {
            router.refresh();
        } else {
            alert(result.error);
        }
        setLoading(null);
    };

    if (!currentUser) return <div className="animate-pulse h-10 w-32 bg-slate-100 rounded"></div>;

    const status = escrow.status;
    const isBuyer = currentUser.id === escrow.buyer.id;
    const isSeller = currentUser.id === escrow.seller.id;

    // Strict Role-Based UI Rendering
    return (
        <div className="flex flex-wrap gap-3">

            {/* BUYER ACTIONS */}
            {isBuyer && status === "created" && (
                <>
                    <ActionButton
                        label="Fund Escrow"
                        onClick={() => handleAction("fund")}
                        loading={loading === "fund"}
                    />
                    <ActionButton
                        label="Cancel Escrow"
                        variant="danger"
                        onClick={() => handleAction("cancel")}
                        loading={loading === "cancel"}
                    />
                </>
            )}

            {isBuyer && status === "completed" && (
                <>
                    <ActionButton
                        label="Release Funds"
                        onClick={() => handleAction("release")}
                        loading={loading === "release"}
                    />
                    <ActionButton
                        label="Raise Dispute"
                        variant="danger"
                        onClick={() => handleAction("dispute")}
                        loading={loading === "dispute"}
                    />
                </>
            )}

            {(isBuyer && (status === "funded" || status === "in_progress")) && (
                <ActionButton
                    label="Raise Dispute"
                    variant="danger"
                    onClick={() => handleAction("dispute")}
                    loading={loading === "dispute"}
                />
            )}

            {/* SELLER ACTIONS */}
            {isSeller && (status === "funded" || status === "in_progress") && (
                <>
                    <ActionButton
                        label="Mark Work Complete"
                        onClick={() => handleAction("complete_work")}
                        loading={loading === "complete_work"}
                    />
                    <ActionButton
                        label="Raise Dispute"
                        variant="danger"
                        onClick={() => handleAction("dispute")}
                        loading={loading === "dispute"}
                    />
                </>
            )}

            {isSeller && status === "completed" && (
                <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-3 py-2 rounded-lg border border-amber-100 text-sm">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Waiting for buyer to release funds...
                </div>
            )}

            {/* SHARED / LOCKED STATES */}
            {status === "released" && (
                <div className="text-sm text-green-600 font-medium px-3 py-2 bg-green-50 border border-green-100 rounded-lg">
                    Funds released. Transaction complete.
                </div>
            )}

            {status === "cancelled" && (
                <div className="text-sm text-slate-500 font-medium px-3 py-2 bg-slate-50 border border-slate-100 rounded-lg">
                    This escrow was cancelled.
                </div>
            )}

            {status === "disputed" && (
                <div className="flex items-center gap-2 text-red-600 font-medium px-3 py-2 bg-red-50 border border-red-100 rounded-lg">
                    <AlertTriangle className="w-4 h-4" />
                    Dispute open. Mediation in progress.
                </div>
            )}

        </div>
    );
}
