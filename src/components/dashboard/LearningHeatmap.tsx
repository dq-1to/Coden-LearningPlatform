import { useMemo } from 'react';
import { useStats } from '../../context/StatsContext';

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

    return (
        <section className="heatmap-section">
            <h2 className="section-header">
                <span className="header-icon">📅</span>
                学習記録
            </h2>
            <div className="heatmap-container">
                <div className="heatmap-labels">
                    <span>月</span>
                    <span>水</span>
                    <span>金</span>
                </div>
                <div className="heatmap-grid">
                    {heatmapData.map((day, index) => (
                        <div
                            key={index}
                            className={`heatmap-cell level-${day.level}`}
                            title={`${day.date}: レベル${day.level}`}
                        />
                    ))}
                </div>
            </div>
            <div className="heatmap-footer">
                <p className="monthly-total">
                    今月の合計学習時間: <span className="time-value">{formatTime(monthlyMinutes)}</span>
                </p>
                <div className="heatmap-legend">
                    <span className="legend-label">少ない</span>
                    <div className="heatmap-cell level-0" />
                    <div className="heatmap-cell level-1" />
                    <div className="heatmap-cell level-2" />
                    <div className="heatmap-cell level-3" />
                    <div className="heatmap-cell level-4" />
                    <span className="legend-label">多い</span>
                </div>
            </div>
        </section>
    );
}

export default LearningHeatmap;
