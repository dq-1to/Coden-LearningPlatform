import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StepViewer from '../components/StepViewer';
import PreviewArea from '../components/PreviewArea';
import PracticeArea from '../components/PracticeArea';
import StepTest from '../components/StepTest';
import ChallengeArea from '../components/ChallengeArea';
import AppHeader from '../components/AppHeader';
import { steps } from '../data/steps';
import { useKeyboardShortcuts } from '../hooks/useKeyboardShortcuts';
import { useAchievements } from '../context/AchievementContext';
import { useStats } from '../context/StatsContext';
import { usePt, PT_REWARDS } from '../context/PtContext';

// 学習進捗のlocalStorageキー
const PROGRESS_KEY = 'learning-progress';
const PRACTICE_KEY = 'practice-progress';

// 練習進捗の型
interface PracticeProgress {
    completed: boolean;
}

// メインアプリコンポーネント（学習画面）
function LearningView() {
    const navigate = useNavigate();
    const { stepId } = useParams<{ stepId: string }>();
    const { stats } = useStats();
    const { addPt } = usePt();
    const { unlockAchievement, unlockedAchievements } = useAchievements();

    // 現在選択中のステップID
    const currentStepId = stepId || steps[0].id;

    // 完了済みステップのID配列
    const [completedSteps, setCompletedSteps] = useState<string[]>([]);

    // 練習問題の進捗
    const [practiceProgress, setPracticeProgress] = useState<Record<string, PracticeProgress>>({});

    // 表示モード: 'view'（閲覧）, 'practice'（練習）, 'test'（ステップテスト）
    const [mode, setMode] = useState<'view' | 'practice' | 'test' | 'challenge'>('view');

    // 初回読み込み: localStorageから進捗を取得
    useEffect(() => {
        const savedProgress = localStorage.getItem(PROGRESS_KEY);
        if (savedProgress) {
            setCompletedSteps(JSON.parse(savedProgress));
        }
        const savedPractice = localStorage.getItem(PRACTICE_KEY);
        if (savedPractice) {
            setPracticeProgress(JSON.parse(savedPractice));
        }
    }, []);

    // 完了進捗が変化したらlocalStorageに保存
    useEffect(() => {
        localStorage.setItem(PROGRESS_KEY, JSON.stringify(completedSteps));
    }, [completedSteps]);

    // 練習進捗が変化したらlocalStorageに保存
    useEffect(() => {
        localStorage.setItem(PRACTICE_KEY, JSON.stringify(practiceProgress));
    }, [practiceProgress]);

    // 連続学習実績のチェック
    useEffect(() => {
        if (stats.streakDays >= 3 && !unlockedAchievements.includes('streak-3')) {
            unlockAchievement('streak-3');
        }
    }, [stats.streakDays, unlockAchievement, unlockedAchievements]);

    // 現在のステップデータを取得
    const currentStep = steps.find(step => step.id === currentStepId);

    // 現在のステップの練習完了状態
    const isPracticeComplete = practiceProgress[currentStepId]?.completed || false;

    // ステップ選択ハンドラ
    const handleStepSelect = (stepId: string) => {
        navigate(`/step/${stepId}`);
        setMode('view');
    };

    // 次のステップへ
    const goToNextStep = () => {
        const currentIndex = steps.findIndex(s => s.id === currentStepId);
        if (currentIndex < steps.length - 1) {
            navigate(`/step/${steps[currentIndex + 1].id}`);
        }
    };

    // 前のステップへ
    const goToPrevStep = () => {
        const currentIndex = steps.findIndex(s => s.id === currentStepId);
        if (currentIndex > 0) {
            navigate(`/step/${steps[currentIndex - 1].id}`);
        }
    };

    // キーボードショートカット
    useKeyboardShortcuts({
        onNextStep: goToNextStep,
        onPrevStep: goToPrevStep,
        onEscape: () => setMode('view'),
        enabled: true,
    });

    // 練習問題完了ハンドラ
    const handlePracticeComplete = () => {
        setPracticeProgress({
            ...practiceProgress,
            [currentStepId]: { completed: true }
        });
        setMode('test');
    };

    // ステップテスト合格ハンドラ
    const handleTestPass = () => {
        if (!completedSteps.includes(currentStepId)) {
            setCompletedSteps([...completedSteps, currentStepId]);
            addPt(PT_REWARDS.STEP_COMPLETE, 'ステップ完了');
        }
        setMode('challenge');
    };

    // チャレンジ完了ハンドラ
    const handleChallengeComplete = () => {
        addPt(5, 'チャレンジ完了');
        setMode('view');
    };

    // 現在のステップが完了済みか
    const isCurrentComplete = completedSteps.includes(currentStepId);

    return (
        <div className="app">
            <AppHeader
                showProgress={true}
                completedSteps={completedSteps.length}
                totalSteps={steps.length}
            />

            <div className="app-body">
                <Sidebar
                    steps={steps}
                    currentStepId={currentStepId}
                    onStepSelect={handleStepSelect}
                    completedSteps={completedSteps}
                />

                <main className="main-content">
                    {/* モード切り替えタブ */}
                    <div className="mode-tabs">
                        <button
                            className={`mode-tab ${mode === 'view' ? 'active' : ''}`}
                            onClick={() => setMode('view')}
                        >
                            📖 閲覧モード
                        </button>
                        <button
                            className={`mode-tab ${mode === 'practice' || mode === 'test' ? 'active' : ''}`}
                            onClick={() => setMode(isPracticeComplete ? 'test' : 'practice')}
                        >
                            ✏️ 練習モード
                            {isPracticeComplete && ' ✓'}
                        </button>
                        <button
                            className={`mode-tab ${mode === 'challenge' ? 'active' : ''}`}
                            onClick={() => setMode('challenge')}
                        >
                            🏆 チャレンジ
                            {isCurrentComplete && ' ✓'}
                        </button>
                    </div>

                    {mode === 'view' ? (
                        <div className="content-view">
                            <div className="content-left">
                                <StepViewer step={currentStep} />
                            </div>
                            <div className="content-right view-mode-hint">
                                <div className="hint-box-large">
                                    <span className="hint-icon">💡</span>
                                    <h4>動作プレビューを見るには</h4>
                                    <p>練習モードで問題を解いて、ステップテストに合格しましょう！</p>
                                    <button
                                        className="start-practice-btn"
                                        onClick={() => setMode(isPracticeComplete ? 'test' : 'practice')}
                                    >
                                        {isPracticeComplete ? 'ステップテストへ' : '練習を始める'} →
                                    </button>
                                </div>
                            </div>
                        </div>
                    ) : mode === 'practice' ? (
                        <div className="content-practice">
                            <PracticeArea
                                stepId={currentStepId}
                                onAllComplete={handlePracticeComplete}
                            />
                        </div>
                    ) : mode === 'test' ? (
                        <div className="content-test">
                            <div className="test-left">
                                <StepTest
                                    stepId={currentStepId}
                                    onPass={handleTestPass}
                                    totalSteps={steps.length}
                                    completedSteps={completedSteps}
                                />
                            </div>
                            <div className="test-right">
                                <PreviewArea
                                    stepId={currentStepId}
                                    isCompleted={isCurrentComplete}
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="content-challenge">
                            <ChallengeArea
                                stepId={currentStepId}
                                onComplete={handleChallengeComplete}
                            />
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default LearningView;
