import { useStats } from '../context/StatsContext';
import { useAchievements, ACHIEVEMENTS } from '../context/AchievementContext';
import { steps } from '../data/steps';
import AppHeader from '../components/AppHeader';
import { usePt } from '../context/PtContext';
import { useAuth } from '../hooks/useAuth';
import { MascotSelector } from '../components/dashboard'; // Import MascotSelector
import styles from './ProfilePage.module.css';

function ProfilePage() {
    const { stats } = useStats();
    const { unlockedAchievements } = useAchievements();
    const { pt, ptHistory } = usePt();
    const { user } = useAuth();

    const username = user?.user_metadata?.username || user?.email?.split('@')[0] || 'ユーザー';

    // 正答率を計算
    const totalAnswers = stats.correctAnswers + stats.wrongAnswers;
    const accuracy = totalAnswers > 0
        ? Math.round((stats.correctAnswers / totalAnswers) * 100)
        : 0;

    // 学習時間をフォーマット
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        const minutes = Math.floor((seconds % 3600) / 60);
        if (hours > 0) {
            return `${hours}時間${minutes}分`;
        }
        return `${minutes}分`;
    };

    return (
        <div className="app">
            <AppHeader />

            <div className={styles.profilePage}>
                <div className={styles.profileContainer}>
                    {/* 1. Hero Section: User Profile & Current Status */}
                    <div className={styles.profileHero}>
                        <div className={styles.profileCard}>
                            <div className={`${styles.dFlex} ${styles.alignCenter} ${styles.gap24}`}>
                                <div className={styles.profileAvatarLarge}>
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <div className={styles.profileInfo}>
                                    <h2 className={styles.profileUsername}>{username}</h2>
                                    <div className={styles.profileRankBadge}>
                                        🔰 ビギナー
                                    </div>
                                </div>
                            </div>
                            <div className={styles.profileTotalPtLarge}>
                                <div className={styles.ptLabel}>Total Points</div>
                                <div className={styles.ptValueLarge}>
                                    {pt.toLocaleString()} <span className={styles.ptUnit}>Pt</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Stats Grid Section */}
                    <div className={styles.statsGrid}>
                        <div className={styles.statCardBento}>
                            <span className={styles.statIconLarge}>⏱️</span>
                            <div className="stat-info">
                                <span className={styles.statValueLarge}>{formatTime(stats.totalTime)}</span>
                                <span className="stat-label">総学習時間</span>
                            </div>
                        </div>

                        <div className={styles.statCardBento}>
                            <span className={styles.statIconLarge}>🎯</span>
                            <div className="stat-info">
                                <span className={styles.statValueLarge}>{accuracy}%</span>
                                <span className="stat-label">正答率</span>
                            </div>
                        </div>

                        <div className={styles.statCardBento}>
                            <span className={styles.statIconLarge}>🔥</span>
                            <div className="stat-info">
                                <span className={styles.statValueLarge}>{stats.streakDays}日</span>
                                <span className="stat-label">連続学習</span>
                            </div>
                        </div>

                        <div className={styles.statCardBento}>
                            <span className={styles.statIconLarge}>✅</span>
                            <div className="stat-info">
                                <span className={styles.statValueLarge}>{stats.correctAnswers}</span>
                                <span className="stat-label">正解数</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Main Content Stack */}
                    <div className={styles.contentStack}>
                        {/* Mascot Section */}
                        <section className={styles.sectionCard}>
                            <div className={styles.sectionHeader}>
                                <h3>🎨 パートナーマスコット</h3>
                                <p>一緒に学習するパートナーを選びましょう</p>
                            </div>
                            <MascotSelector />
                        </section>

                        {/* Achievements Section */}
                        <section className={styles.sectionCard}>
                            <div className={styles.sectionHeader}>
                                <h3>🏆 解除済み実績</h3>
                                <p>学習の節目に獲得したバッジです</p>
                            </div>
                            <div className={styles.achievementsGrid}>
                                {ACHIEVEMENTS.map(achievement => {
                                    const isUnlocked = unlockedAchievements.includes(achievement.id);
                                    return (
                                        <div
                                            key={achievement.id}
                                            className={`${styles.achievementCard} ${isUnlocked ? styles.unlocked : styles.locked}`}
                                        >
                                            <span className={styles.achievementIcon}>{achievement.icon}</span>
                                            <div className={styles.achievementDetails}>
                                                <strong>{achievement.title}</strong>
                                                <p>{achievement.description}</p>
                                            </div>
                                            {isUnlocked && <span className={styles.unlockedBadge}>✓</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* History Section */}
                        <div className={styles.splitSection}>
                            <section className={`${styles.sectionCard} ${styles.flex1}`}>
                                <div className={styles.sectionHeader}>
                                    <h3>📜 ポイント履歴</h3>
                                </div>
                                <div className={styles.ptHistoryList}>
                                    {ptHistory.length === 0 ? (
                                        <p className={styles.noHistory}>履歴はまだありません</p>
                                    ) : (
                                        ptHistory.map((history, index) => (
                                            <div key={index} className={styles.ptHistoryItem}>
                                                <div className={styles.historyMain}>
                                                    <span className={styles.ptHistoryReason}>{history.reason}</span>
                                                    <span className={styles.ptHistoryDate}>
                                                        {new Date(history.timestamp).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <span className={styles.ptHistoryAmount}>+{history.amount}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            <section className={`${styles.sectionCard} ${styles.flex1}`}>
                                <div className={styles.sectionHeader}>
                                    <h3>📚 ステップ別進捗</h3>
                                </div>
                                <div className={styles.stepStatsList}>
                                    {steps.map(step => {
                                        const stepStats = stats.stepStats[step.id];
                                        const attempts = stepStats?.attempts || 0;
                                        const errors = stepStats?.errors || 0;
                                        const stepAccuracy = attempts > 0
                                            ? Math.round(((attempts - errors) / attempts) * 100)
                                            : 0;

                                        return (
                                            <div key={step.id} className={styles.stepStatItem}>
                                                <div className={styles.stepStatHeader}>
                                                    <span className={styles.stepStatTitle}>{step.title}</span>
                                                    <span className={`${styles.stepAccuracy} ${stepAccuracy >= 80 ? styles.high : stepAccuracy >= 50 ? styles.medium : styles.low}`}>
                                                        {stepAccuracy}%
                                                    </span>
                                                </div>
                                                <div className={styles.stepStatDetails}>
                                                    <span>試行: {attempts}回</span>
                                                    <span>ミス: {errors}回</span>
                                                </div>
                                                <div className={styles.stepStatBar}>
                                                    <div
                                                        className={styles.stepStatFill}
                                                        style={{ width: `${stepAccuracy}%` }}
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProfilePage;
