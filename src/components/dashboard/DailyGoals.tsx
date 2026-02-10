import { DailyGoal } from '../../types';

interface DailyGoalsProps {
    goals: DailyGoal[];
}

function DailyGoals({ goals }: DailyGoalsProps) {
    return (
        <section className="daily-goals-section">
            <h2 className="section-header">
                <span className="header-icon">✅</span>
                今日の目標
            </h2>
            <div className="goals-grid">
                {goals.map(goal => (
                    <div
                        key={goal.id}
                        className={`goal-card ${goal.current >= goal.target ? 'completed' : ''}`}
                    >
                        <div className="goal-icon-wrapper">
                            <span className="goal-icon">{goal.icon}</span>
                        </div>
                        <div className="goal-content">
                            <span className="goal-type">{goal.type === 'study' ? '学習' : goal.type === 'practice' ? '実践' : '復習'}</span>
                            <h3 className="goal-title">{goal.title}</h3>
                            {goal.current >= goal.target && (
                                <span className="goal-complete-badge">✓ 達成!</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default DailyGoals;
