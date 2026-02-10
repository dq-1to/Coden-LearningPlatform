import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import AppHeader from '../components/AppHeader';
import {
    WelcomeBanner,
    DailyGoals,
    LearningStatusCard,
    RecommendedCourses,
    LearningHeatmap,
    CurrentCourseCard,
    MascotSelector
} from '../components/dashboard';
import { steps, courses, getCourseById } from '../data/steps';
import { useStats } from '../context/StatsContext';
import { DailyGoal } from '../types';

// 学習進捗のlocalStorageキー
const PROGRESS_KEY = 'learning-progress';

function Dashboard() {
    const navigate = useNavigate();
    const { stats } = useStats();

    const [completedSteps] = useState<string[]>(() => {
        const saved = localStorage.getItem(PROGRESS_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    // 今日の目標
    const dailyGoals: DailyGoal[] = useMemo(() => [
        {
            id: 'study',
            type: 'study',
            title: '1つのステップを学習',
            target: 1,
            current: Math.min(completedSteps.length, 1),
            icon: '📖'
        },
        {
            id: 'practice',
            type: 'practice',
            title: '演習問題を3問解く',
            target: 3,
            current: stats.correctAnswers % 3,
            icon: '💻'
        }
    ], [completedSteps.length, stats.correctAnswers]);

    // 現在学習中のステップを取得
    const getCurrentStep = () => {
        const lastCompleted = completedSteps[completedSteps.length - 1];
        if (!lastCompleted) return steps[0];
        const lastIndex = steps.findIndex(s => s.id === lastCompleted);
        return steps[lastIndex + 1] || steps[0];
    };

    const currentStep = getCurrentStep();
    const currentCourse = getCourseById(currentStep?.courseId || '');
    const stepsInCourse = steps.filter(s => s.courseId === currentStep?.courseId).length;

    const handleSelectStep = (stepId: string) => {
        navigate(`/step/${stepId}`);
    };

    const handleResume = () => {
        if (currentStep) {
            navigate(`/step/${currentStep.id}`);
        }
    };

    return (
        <div className="app">
            <AppHeader />

            <div className="app-body">
                <Sidebar
                    steps={steps}
                    currentStepId={currentStep?.id || steps[0].id}
                    onStepSelect={handleSelectStep}
                    completedSteps={completedSteps}
                />

                <main className="main-content dashboard-content">
                    <div className="dashboard-layout">
                        <div className="dashboard-main">
                            <WelcomeBanner
                                userName="ユーザー"
                                completedSteps={completedSteps.length}
                                totalSteps={steps.length}
                            />

                            <DailyGoals goals={dailyGoals} />

                            <CurrentCourseCard
                                currentStep={currentStep}
                                course={currentCourse}
                                completedSteps={completedSteps}
                                totalStepsInCourse={stepsInCourse}
                                onResume={handleResume}
                            />

                            <LearningHeatmap />
                        </div>

                        <div className="dashboard-side">
                            <LearningStatusCard />

                            <MascotSelector />

                            <RecommendedCourses
                                courses={courses}
                                steps={steps}
                                completedSteps={completedSteps}
                                onSelectStep={handleSelectStep}
                            />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
