import { Step, Course } from '../../types';
import { getStepsByCourse } from '../../data/steps';
import styles from '../../pages/Dashboard.module.css';

interface CurrentCourseCardProps {
    currentStep: Step | undefined;
    course: Course | undefined;
    completedSteps: string[];
    totalStepsInCourse: number;
    onResume: () => void;
}

function CurrentCourseCard({ currentStep, course, completedSteps, totalStepsInCourse, onResume }: CurrentCourseCardProps) {
    if (!currentStep || !course) {
        return null;
    }

    // コース内の完了数を計算
    const courseStepIds = getStepsByCourse(course.id).map(s => s.id);
    const completedInCourse = completedSteps.filter(id =>
        courseStepIds.includes(id)
    ).length;

    const progressPercent = totalStepsInCourse > 0
        ? Math.round((completedInCourse / totalStepsInCourse) * 100)
        : 0;

    return (
        <section className={styles.currentCourseSection}>
            <h2 className={styles.sectionHeader}>
                <span className={styles.headerIcon}>🚀</span>
                学習を再開する
            </h2>
            <div className={styles.currentCourseCard}>
                <div className={styles.courseThumbnail}>
                    <div className={styles.thumbnailPlaceholder} style={{ backgroundColor: `${course.color}20` }}>
                        <span className={styles.courseEmoji}>{course.icon}</span>
                    </div>
                </div>
                <div className={styles.courseDetails}>
                    <div className={styles.courseHeader}>
                        <h3 className={styles.courseTitle}>{currentStep.title}</h3>
                        <span
                            className={styles.courseLevelBadge}
                            style={{ backgroundColor: `${course.color}20`, color: course.color }}
                        >
                            {course.level === 'beginner' ? '初級者' : course.level === 'intermediate' ? '中級者' : '上級者'}
                        </span>
                    </div>
                    <p className={styles.courseDescription}>{currentStep.description}</p>
                    <div className={styles.courseProgress}>
                        <div className={styles.progressInfo}>
                            <span className={styles.progressText}>セクション {completedInCourse + 1} / {totalStepsInCourse}</span>
                            <span className={styles.progressPercent}>進捗 {progressPercent}%</span>
                        </div>
                        <div className={styles.progressBar}>
                            <div
                                className={styles.progressFill}
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                    <button className={styles.resumeButton} onClick={onResume}>
                        レッスンを再開する
                        <span className={styles.resumeIcon}>▶</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CurrentCourseCard;
