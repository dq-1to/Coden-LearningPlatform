// 学習ステップの型定義
export interface Step {
    id: string;
    title: string;
    description: string;
    docSource: string;
    content: string;
    code: string;
    courseId: string;  // コースID追加
}

// コースの型定義
export interface Course {
    id: string;
    title: string;
    description: string;
    icon: string;
    color: string;
    level: 'beginner' | 'intermediate' | 'advanced';
}

// 練習問題の型定義
export interface Exercise {
    id: number;
    title: string;
    description: string;
    template: string;
    answer: string;
    hint: string;
}

// ステップテストの型定義
export interface StepTest {
    title: string;
    description: string;
    template: string;
    answers: string[];
    hints: string[];
}

// 練習進捗の型定義
export interface PracticeProgress {
    completed: boolean;
    currentIndex?: number;
}

// 学習統計の型定義
export interface LearningStats {
    totalTime: number;
    correctAnswers: number;
    wrongAnswers: number;
    streakDays: number;
    lastStudyDate: string;
    stepStats: Record<string, StepStats>;
    xp: number;  // XPポイント追加
    studyHistory: StudyRecord[];  // 学習履歴追加
}

export interface StepStats {
    attempts: number;
    errors: number;
    bestTime: number;
}

// 学習履歴（ヒートマップ用）
export interface StudyRecord {
    date: string;  // YYYY-MM-DD
    minutes: number;
    stepsCompleted: number;
}

// 今日の目標
export interface DailyGoal {
    id: string;
    type: 'study' | 'practice' | 'review';
    title: string;
    target: number;
    current: number;
    icon: string;
}

// 実績の型定義
export interface Achievement {
    id: string;
    title: string;
    description: string;
    icon: string;
    unlockedAt?: string;
}

// 実績コンテキストの型定義
export interface AchievementContextType {
    achievements: Achievement[];
    unlockedAchievements: string[];
    unlockAchievement: (id: string) => void;
}

// 統計コンテキストの型定義
export interface StatsContextType {
    stats: LearningStats;
    recordCorrectAnswer: (stepId: string) => void;
    recordWrongAnswer: (stepId: string) => void;
    recordStepAttempt: (stepId: string) => void;
    updateStudyTime: (seconds: number) => void;
}

// Ptコンテキストの型定義
export interface PtContextType {
    pt: number;
    addPt: (amount: number, reason: string) => void;
    ptHistory: PtEvent[];
}

export interface PtEvent {
    amount: number;
    reason: string;
    timestamp: string;
}

// 自由記述チャレンジの型定義
export interface Challenge {
    id: string;
    title: string;
    description: string;
    initialCode: string;
    solutionCode: string;
    hints: string[];
    checkPoints: string[];  // 正解判定に使うキーワード
}

