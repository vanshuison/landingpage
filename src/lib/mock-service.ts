import { Escrow, EscrowStatus, EscrowActionType, User } from '@/types';

// Mock Data
const MOCK_USERS = {
    buyer1: { id: 'u1', name: 'Alice Buyer', email: 'alice@example.com', role: 'buyer' as const },
    seller1: { id: 'u2', name: 'Bob Seller', email: 'bob@example.com', role: 'seller' as const },
};

// SIMULATED AUTH STATE: Change this to 'buyer1' or 'seller1' to test different roles
const CURRENT_USER_ID: 'u1' | 'u2' = 'u1';

const INITIAL_ESCROWS: Escrow[] = [
    {
        id: 'esc_12345',
        title: 'Website Development',
        amount: 5000,
        currency: 'USD',
        status: 'created',
        buyer: MOCK_USERS.buyer1,
        seller: MOCK_USERS.seller1,
        createdAt: new Date(Date.now() - 86400000 * 2).toISOString(), // 2 days ago
        updatedAt: new Date(Date.now() - 86400000 * 2).toISOString(),
        releaseConditions: 'Escrow released upon deployment to production and verified by buyer.',
    },
    {
        id: 'esc_67890',
        title: 'Marketing Campaign',
        amount: 1200,
        currency: 'USD',
        status: 'funded',
        buyer: MOCK_USERS.buyer1,
        seller: MOCK_USERS.seller1,
        createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 1).toISOString(),
    },
    {
        id: 'esc_54321',
        title: 'Logo Design',
        amount: 300,
        currency: 'USD',
        status: 'completed',
        buyer: MOCK_USERS.buyer1,
        seller: MOCK_USERS.seller1,
        createdAt: new Date(Date.now() - 86400000 * 10).toISOString(),
        updatedAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    },
];

// Simulating database
let escrowsStore = [...INITIAL_ESCROWS];

/**
 * Returns the currently simulated logged-in user.
 */
export async function getCurrentUser(): Promise<User> {
    await new Promise((resolve) => setTimeout(resolve, 100));
    return CURRENT_USER_ID === 'u1' ? MOCK_USERS.buyer1 : MOCK_USERS.seller1;
}

export async function getEscrows(statusFilter?: string, roleFilter?: string): Promise<Escrow[]> {
    await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate latency

    const currentUser = await getCurrentUser();

    // 1. Filter by Current User Ownership (Security Rule)
    let filtered = escrowsStore.filter(e => e.buyer.id === currentUser.id || e.seller.id === currentUser.id);

    // 2. Apply Status Filter
    if (statusFilter && statusFilter !== 'all') {
        filtered = filtered.filter(e => e.status === statusFilter);
    }

    // 3. Apply Role Filter (Are they acting as Buyer or Seller in this specific escrow?)
    if (roleFilter && roleFilter !== 'all') {
        filtered = filtered.filter(e => {
            if (roleFilter === 'buyer') return e.buyer.id === currentUser.id;
            if (roleFilter === 'seller') return e.seller.id === currentUser.id;
            return true;
        });
    }

    return filtered;
}

export async function getEscrowById(id: string): Promise<Escrow | null> {
    await new Promise((resolve) => setTimeout(resolve, 300));
    const escrow = escrowsStore.find(e => e.id === id);
    if (!escrow) return null;

    // Security Check: Is current user part of this escrow?
    const currentUser = await getCurrentUser();
    if (escrow.buyer.id !== currentUser.id && escrow.seller.id !== currentUser.id) {
        return null; // or throw forbidden
    }

    return escrow;
}

export async function performEscrowAction(id: string, action: EscrowActionType): Promise<{ success: boolean; newStatus?: EscrowStatus; error?: string }> {
    await new Promise((resolve) => setTimeout(resolve, 800));

    const currentUser = await getCurrentUser();
    const escrowIndex = escrowsStore.findIndex(e => e.id === id);
    if (escrowIndex === -1) return { success: false, error: 'Escrow not found' };

    const escrow = escrowsStore[escrowIndex];

    // Security: Verify user is part of escrow
    if (escrow.buyer.id !== currentUser.id && escrow.seller.id !== currentUser.id) {
        return { success: false, error: 'Unauthorized' };
    }

    let newStatus: EscrowStatus = escrow.status;
    let error: string | undefined;

    // Strict Role-Based State Machine
    switch (action) {
        case 'fund':
            // Only Buyer can fund
            if (currentUser.id !== escrow.buyer.id) return { success: false, error: 'Only the buyer can fund the escrow.' };
            if (escrow.status === 'created') newStatus = 'funded';
            else error = 'Invalid action for current status';
            break;

        case 'complete_work':
            // Only Seller can mark complete
            if (currentUser.id !== escrow.seller.id) return { success: false, error: 'Only the seller can mark work as complete.' };
            if (escrow.status === 'funded' || escrow.status === 'in_progress') newStatus = 'completed';
            else error = 'Invalid action for current status';
            break;

        case 'release':
            // Only Buyer can release funds
            if (currentUser.id !== escrow.buyer.id) return { success: false, error: 'Only the buyer can release funds.' };
            if (escrow.status === 'completed') newStatus = 'released';
            else error = 'Invalid action for current status';
            break;

        case 'dispute':
            // Both can dispute, but only in active states
            if (['funded', 'in_progress', 'completed'].includes(escrow.status)) newStatus = 'disputed';
            else error = 'Invalid action for current status';
            break;

        case 'cancel':
            // Only Buyer can cancel, and only before funding
            if (currentUser.id !== escrow.buyer.id) return { success: false, error: 'Only the buyer can cancel.' };
            if (escrow.status === 'created') newStatus = 'cancelled';
            else error = 'Cannot cancel after funding';
            break;

        default:
            error = 'Unknown action';
    }

    if (error) {
        return { success: false, error };
    }

    escrowsStore[escrowIndex] = { ...escrow, status: newStatus, updatedAt: new Date().toISOString() };
    return { success: true, newStatus };
}
