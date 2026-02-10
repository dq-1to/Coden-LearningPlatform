import { useStats } from '../../context/StatsContext';

function LearningStatusCard() {
    const { stats } = useStats();

    // 時間をフォーマット
    const formatTime = (seconds: number) => {
        const hours = Math.floor(seconds / 3600);
        return `${hours}h`;
    };

    // ランクを計算
    const getRank = () => {
        const total = stats.correctAnswers + stats.wrongAnswers;
        if (total < 10) return '初心者';
        const accuracy = stats.correctAnswers / total;
        if (accuracy >= 0.9) return '上位 5%';
        if (accuracy >= 0.8) return '上位 15%';
        if (accuracy >= 0.7) return '上位 30%';
        return '努力中';
    };

    return (
        <section className="learning-status-card">
            <h3 className="status-header">学習ステータス</h3>
            <div className="status-items">
                <div className="status-item">
                    <div className="status-icon-label">
                        <span className="status-icon">⏱️</span>
                        <span className="status-label">合計時間</span>
                    </div>
                    <span className="status-value">{formatTime(stats.totalTime)}</span>
                </div>
                <div className="status-item">
                    <div className="status-icon-label">
                        <span className="status-icon">🏅</span>
                        <span className="status-label">取得資格</span>
                    </div>
                    <span className="status-value">{Math.floor(stats.correctAnswers / 10)}</span>
                </div>
                <div className="status-item">
                    <div className="status-icon-label">
                        <span className="status-icon">🎖️</span>
                        <span className="status-label">ランク</span>
                    </div>
                    <span className="status-value">{getRank()}</span>
                </div>
            </div>
            <div className="status-decoration">🎖️</div>
        </section>
    );
}

export default LearningStatusCard;
