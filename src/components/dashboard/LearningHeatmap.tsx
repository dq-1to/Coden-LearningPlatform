import { useMemo } from 'react';
import { useStats } from '../../context/StatsContext';
import styles from '../../pages/Dashboard.module.css';

function LearningHeatmap() {
    const { stats } = useStats();

    // 過去12週間分のデータを生成
    const heatmapData = useMemo(() => {
        const data: { date: string; level: number }[] = [];
        const today = new Date();

        for (let i = 83; i >= 0; i--) { // 12週間 = 84日
            const date = new Date(today);
            date.setDate(date.getDate() - i);
            const dateStr = date.toISOString().split('T')[0];

            // 学習履歴から該当日のデータを検索
            const record = stats.studyHistory?.find(r => r.date === dateStr);
            let level = 0;
            if (record) {
                if (record.minutes >= 60) level = 4;
                else if (record.minutes >= 30) level = 3;
                else if (record.minutes >= 15) level = 2;
                else if (record.minutes > 0) level = 1;
            }

            data.push({ date: dateStr, level });
        }

        return data;
    }, [stats.studyHistory]);

    // 今月の合計学習時間を計算
    const monthlyMinutes = useMemo(() => {
        const now = new Date();
        const thisMonth = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}`;
        return stats.studyHistory?.filter(r => r.date.startsWith(thisMonth))
            .reduce((sum, r) => sum + r.minutes, 0) || 0;
    }, [stats.studyHistory]);

    const formatTime = (minutes: number) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return hours > 0 ? `${hours}時間${mins > 0 ? mins + '分' : ''}` : `${mins}分`;
    };

    const levelClass = (level: number) => {
        switch (level) {
            case 0: return styles.level0;
            case 1: return styles.level1;
            case 2: return styles.level2;
            case 3: return styles.level3;
            case 4: return styles.level4;
            default: return styles.level0;
        }
    };

    return (
        <section className={styles.heatmapSection}>
            <h2 className={styles.sectionHeader}>
                <span className={styles.headerIcon}>📅</span>
                学習記録
            </h2>
            <div className={styles.heatmapContainer}>
                <div className={styles.heatmapLabels}>
                    <span>月</span>
                    <span>水</span>
                    <span>金</span>
                </div>
                <div className={styles.heatmapGrid}>
                    {heatmapData.map((day, index) => (
                        <div
                            key={index}
                            className={`${styles.heatmapCell} ${levelClass(day.level)}`}
                            title={`${day.date}: レベル${day.level}`}
                        />
                    ))}
                </div>
            </div>
            <div className={styles.heatmapFooter}>
                <p className={styles.monthlyTotal}>
                    今月の合計学習時間: <span className={styles.timeValue}>{formatTime(monthlyMinutes)}</span>
                </p>
                <div className={styles.heatmapLegend}>
                    <span className={styles.legendLabel}>少ない</span>
                    <div className={`${styles.heatmapCell} ${styles.level0}`} />
                    <div className={`${styles.heatmapCell} ${styles.level1}`} />
                    <div className={`${styles.heatmapCell} ${styles.level2}`} />
                    <div className={`${styles.heatmapCell} ${styles.level3}`} />
                    <div className={`${styles.heatmapCell} ${styles.level4}`} />
                    <span className={styles.legendLabel}>多い</span>
                </div>
            </div>
        </section>
    );
}

export default LearningHeatmap;
