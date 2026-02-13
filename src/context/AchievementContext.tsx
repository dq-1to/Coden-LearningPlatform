import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Achievement, AchievementContextType } from '../types';
import { useAuth } from '../hooks/useAuth';
import { achievementService } from '../services/achievementService';
import styles from './AchievementToast.module.css';

// 利用可能な実績の定義
export const ACHIEVEMENTS: Achievement[] = [
    {
        id: 'first-complete',
        title: '🎯 初回完了',
        description: '最初のステップをクリア',
        icon: '🎯',
    },
    {
        id: 'streak-3',
        title: '🔥 連続学習',
        description: '3日連続で学習',
        icon: '🔥',
    },
    {
        id: 'speed-star',
        title: '⚡ スピードスター',
        description: '1分以内にステップテスト合格',
        icon: '⚡',
    },
    {
        id: 'perfect',
        title: '💯 パーフェクト',
        description: 'ミスなしでステップ完了',
        icon: '💯',
    },
    {
        id: 'master',
        title: '🏆 マスター',
        description: '全ステップ完了',
        icon: '🏆',
    },
];




const AchievementContext = createContext<AchievementContextType | null>(null);

interface AchievementProviderProps {
    children: ReactNode;
}

export function AchievementProvider({ children }: AchievementProviderProps) {
    const { user } = useAuth();
    const [unlockedAchievements, setUnlockedAchievements] = useState<string[]>([]);
    const [newlyUnlocked, setNewlyUnlocked] = useState<string | null>(null);

    // Initial load
    useEffect(() => {
        if (!user) {
            setUnlockedAchievements([]);
            return;
        }

        const loadAchievements = async () => {
            const ids = await achievementService.getUnlockedAchievements(user.id);
            setUnlockedAchievements(ids);
        };
        loadAchievements();
    }, [user]);

    // Save effect removed. Usage of service in unlockAchievement.

    const unlockAchievement = (id: string) => {
        if (!unlockedAchievements.includes(id)) {
            const achievement = ACHIEVEMENTS.find(a => a.id === id);
            if (achievement) {
                setUnlockedAchievements(prev => [...prev, id]);
                setNewlyUnlocked(id);
                // 3秒後に通知をクリア
                setTimeout(() => setNewlyUnlocked(null), 3000);

                if (user) {
                    achievementService.unlockAchievement(user.id, id);
                }
            }
        }
    };

    return (
        <AchievementContext.Provider
            value={{
                achievements: ACHIEVEMENTS,
                unlockedAchievements,
                unlockAchievement,
            }}
        >
            {children}
            {/* 実績解除通知 */}
            {newlyUnlocked && (
                <div className={styles.achievementNotification}>
                    <div className={styles.achievementToast}>
                        <span className={styles.achievementIcon}>
                            {ACHIEVEMENTS.find(a => a.id === newlyUnlocked)?.icon}
                        </span>
                        <div className={styles.achievementInfo}>
                            <strong>実績解除！</strong>
                            <span>{ACHIEVEMENTS.find(a => a.id === newlyUnlocked)?.title}</span>
                        </div>
                    </div>
                </div>
            )}
        </AchievementContext.Provider>
    );
}

export function useAchievements() {
    const context = useContext(AchievementContext);
    if (!context) {
        throw new Error('useAchievements must be used within an AchievementProvider');
    }
    return context;
}
