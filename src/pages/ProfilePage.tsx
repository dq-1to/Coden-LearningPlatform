import { useStats } from '../context/StatsContext';
import { useAchievements, ACHIEVEMENTS } from '../context/AchievementContext';
import { steps } from '../data/steps';
import AppHeader from '../components/AppHeader';
import { usePt } from '../context/PtContext';
import { useAuth } from '../hooks/useAuth';
import { MascotSelector } from '../components/dashboard'; // Import MascotSelector
import '../App.css';

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

            <div className="profile-page">
                <div className="profile-container">
                    {/* 1. Hero Section: User Profile & Current Status */}
                    <div className="profile-hero">
                        <div className="profile-card">
                            <div className="d-flex align-center gap-24">
                                <div className="profile-avatar-large">
                                    {username.charAt(0).toUpperCase()}
                                </div>
                                <div className="profile-info">
                                    <h2 className="profile-username">{username}</h2>
                                    <div className="profile-rank-badge">
                                        🔰 ビギナー
                                    </div>
                                </div>
                            </div>
                            <div className="profile-total-pt-large">
                                <div className="pt-label">Total Points</div>
                                <div className="pt-value-large">
                                    {pt.toLocaleString()} <span className="pt-unit">Pt</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 2. Stats Grid Section */}
                    <div className="stats-grid">
                        <div className="stat-card-bento">
                            <span className="stat-icon-large">⏱️</span>
                            <div className="stat-info">
                                <span className="stat-value-large">{formatTime(stats.totalTime)}</span>
                                <span className="stat-label">総学習時間</span>
                            </div>
                        </div>

                        <div className="stat-card-bento">
                            <span className="stat-icon-large">🎯</span>
                            <div className="stat-info">
                                <span className="stat-value-large">{accuracy}%</span>
                                <span className="stat-label">正答率</span>
                            </div>
                        </div>

                        <div className="stat-card-bento">
                            <span className="stat-icon-large">🔥</span>
                            <div className="stat-info">
                                <span className="stat-value-large">{stats.streakDays}日</span>
                                <span className="stat-label">連続学習</span>
                            </div>
                        </div>

                        <div className="stat-card-bento">
                            <span className="stat-icon-large">✅</span>
                            <div className="stat-info">
                                <span className="stat-value-large">{stats.correctAnswers}</span>
                                <span className="stat-label">正解数</span>
                            </div>
                        </div>
                    </div>

                    {/* 3. Main Content Stack */}
                    <div className="content-stack">
                        {/* Mascot Section */}
                        <section className="section-card">
                            <div className="section-header">
                                <h3>🎨 パートナーマスコット</h3>
                                <p>一緒に学習するパートナーを選びましょう</p>
                            </div>
                            <MascotSelector />
                        </section>

                        {/* Achievements Section */}
                        <section className="section-card">
                            <div className="section-header">
                                <h3>🏆 解除済み実績</h3>
                                <p>学習の節目に獲得したバッジです</p>
                            </div>
                            <div className="achievements-grid">
                                {ACHIEVEMENTS.map(achievement => {
                                    const isUnlocked = unlockedAchievements.includes(achievement.id);
                                    return (
                                        <div
                                            key={achievement.id}
                                            className={`achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`}
                                        >
                                            <span className="achievement-icon">{achievement.icon}</span>
                                            <div className="achievement-details">
                                                <strong>{achievement.title}</strong>
                                                <p>{achievement.description}</p>
                                            </div>
                                            {isUnlocked && <span className="unlocked-badge">✓</span>}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>

                        {/* History Section */}
                        <div className="split-section">
                            <section className="section-card flex-1">
                                <div className="section-header">
                                    <h3>📜 ポイント履歴</h3>
                                </div>
                                <div className="pt-history-list">
                                    {ptHistory.length === 0 ? (
                                        <p className="no-history">履歴はまだありません</p>
                                    ) : (
                                        ptHistory.map((history, index) => (
                                            <div key={index} className="pt-history-item">
                                                <div className="history-main">
                                                    <span className="pt-history-reason">{history.reason}</span>
                                                    <span className="pt-history-date">
                                                        {new Date(history.timestamp).toLocaleDateString()}
                                                    </span>
                                                </div>
                                                <span className="pt-history-amount">+{history.amount}</span>
                                            </div>
                                        ))
                                    )}
                                </div>
                            </section>

                            <section className="section-card flex-1">
                                <div className="section-header">
                                    <h3>📚 ステップ別進捗</h3>
                                </div>
                                <div className="step-stats-list">
                                    {steps.map(step => {
                                        const stepStats = stats.stepStats[step.id];
                                        const attempts = stepStats?.attempts || 0;
                                        const errors = stepStats?.errors || 0;
                                        const stepAccuracy = attempts > 0
                                            ? Math.round(((attempts - errors) / attempts) * 100)
                                            : 0;

                                        return (
                                            <div key={step.id} className="step-stat-item">
                                                <div className="step-stat-header">
                                                    <span className="step-stat-title">{step.title}</span>
                                                    <span className={`step-accuracy ${stepAccuracy >= 80 ? 'high' : stepAccuracy >= 50 ? 'medium' : 'low'}`}>
                                                        {stepAccuracy}%
                                                    </span>
                                                </div>
                                                <div className="step-stat-details">
                                                    <span>試行: {attempts}回</span>
                                                    <span>ミス: {errors}回</span>
                                                </div>
                                                <div className="step-stat-bar">
                                                    <div
                                                        className="step-stat-fill"
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
