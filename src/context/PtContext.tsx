import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PtContextType, PtEvent } from '../types';
import { useAuth } from '../hooks/useAuth';
import { pointService } from '../services/pointService';

const PT_STORAGE_KEY = 'learning-pt';

// Pt獲得量の定義
export const PT_REWARDS = {
    CORRECT_ANSWER: 10,      // 正解時
    STEP_COMPLETE: 50,       // ステップ完了時
    FIRST_TRY: 20,           // 一発正解ボーナス
    STREAK_BONUS: 5,         // 連続正解ボーナス
    DAILY_GOAL: 100,         // 日課達成
};

const PtContext = createContext<PtContextType | undefined>(undefined);

interface PtProviderProps {
    children: ReactNode;
}

export function PtProvider({ children }: PtProviderProps) {
    const { user } = useAuth();
    const [pt, setPt] = useState<number>(0);
    const [ptHistory, setPtHistory] = useState<PtEvent[]>([]);

    // Fetch initial data
    useEffect(() => {
        if (!user) {
            setPt(0);
            setPtHistory([]);
            return;
        }

        const loadData = async () => {
            const [totalPt, history] = await Promise.all([
                pointService.getPt(user.id),
                pointService.getHistory(user.id)
            ]);
            setPt(totalPt);
            setPtHistory(history);
        };
        loadData();
    }, [user]);

    const addPt = async (amount: number, reason: string) => {
        // Optimistic update
        setPt(prev => prev + amount);
        const newEvent = {
            amount,
            reason,
            timestamp: new Date().toISOString()
        };
        setPtHistory(prev => [newEvent, ...prev]);

        if (user) {
            await pointService.addPt(user.id, amount, reason);
        }
    };

    return (
        <PtContext.Provider value={{ pt, addPt, ptHistory }}>
            {children}
        </PtContext.Provider>
    );
}

export function usePt() {
    const context = useContext(PtContext);
    if (!context) {
        throw new Error('usePt must be used within PtProvider');
    }
    return context;
}
