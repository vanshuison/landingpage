import Link from 'next/link';
import { Shield, LayoutDashboard, FileText, Settings, User } from 'lucide-react';

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-slate-50 flex">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 hidden md:flex flex-col fixed inset-y-0 text-slate-900">
                <div className="h-16 flex items-center px-6 border-b border-slate-100">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-finure-900">
                        <Shield className="h-6 w-6 text-finure-600" />
                        <span>Finure.</span>
                    </div>
                </div>

                <nav className="flex-1 px-4 py-6 space-y-1">
                    <Link
                        href="/dashboard/escrows"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg bg-finure-50 text-finure-700"
                    >
                        <FileText className="h-5 w-5" />
                        Escrows
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <LayoutDashboard className="h-5 w-5" />
                        Overview
                    </Link>
                    <Link
                        href="#"
                        className="flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-lg text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                    >
                        <Settings className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>

                <div className="p-4 border-t border-slate-100">
                    <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
                            <User className="h-4 w-4" />
                        </div>
                        <div className="text-sm">
                            <p className="font-medium text-slate-900">Alice Buyer</p>
                            <p className="text-slate-500 text-xs">alice@example.com</p>
                        </div>
                    </div>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:pl-64">
                <div className="h-16 flex items-center justify-between px-8 bg-white border-b border-slate-200 md:hidden">
                    <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-finure-900">
                        <Shield className="h-6 w-6 text-finure-600" />
                        <span>Finure.</span>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
