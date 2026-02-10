import { Step, Course } from '../../types';

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
        <section className="recommended-section">
            <h2 className="section-header">次におすすめ</h2>
            <div className="recommended-list">
                {recommendations.slice(0, 3).map(({ course, nextStep }) => (
                    <div
                        key={nextStep!.id}
                        className="recommended-card"
                        onClick={() => onSelectStep(nextStep!.id)}
                    >
                        <div
                            className="recommended-icon-wrapper"
                            style={{ backgroundColor: `${course.color}20` }}
                        >
                            <span className="recommended-icon" style={{ color: course.color }}>
                                {course.icon}
                            </span>
                        </div>
                        <div className="recommended-content">
                            <h4 className="recommended-title">{nextStep!.title}</h4>
                            <p className="recommended-description">{nextStep!.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RecommendedCourses;
