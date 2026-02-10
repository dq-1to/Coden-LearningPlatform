import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { PtContextType, PtEvent } from '../types';

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
    const [pt, setPt] = useState<number>(() => {
        const saved = localStorage.getItem(PT_STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved).pt || 0;
            } catch {
                return 0;
            }
        }
        return 0;
    });

    const [ptHistory, setPtHistory] = useState<PtEvent[]>(() => {
        const saved = localStorage.getItem(PT_STORAGE_KEY);
        if (saved) {
            try {
                return JSON.parse(saved).history || [];
            } catch {
                return [];
            }
        }
        return [];
    });

    useEffect(() => {
        localStorage.setItem(PT_STORAGE_KEY, JSON.stringify({
            pt,
            history: ptHistory.slice(-50) // 直近50件のみ保存
        }));
    }, [pt, ptHistory]);

    const addPt = (amount: number, reason: string) => {
        setPt(prev => prev + amount);
        setPtHistory(prev => [...prev, {
            amount,
            reason,
            timestamp: new Date().toISOString()
        }]);
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
