import { useStats } from '../context/StatsContext';
import { useAchievements, ACHIEVEMENTS } from '../context/AchievementContext';
import { steps } from '../data/steps';
import AppHeader from '../components/AppHeader';
import '../App.css';

function StatsPage() {
    const { stats } = useStats();
    const { unlockedAchievements } = useAchievements();

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

            <div className="stats-page">
                <h2 className="stats-title">📊 学習統計ダッシュボード</h2>

                {/* 概要カード */}
                <div className="stats-overview">
                    <div className="stat-card">
                        <span className="stat-icon">⏱️</span>
                        <div className="stat-info">
                            <span className="stat-value">{formatTime(stats.totalTime)}</span>
                            <span className="stat-label">総学習時間</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon">🎯</span>
                        <div className="stat-info">
                            <span className="stat-value">{accuracy}%</span>
                            <span className="stat-label">正答率</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon">🔥</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.streakDays}日</span>
                            <span className="stat-label">連続学習</span>
                        </div>
                    </div>

                    <div className="stat-card">
                        <span className="stat-icon">✅</span>
                        <div className="stat-info">
                            <span className="stat-value">{stats.correctAnswers}</span>
                            <span className="stat-label">正解数</span>
                        </div>
                    </div>
                </div>

                {/* 実績 */}
                <div className="stats-section">
                    <h3>🏆 実績</h3>
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
                </div>

                {/* ステップ別統計 */}
                <div className="stats-section">
                    <h3>📚 ステップ別統計</h3>
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
                </div>
            </div>
        </div>
    );
}

export default StatsPage;
