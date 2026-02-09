import { getEscrowById } from "@/lib/mock-service";
import { notFound } from "next/navigation";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { EscrowTimeline } from "@/components/escrow/EscrowTimeline";
import { EscrowActions } from "@/components/escrow/EscrowActions";
import Link from "next/link";
import { ArrowLeft, User, ShieldCheck, Banknote } from "lucide-react";

export const dynamic = 'force-dynamic';

export default async function EscrowDetailPage({
    params,
}: {
    params: { id: string };
}) {
    const resolvedParams = await params;
    const escrow = await getEscrowById(resolvedParams.id);

    if (!escrow) {
        notFound();
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link
                    href="/dashboard/escrows"
                    className="p-2 -ml-2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" />
                </Link>
                <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                    Escrow Details
                </h1>
                <StatusBadge status={escrow.status} className="ml-2 text-sm px-3 py-1" />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column: Summary & Parties */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Summary Card */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <FileIcon className="w-5 h-5 text-slate-500" />
                            Overview
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div>
                                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Title</label>
                                <p className="text-slate-900 font-medium mt-1">{escrow.title}</p>
                            </div>
                            <div>
                                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Amount</label>
                                <p className="text-2xl font-bold text-finure-900 mt-1">
                                    {new Intl.NumberFormat('en-US', { style: 'currency', currency: escrow.currency }).format(escrow.amount)}
                                </p>
                            </div>
                            <div className="sm:col-span-2">
                                <label className="text-xs font-semibold uppercase text-slate-500 tracking-wide">Description</label>
                                <p className="text-slate-600 mt-1 text-sm leading-relaxed">
                                    {escrow.description || "No description provided."}
                                </p>
                            </div>
                        </div>

                        <hr className="my-6 border-slate-100" />

                        <h3 className="text-sm font-semibold text-slate-900 mb-3">Release Conditions</h3>
                        <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-700 leading-relaxed">
                            {escrow.releaseConditions || "Standard release conditions apply."}
                        </div>
                    </div>

                    {/* Parties Involved */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <User className="w-5 h-5 text-slate-500" />
                            Parties Involved
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                                <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Buyer</div>
                                <div className="font-medium text-slate-900">{escrow.buyer.name}</div>
                                <div className="text-sm text-slate-500">{escrow.buyer.email}</div>
                            </div>
                            <div className="p-4 rounded-lg border border-slate-200 bg-slate-50/50">
                                <div className="text-xs font-semibold uppercase text-slate-500 mb-1">Seller</div>
                                <div className="font-medium text-slate-900">{escrow.seller.name}</div>
                                <div className="text-sm text-slate-500">{escrow.seller.email}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Column: Timeline & Actions */}
                <div className="space-y-6">

                    {/* Actions */}
                    <div className="bg-white p-6 rounded-xl border border-finure-200 shadow-sm border-t-4 border-t-finure-500">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5 text-finure-600" />
                            Actions
                        </h2>
                        <EscrowActions escrow={escrow} />
                        <p className="text-xs text-slate-400 mt-4 text-center">
                            Actions are secured and logged on-chain.
                        </p>
                    </div>

                    {/* Timeline */}
                    <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                        <h2 className="text-lg font-semibold text-slate-900 mb-6">Timeline</h2>
                        <EscrowTimeline
                            status={escrow.status}
                            createdAt={escrow.createdAt}
                            updatedAt={escrow.updatedAt}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}

function FileIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
            <polyline points="14 2 14 8 20 8" />
        </svg>
    )
}
