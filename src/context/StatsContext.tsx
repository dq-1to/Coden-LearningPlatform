import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearningStats, StatsContextType } from '../types';

const STATS_KEY = 'learning-stats';

const defaultStats: LearningStats = {
    totalTime: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streakDays: 0,
    lastStudyDate: '',
    stepStats: {},
};

const StatsContext = createContext<StatsContextType | null>(null);

interface StatsProviderProps {
    children: ReactNode;
}

export function StatsProvider({ children }: StatsProviderProps) {
    const [stats, setStats] = useState<LearningStats>(defaultStats);

    // 初回読み込み
    useEffect(() => {
        const saved = localStorage.getItem(STATS_KEY);
        if (saved) {
            setStats(JSON.parse(saved));
        }
    }, []);

    // 保存
    useEffect(() => {
        localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    }, [stats]);

    // 連続学習日数の更新
    useEffect(() => {
        const today = new Date().toDateString();
        if (stats.lastStudyDate !== today) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const isConsecutive = stats.lastStudyDate === yesterday.toDateString();

            setStats(prev => ({
                ...prev,
                lastStudyDate: today,
                streakDays: isConsecutive ? prev.streakDays + 1 : 1,
            }));
        }
    }, [stats.lastStudyDate]);

    const recordCorrectAnswer = (stepId: string) => {
        setStats(prev => ({
            ...prev,
            correctAnswers: prev.correctAnswers + 1,
            stepStats: {
                ...prev.stepStats,
                [stepId]: {
                    ...prev.stepStats[stepId],
                    attempts: (prev.stepStats[stepId]?.attempts || 0) + 1,
                    errors: prev.stepStats[stepId]?.errors || 0,
                    bestTime: prev.stepStats[stepId]?.bestTime || 0,
                },
            },
        }));
    };

    const recordWrongAnswer = (stepId: string) => {
        setStats(prev => ({
            ...prev,
            wrongAnswers: prev.wrongAnswers + 1,
            stepStats: {
                ...prev.stepStats,
                [stepId]: {
                    ...prev.stepStats[stepId],
                    attempts: (prev.stepStats[stepId]?.attempts || 0) + 1,
                    errors: (prev.stepStats[stepId]?.errors || 0) + 1,
                    bestTime: prev.stepStats[stepId]?.bestTime || 0,
                },
            },
        }));
    };

    const recordStepAttempt = (stepId: string) => {
        setStats(prev => ({
            ...prev,
            stepStats: {
                ...prev.stepStats,
                [stepId]: {
                    ...prev.stepStats[stepId],
                    attempts: (prev.stepStats[stepId]?.attempts || 0) + 1,
                    errors: prev.stepStats[stepId]?.errors || 0,
                    bestTime: prev.stepStats[stepId]?.bestTime || 0,
                },
            },
        }));
    };

    const updateStudyTime = (seconds: number) => {
        setStats(prev => ({
            ...prev,
            totalTime: prev.totalTime + seconds,
        }));
    };

    return (
        <StatsContext.Provider
            value={{
                stats,
                recordCorrectAnswer,
                recordWrongAnswer,
                recordStepAttempt,
                updateStudyTime,
            }}
        >
            {children}
        </StatsContext.Provider>
    );
}

export function useStats() {
    const context = useContext(StatsContext);
    if (!context) {
        throw new Error('useStats must be used within a StatsProvider');
    }
    return context;
}
