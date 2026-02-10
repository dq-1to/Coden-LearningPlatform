import { supabase } from '../lib/supabase';
import { PtEvent } from '../types';

export const pointService = {
    async getPt(userId: string): Promise<number> {
        const { data, error } = await supabase
            .from('profiles')
            .select('total_pt')
            .eq('id', userId)
            .single();

        if (error) {
            console.error('Error fetching pt:', error);
            return 0;
        }
        return data.total_pt;
    },

    async getHistory(userId: string): Promise<PtEvent[]> {
        const { data, error } = await supabase
            .from('point_history')
            .select('amount, reason, created_at')
            .eq('user_id', userId)
            .order('created_at', { ascending: false })
            .limit(50); // Same limit as local storage version

        if (error) {
            console.error('Error fetching pt history:', error);
            return [];
        }

        return data.map((h) => ({
            amount: h.amount,
            reason: h.reason,
            timestamp: h.created_at,
        }));
    },

    async addPt(userId: string, amount: number, reason: string) {
        // 1. Log history
        const { error: historyError } = await supabase
            .from('point_history')
            .insert({
                user_id: userId,
                amount,
                reason,
            });

        if (historyError) {
            console.error('Error adding pt history:', historyError);
            return;
        }

        // 2. Increment profile pt using RPC
        const { error: rpcError } = await supabase
            .rpc('increment_pt', { amount });

        if (rpcError) {
            console.error('Error incrementing pt:', rpcError);
        }
    },
};
