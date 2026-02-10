import { useState } from 'react';
import { Step, Course } from '../types';
import { courses } from '../data/steps';

interface SidebarProps {
    steps: Step[];
    currentStepId: string;
    onStepSelect: (stepId: string) => void;
    completedSteps: string[];
}

function Sidebar({ steps, currentStepId, onStepSelect, completedSteps }: SidebarProps) {
    const [expandedCourse, setExpandedCourse] = useState<string | null>(() => {
        // 現在のステップのコースを初期値として展開
        const currentStep = steps.find(s => s.id === currentStepId);
        return currentStep?.courseId || 'fundamentals';
    });

    // コースごとにステップをグループ化
    const getStepsByCourse = (courseId: string) => {
        return steps.filter(step => step.courseId === courseId);
    };

    // コースの進捗を計算
    const getCourseProgress = (courseId: string) => {
        const courseSteps = getStepsByCourse(courseId);
        const completed = courseSteps.filter(s => completedSteps.includes(s.id)).length;
        return { completed, total: courseSteps.length };
    };

    const toggleCourse = (courseId: string) => {
        setExpandedCourse(prev => prev === courseId ? null : courseId);
    };

    return (
        <aside className="sidebar">
            <div className="sidebar-header">
                <h2 className="sidebar-title">📚 学習コース</h2>
            </div>
            <nav className="course-nav">
                {courses.map((course: Course) => {
                    const progress = getCourseProgress(course.id);
                    const isExpanded = expandedCourse === course.id;
                    const isComplete = progress.completed === progress.total && progress.total > 0;

                    return (
                        <div key={course.id} className="course-group">
                            <button
                                className={`course-header ${isExpanded ? 'expanded' : ''} ${isComplete ? 'completed' : ''}`}
                                onClick={() => toggleCourse(course.id)}
                            >
                                <div className="course-info">
                                    <span className="course-icon">{course.icon}</span>
                                    <div className="course-meta">
                                        <span className="course-name">{course.title}</span>
                                        <span className="course-progress-text">
                                            {progress.completed}/{progress.total} 完了
                                        </span>
                                    </div>
                                </div>
                                <span className={`expand-icon ${isExpanded ? 'rotated' : ''}`}>▼</span>
                            </button>

                            {isExpanded && (
                                <ul className="step-list">
                                    {getStepsByCourse(course.id).map((step, index) => {
                                        const isActive = step.id === currentStepId;
                                        const isCompleted = completedSteps.includes(step.id);

                                        return (
                                            <li
                                                key={step.id}
                                                className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
                                                onClick={() => onStepSelect(step.id)}
                                            >
                                                <span className="step-check">
                                                    {isCompleted ? '✓' : index + 1}
                                                </span>
                                                <div className="step-info">
                                                    <span className="step-title">{step.title}</span>
                                                    <span className="step-description">{step.description}</span>
                                                </div>
                                            </li>
                                        );
                                    })}
                                </ul>
                            )}
                        </div>
                    );
                })}
            </nav>
        </aside>
    );
}

export default Sidebar;
