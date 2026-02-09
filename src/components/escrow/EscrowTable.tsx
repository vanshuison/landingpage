"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";
import { Escrow, User } from "@/types";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getCurrentUser } from "@/lib/mock-service";

const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat('en-US', { dateStyle: 'medium' }).format(new Date(dateString));
};

interface EscrowTableProps {
    escrows: Escrow[];
}

export function EscrowTable({ escrows }: EscrowTableProps) {
    const [currentUser, setCurrentUser] = useState<User | null>(null);

    useEffect(() => {
        getCurrentUser().then(setCurrentUser);
    }, []);

    if (!currentUser) return <div className="p-12 text-center text-slate-400">Loading user context...</div>;

    return (
        <div className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
                <table className="w-full text-left text-sm text-slate-600">
                    <thead className="bg-slate-50 text-xs uppercase font-semibold text-slate-500 border-b border-slate-200">
                        <tr>
                            <th className="px-6 py-4">Escrow ID</th>
                            <th className="px-6 py-4">Title</th>
                            <th className="px-6 py-4">Counterparty</th>
                            <th className="px-6 py-4 text-right">Amount</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Created</th>
                            <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {escrows.length === 0 ? (
                            <tr>
                                <td colSpan={7} className="px-6 py-12 text-center text-slate-400">
                                    No escrows found.
                                </td>
                            </tr>
                        ) : (
                            escrows.map((escrow) => {
                                const isBuyer = currentUser.id === escrow.buyer.id;
                                const counterpartyName = isBuyer ? escrow.seller.name : escrow.buyer.name;
                                const counterpartyRole = isBuyer ? "Seller" : "Buyer";

                                return (
                                    <tr key={escrow.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 font-medium text-slate-900">
                                            {escrow.id}
                                        </td>
                                        <td className="px-6 py-4 text-slate-900 font-medium">
                                            {escrow.title}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-medium text-slate-900">{counterpartyName}</span>
                                                <span className="text-xs text-slate-500">{counterpartyRole}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right font-medium text-slate-900">
                                            {new Intl.NumberFormat('en-US', { style: 'currency', currency: escrow.currency }).format(escrow.amount)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusBadge status={escrow.status} />
                                        </td>
                                        <td className="px-6 py-4">
                                            {formatDate(escrow.createdAt)}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <Link
                                                href={`/dashboard/escrows/${escrow.id}`}
                                                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-finure-700 bg-finure-50 rounded-md hover:bg-finure-100 transition-colors border border-finure-200"
                                            >
                                                <Eye className="h-3.5 w-3.5" />
                                                View
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
