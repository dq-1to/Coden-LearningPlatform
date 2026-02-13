import { DailyGoal } from '../../types';
import styles from '../../pages/Dashboard.module.css';

interface DailyGoalsProps {
    goals: DailyGoal[];
}

function DailyGoals({ goals }: DailyGoalsProps) {
    return (
        <section className={styles.dailyGoalsSection}>
            <h2 className={styles.sectionHeader}>
                <span className={styles.headerIcon}>✅</span>
                今日の目標
            </h2>
            <div className={styles.goalsGrid}>
                {goals.map(goal => (
                    <div
                        key={goal.id}
                        className={`${styles.goalCard} ${goal.current >= goal.target ? styles.completed : ''}`}
                    >
                        <div className={styles.goalIconWrapper}>
                            <span className={styles.goalIcon}>{goal.icon}</span>
                        </div>
                        <div className={styles.goalContent}>
                            <span className={styles.goalType}>{goal.type === 'study' ? '学習' : goal.type === 'practice' ? '実践' : '復習'}</span>
                            <h3 className={styles.goalTitle}>{goal.title}</h3>
                            {goal.current >= goal.target && (
                                <span className={styles.goalCompleteBadge}>✓ 達成!</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default DailyGoals;
