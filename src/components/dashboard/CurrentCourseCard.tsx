import { Step, Course } from '../../types';

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
    const completedInCourse = completedSteps.filter(id =>
        id.startsWith(course.id) || true // TODO: 実際のコースマッピングを使う
    ).length;

    const progressPercent = totalStepsInCourse > 0
        ? Math.round((completedInCourse / totalStepsInCourse) * 100)
        : 0;

    return (
        <section className="current-course-section">
            <h2 className="section-header">
                <span className="header-icon">🚀</span>
                学習を再開する
            </h2>
            <div className="current-course-card">
                <div className="course-thumbnail">
                    <div className="thumbnail-placeholder" style={{ backgroundColor: `${course.color}20` }}>
                        <span className="course-emoji">{course.icon}</span>
                    </div>
                </div>
                <div className="course-details">
                    <div className="course-header">
                        <h3 className="course-title">{currentStep.title}</h3>
                        <span
                            className="course-level-badge"
                            style={{ backgroundColor: `${course.color}20`, color: course.color }}
                        >
                            {course.level === 'beginner' ? '初級者' : course.level === 'intermediate' ? '中級者' : '上級者'}
                        </span>
                    </div>
                    <p className="course-description">{currentStep.description}</p>
                    <div className="course-progress">
                        <div className="progress-info">
                            <span className="progress-text">セクション {completedInCourse + 1} / {totalStepsInCourse}</span>
                            <span className="progress-percent">進捗 {progressPercent}%</span>
                        </div>
                        <div className="progress-bar">
                            <div
                                className="progress-fill"
                                style={{ width: `${progressPercent}%` }}
                            />
                        </div>
                    </div>
                    <button className="resume-button" onClick={onResume}>
                        レッスンを再開する
                        <span className="resume-icon">▶</span>
                    </button>
                </div>
            </div>
        </section>
    );
}

export default CurrentCourseCard;
