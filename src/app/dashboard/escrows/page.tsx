import { EscrowFilters } from "@/components/escrow/EscrowFilters";
import { EscrowTable } from "@/components/escrow/EscrowTable";
import { getEscrows } from "@/lib/mock-service";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default async function EscrowsPage({
    searchParams,
}: {
    searchParams: Record<string, string | string[] | undefined>;
}) {
    const params = await searchParams;
    const statusFilter = typeof params?.status === 'string' ? params.status : 'all';
    const roleFilter = typeof params?.role === 'string' ? params.role : 'all';

    const escrows = await getEscrows(statusFilter, roleFilter);

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-finure-900 tracking-tight">Escrows</h1>
                    <p className="text-slate-500 mt-1">Track and manage your secure payments</p>
                </div>
                <Link
                    href="#"
                    className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-finure-600 hover:bg-finure-700 text-white text-sm font-medium rounded-lg shadow-sm transition-colors"
                >
                    <Plus className="h-4 w-4" />
                    Create Escrow
                </Link>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
                <Suspense fallback={<div>Loading filters...</div>}>
                    <EscrowFilters />
                </Suspense>

                <Suspense fallback={<div className="text-center py-12 text-slate-500">Loading escrows...</div>}>
                    <EscrowTable escrows={escrows} />
                </Suspense>
            </div>
        </div>
    );
}
