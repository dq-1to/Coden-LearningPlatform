import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { XPContextType, XPEvent } from '../types';

const XP_STORAGE_KEY = 'learning-xp';

// XP獲得量の定義
export const XP_REWARDS = {
    CORRECT_ANSWER: 10,
    STEP_COMPLETE: 50,
    COURSE_COMPLETE: 200,
    STREAK_BONUS: 20,
    FIRST_STEP: 30,
    PERFECT_TEST: 100
};

const XPContext = createContext<XPContextType | undefined>(undefined);

interface XPProviderProps {
    children: ReactNode;
}

export function XPProvider({ children }: XPProviderProps) {
    const [xp, setXP] = useState<number>(() => {
        const saved = localStorage.getItem(XP_STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            return data.xp || 0;
        }
        return 0;
    });

    const [xpHistory, setXPHistory] = useState<XPEvent[]>(() => {
        const saved = localStorage.getItem(XP_STORAGE_KEY);
        if (saved) {
            const data = JSON.parse(saved);
            return data.history || [];
        }
        return [];
    });

    // 保存
    useEffect(() => {
        localStorage.setItem(XP_STORAGE_KEY, JSON.stringify({
            xp,
            history: xpHistory.slice(-50) // 最新50件のみ保持
        }));
    }, [xp, xpHistory]);

    const addXP = (amount: number, reason: string) => {
        setXP(prev => prev + amount);
        setXPHistory(prev => [...prev, {
            amount,
            reason,
            timestamp: new Date().toISOString()
        }]);
    };

    return (
        <XPContext.Provider value={{ xp, addXP, xpHistory }}>
            {children}
        </XPContext.Provider>
    );
}

export function useXP() {
    const context = useContext(XPContext);
    if (!context) {
        throw new Error('useXP must be used within XPProvider');
    }
    return context;
}
