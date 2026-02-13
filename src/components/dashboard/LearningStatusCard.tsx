import { useStats } from '../../context/StatsContext';
import styles from '../../pages/Dashboard.module.css';

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
        <section className={styles.learningStatusCard}>
            <h3 className={styles.statusHeader}>学習ステータス</h3>
            <div className={styles.statusItems}>
                <div className={styles.statusItem}>
                    <div className={styles.statusIconLabel}>
                        <span className={styles.statusIcon}>⏱️</span>
                        <span className={styles.statusLabel}>合計時間</span>
                    </div>
                    <span className={styles.statusValue}>{formatTime(stats.totalTime)}</span>
                </div>
                <div className={styles.statusItem}>
                    <div className={styles.statusIconLabel}>
                        <span className={styles.statusIcon}>🏅</span>
                        <span className={styles.statusLabel}>取得資格</span>
                    </div>
                    <span className={styles.statusValue}>{Math.floor(stats.correctAnswers / 10)}</span>
                </div>
                <div className={styles.statusItem}>
                    <div className={styles.statusIconLabel}>
                        <span className={styles.statusIcon}>🎖️</span>
                        <span className={styles.statusLabel}>ランク</span>
                    </div>
                    <span className={styles.statusValue}>{getRank()}</span>
                </div>
            </div>
            <div className={styles.statusDecoration}>🎖️</div>
        </section>
    );
}

export default LearningStatusCard;
