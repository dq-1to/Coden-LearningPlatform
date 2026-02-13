import { Step, Course } from '../../types';
import styles from '../../pages/Dashboard.module.css';

interface RecommendedCoursesProps {
    courses: Course[];
    steps: Step[];
    completedSteps: string[];
    onSelectStep: (stepId: string) => void;
}

function RecommendedCourses({ courses, steps, completedSteps, onSelectStep }: RecommendedCoursesProps) {
    // 各コースから未完了のおすすめステップを取得
    const getRecommendations = () => {
        return courses.map(course => {
            const courseSteps = steps.filter(s => s.courseId === course.id);
            const nextStep = courseSteps.find(s => !completedSteps.includes(s.id));
            return { course, nextStep };
        }).filter(item => item.nextStep);
    };

    const recommendations = getRecommendations();

    if (recommendations.length === 0) {
        return null;
    }

    return (
        <section className={styles.recommendedSection}>
            <h2 className={styles.sectionHeader}>次におすすめ</h2>
            <div className={styles.recommendedList}>
                {recommendations.slice(0, 3).map(({ course, nextStep }) => (
                    <div
                        key={nextStep!.id}
                        className={styles.recommendedCard}
                        onClick={() => onSelectStep(nextStep!.id)}
                    >
                        <div
                            className={styles.recommendedIconWrapper}
                            style={{ backgroundColor: `${course.color}20` }}
                        >
                            <span className={styles.recommendedIcon} style={{ color: course.color }}>
                                {course.icon}
                            </span>
                        </div>
                        <div className={styles.recommendedContent}>
                            <h4 className={styles.recommendedTitle}>{nextStep!.title}</h4>
                            <p className={styles.recommendedDescription}>{nextStep!.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RecommendedCourses;
