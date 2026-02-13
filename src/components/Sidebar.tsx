import { useState, useEffect, useRef } from 'react';
import { Step, Course } from '../types';
import { courses } from '../data/steps';
import styles from './Sidebar.module.css';

interface SidebarProps {
    steps: Step[];
    currentStepId: string;
    onStepSelect: (stepId: string) => void;
    completedSteps: string[];
    isDrawerOpen?: boolean;
    onDrawerClose?: () => void;
}

function Sidebar({ steps, currentStepId, onStepSelect, completedSteps, isDrawerOpen = false, onDrawerClose }: SidebarProps) {
    const [expandedCourse, setExpandedCourse] = useState<string | null>(() => {
        const currentStep = steps.find(s => s.id === currentStepId);
        return currentStep?.courseId || 'fundamentals';
    });
    const activeStepRef = useRef<HTMLLIElement>(null);

    // アクティブステップにスクロール追従
    useEffect(() => {
        if (activeStepRef.current) {
            activeStepRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            });
        }
    }, [currentStepId]);

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

    const handleStepClick = (stepId: string) => {
        onStepSelect(stepId);
        // モバイルではステップ選択時にドロワーを閉じる
        if (onDrawerClose) {
            onDrawerClose();
        }
    };

    return (
        <>
            {/* オーバーレイ（モバイル用） */}
            <div
                className={`${styles.sidebarOverlay} ${isDrawerOpen ? styles.active : ''}`}
                onClick={onDrawerClose}
            />
            <aside className={`${styles.sidebar} ${isDrawerOpen ? styles.drawerOpen : ''}`}>
                <div className={styles.sidebarHeader}>
                    <h2 className={styles.sidebarTitle}>📚 学習コース</h2>
                    <button
                        className={styles.sidebarCloseBtn}
                        onClick={onDrawerClose}
                        aria-label="サイドバーを閉じる"
                    >
                        ✕
                    </button>
                </div>
                <nav className={styles.courseNav}>
                    {courses.map((course: Course) => {
                        const progress = getCourseProgress(course.id);
                        const isExpanded = expandedCourse === course.id;
                        const isComplete = progress.completed === progress.total && progress.total > 0;
                        const progressPercent = progress.total > 0
                            ? Math.round((progress.completed / progress.total) * 100)
                            : 0;

                        return (
                            <div key={course.id} className={styles.courseGroup}>
                                <button
                                    className={`${styles.courseHeader} ${isExpanded ? styles.expanded : ''} ${isComplete ? styles.completed : ''}`}
                                    onClick={() => toggleCourse(course.id)}
                                >
                                    <div className={styles.courseInfo}>
                                        <span className={styles.courseIcon}>{course.icon}</span>
                                        <div className={styles.courseMeta}>
                                            <span className={styles.courseName}>{course.title}</span>
                                            <span className={styles.courseProgressText}>
                                                {progress.completed}/{progress.total} 完了
                                            </span>
                                            <div className={styles.courseProgressBar}>
                                                <div
                                                    className={styles.courseProgressFill}
                                                    style={{ width: `${progressPercent}%` }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <span className={`${styles.expandIcon} ${isExpanded ? styles.rotated : ''}`}>▼</span>
                                </button>

                                {isExpanded && (
                                    <ul className={styles.stepList}>
                                        {getStepsByCourse(course.id).map((step, index) => {
                                            const isActive = step.id === currentStepId;
                                            const isCompleted = completedSteps.includes(step.id);

                                            return (
                                                <li
                                                    key={step.id}
                                                    ref={isActive ? activeStepRef : null}
                                                    className={`${styles.stepItem} ${isActive ? styles.active : ''} ${isCompleted ? styles.completed : ''}`}
                                                    onClick={() => handleStepClick(step.id)}
                                                >
                                                    <span className={styles.stepCheck}>
                                                        {isCompleted ? '✓' : index + 1}
                                                    </span>
                                                    <div className={styles.stepInfo}>
                                                        <span className={styles.stepTitle}>{step.title}</span>
                                                        <span className={styles.stepDescription}>{step.description}</span>
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
        </>
    );
}

export default Sidebar;
