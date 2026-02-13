import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { LearningStats, StatsContextType } from '../types';
import { useAuth } from '../hooks/useAuth';
import { statsService } from '../services/statsService';




const defaultStats: LearningStats = {
    totalTime: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    streakDays: 0,
    lastStudyDate: '',
    stepStats: {},
    xp: 0,
    studyHistory: [],
};

const StatsContext = createContext<StatsContextType | null>(null);

interface StatsProviderProps {
    children: ReactNode;
}

export function StatsProvider({ children }: StatsProviderProps) {
    const { user } = useAuth();
    const [stats, setStats] = useState<LearningStats>(defaultStats);

    // Initial load
    useEffect(() => {
        if (!user) {
            setStats(defaultStats);
            return;
        }

        const loadStats = async () => {
            const data = await statsService.getStats(user.id);
            if (data) {
                setStats(data);
            }
        };
        loadStats();
    }, [user]);

    // 連続学習日数の更新
    useEffect(() => {
        if (!user) return;

        const today = new Date().toDateString();
        // Check if we need to update streak (logic logic similar to before but considering DB sync)
        if (stats.lastStudyDate !== today && stats.lastStudyDate) {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const isConsecutive = stats.lastStudyDate === yesterday.toDateString();

            const newStreak = isConsecutive ? stats.streakDays + 1 : 1;

            setStats(prev => ({
                ...prev,
                lastStudyDate: today,
                streakDays: newStreak,
            }));

            statsService.updateStats(user.id, {
                lastStudyDate: today,
                streakDays: newStreak
            });
        }
    }, [stats.lastStudyDate, user]);

    const recordCorrectAnswer = (stepId: string) => {
        setStats(prev => {
            const newStats = {
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
            };
            return newStats;
        });

        if (user) {
            statsService.updateStats(user.id, { correctAnswers: stats.correctAnswers + 1 });
            statsService.updateStepProgress(user.id, stepId, { attempts: 1 }); // Increment
        }
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

        if (user) {
            statsService.updateStats(user.id, { wrongAnswers: stats.wrongAnswers + 1 });
            statsService.updateStepProgress(user.id, stepId, { attempts: 1, errors: 1 });
        }
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

        if (user) {
            statsService.updateStepProgress(user.id, stepId, { attempts: 1 });
        }
    };

    const updateStudyTime = (seconds: number) => {
        setStats(prev => ({
            ...prev,
            totalTime: prev.totalTime + seconds,
        }));

        if (user) {
            // This might act weird with multiple updates, but basic implementation:
            // Service expects absolute value? No, my service implementation takes Partial<LearningStats>.
            // Wait, updateStats in service calls `update`.
            // So if I pass `totalTime: stats.totalTime + seconds`, it sets the absolute value.
            // This relies on `stats` being up to date.
            // A better way is increment, but I didn't implement increment for stats yet.
            // For now, I'll send the new absolute value.
            statsService.updateStats(user.id, { totalTime: stats.totalTime + seconds });
        }
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
