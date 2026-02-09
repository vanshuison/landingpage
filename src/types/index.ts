export type EscrowStatus =
    | 'created'
    | 'funded'
    | 'in_progress'
    | 'completed'
    | 'released'
    | 'cancelled'
    | 'disputed';

export type EscrowRole = 'buyer' | 'seller';

export interface User {
    id: string;
    name: string;
    email: string;
    role: EscrowRole; // Simplified for this context
}

export interface Escrow {
    id: string;
    title: string;
    description?: string;
    amount: number;
    currency: string;
    status: EscrowStatus;
    buyer: User;
    seller: User;
    createdAt: string; // ISO date string
    updatedAt: string;
    releaseConditions?: string;
    notes?: string;
}

export type EscrowFilter = {
    status?: EscrowStatus | 'all';
    role?: EscrowRole | 'all';
};

export type EscrowActionType = 'fund' | 'complete_work' | 'release' | 'dispute' | 'cancel';
