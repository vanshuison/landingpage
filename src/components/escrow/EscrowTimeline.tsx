import { EscrowStatus } from "@/types";
import { cn } from "@/lib/utils";
import { Check, Circle, Clock } from "lucide-react";

interface TimelineProps {
    status: EscrowStatus;
    createdAt: string;
    updatedAt: string;
}

const STEPS: { id: EscrowStatus; label: string }[] = [
    { id: "created", label: "Created" },
    { id: "funded", label: "Funded" },
    { id: "in_progress", label: "In Progress" },
    { id: "completed", label: "Completed" },
    { id: "released", label: "Released" },
];

export function EscrowTimeline({ status }: TimelineProps) {
    // Determine current step index
    const currentStepIndex = STEPS.findIndex((s) => s.id === status);
    const isCancelled = status === "cancelled";
    const isDisputed = status === "disputed";

    // If cancelled or disputed, we might want to show a different view, 
    // but for now let's just show the steps up to where it was.

    return (
        <div className="relative">
            <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-slate-100" />
            <div className="space-y-8 relative">
                {STEPS.map((step, index) => {
                    let state: "upcoming" | "current" | "complete" | "error" = "upcoming";

                    if (index < currentStepIndex) state = "complete";
                    else if (index === currentStepIndex) state = "current";

                    // If final state is released, everything matches
                    if (status === "released") state = "complete";

                    // Handle Divergent States
                    if (isCancelled) {
                        if (index === 0) state = "complete"; // Created happened
                        else if (step.id === "cancelled") state = "error"; // Show cancelled step if we had one, but we don't in generic list
                        else state = "upcoming";
                    }

                    if (isDisputed) {
                        // Dispute freezes progress at current step
                        if (index < currentStepIndex) state = "complete";
                        else if (index === currentStepIndex) state = "error"; // Mark current step as problematic
                        else state = "upcoming";
                    }

                    return (
                        <div key={step.id} className="flex gap-4 items-start">
                            <div
                                className={cn(
                                    "relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 transition-colors bg-white",
                                    state === "complete"
                                        ? "border-finure-600 bg-finure-50 text-finure-600"
                                        : state === "current"
                                            ? "border-finure-600 text-finure-600"
                                            : state === "error"
                                                ? "border-amber-500 text-amber-600 bg-amber-50"
                                                : "border-slate-200 text-slate-300"
                                )}
                            >
                                {state === "complete" ? (
                                    <Check className="w-4 h-4" />
                                ) : state === "current" ? (
                                    <Clock className="w-4 h-4" />
                                ) : state === "error" ? (
                                    <div className="w-2 h-2 rounded-full bg-amber-500" />
                                ) : (
                                    <Circle className="w-4 h-4" />
                                )}
                            </div>
                            <div className="pt-1">
                                <p
                                    className={cn(
                                        "text-sm font-medium",
                                        state === "upcoming" ? "text-slate-400" : "text-slate-900",
                                        state === "error" && "text-amber-700"
                                    )}
                                >
                                    {step.label}
                                </p>
                                {state === "current" && !isDisputed && (
                                    <p className="text-xs text-slate-500 mt-1">Current Status</p>
                                )}
                                {state === "error" && isDisputed && (
                                    <p className="text-xs text-amber-600 mt-1 font-medium">Processing Halted (Dispute)</p>
                                )}
                            </div>
                        </div>
                    );
                })}

                {(isCancelled || isDisputed) && (
                    <div className="flex gap-4 items-start pt-2">
                        <div className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center border-2 border-red-500 bg-red-50 text-red-600 shadow-sm">
                            <span className="text-sm font-bold">!</span>
                        </div>
                        <div className="pt-1">
                            <p className="text-sm font-bold text-red-700">
                                {isDisputed ? "Escrow Disputed" : "Escrow Cancelled"}
                            </p>
                            <p className="text-xs text-red-600mt-1">
                                {isDisputed ? "Mediation team has been notified." : "This transaction has been terminated."}
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
