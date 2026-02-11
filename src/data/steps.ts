import { Step, Course } from '../types';
import { getStepContent, getStepCode } from '../lib/contentLoader';

// コース定義
export const courses: Course[] = [
    {
        id: 'fundamentals',
        title: 'React基礎',
        description: 'Reactの基本概念を学ぶ',
        icon: '📚',
        color: '#4CAF50',
        level: 'beginner'
    },
    {
        id: 'intermediate',
        title: 'React応用',
        description: 'より高度なパターンを習得',
        icon: '🔧',
        color: '#2196F3',
        level: 'intermediate'
    },
    {
        id: 'advanced',
        title: 'React実践',
        description: '実務で使えるスキルを身につける',
        icon: '🚀',
        color: '#9C27B0',
        level: 'advanced'
    },
    {
        id: 'api-practice',
        title: 'API連携実践',
        description: 'バックエンドAPIとの連携を学ぶ',
        icon: '🌐',
        color: '#FF5722',
        level: 'intermediate'
    }
];

// ステップメタデータ定義（コンテンツはMarkdownファイルから読み込み）
interface StepMeta {
    id: string;
    courseId: string;
    title: string;
    description: string;
    docSource: string;
}

const stepMetas: StepMeta[] = [
    // ========== 基礎編 ==========
    {
        id: 'usestate-basic',
        courseId: 'fundamentals',
        title: 'useState基礎',
        description: '状態管理の基本',
        docSource: 'https://ja.react.dev/reference/react/useState',
    },
    {
        id: 'events',
        courseId: 'fundamentals',
        title: 'イベント処理',
        description: 'ユーザー操作への反応',
        docSource: 'https://ja.react.dev/learn/responding-to-events',
    },
    {
        id: 'conditional',
        courseId: 'fundamentals',
        title: '条件付きレンダリング',
        description: '条件に応じた表示切替',
        docSource: 'https://ja.react.dev/learn/conditional-rendering',
    },
    {
        id: 'lists',
        courseId: 'fundamentals',
        title: 'リスト表示',
        description: '配列データの表示',
        docSource: 'https://ja.react.dev/learn/rendering-lists',
    },

    // ========== 応用編 ==========
    {
        id: 'useeffect',
        courseId: 'intermediate',
        title: 'useEffect',
        description: '副作用とライフサイクル',
        docSource: 'https://ja.react.dev/reference/react/useEffect',
    },
    {
        id: 'forms',
        courseId: 'intermediate',
        title: 'フォーム処理',
        description: '入力とバリデーション',
        docSource: 'https://ja.react.dev/reference/react-dom/components/input',
    },
    {
        id: 'usecontext',
        courseId: 'intermediate',
        title: 'useContext',
        description: 'グローバル状態管理',
        docSource: 'https://ja.react.dev/reference/react/useContext',
    },
    {
        id: 'usereducer',
        courseId: 'intermediate',
        title: 'useReducer',
        description: '複雑な状態ロジック',
        docSource: 'https://ja.react.dev/reference/react/useReducer',
    },

    // ========== 実践編 ==========
    {
        id: 'custom-hooks',
        courseId: 'advanced',
        title: 'カスタムHooks',
        description: '再利用可能なロジック',
        docSource: 'https://ja.react.dev/learn/reusing-logic-with-custom-hooks',
    },
    {
        id: 'api-fetch',
        courseId: 'advanced',
        title: 'API連携',
        description: 'データ取得とローディング',
        docSource: 'https://ja.react.dev/reference/react/useEffect#fetching-data-with-effects',
    },
    {
        id: 'performance',
        courseId: 'advanced',
        title: 'パフォーマンス最適化',
        description: 'useMemo/useCallback',
        docSource: 'https://ja.react.dev/reference/react/useMemo',
    },
    {
        id: 'testing',
        courseId: 'advanced',
        title: 'テスト入門',
        description: 'Vitest & React Testing Library',
        docSource: 'https://vitest.dev/',
    },

    // ========== API連携編 ==========
    {
        id: 'api-counter-get',
        courseId: 'api-practice',
        title: 'カウンターAPI(GET)',
        description: 'APIからデータを取得する',
        docSource: 'https://ja.react.dev/reference/react/useEffect',
    },
    {
        id: 'api-counter-post',
        courseId: 'api-practice',
        title: 'カウンターAPI(POST)',
        description: 'APIにデータを送信する',
        docSource: 'https://developer.mozilla.org/ja/docs/Web/API/Fetch_API/Using_Fetch',
    },
    {
        id: 'api-tasks-list',
        courseId: 'api-practice',
        title: 'タスク一覧(GET)',
        description: 'APIからリストデータを取得して表示',
        docSource: 'https://ja.react.dev/learn/rendering-lists',
    },
    {
        id: 'api-tasks-create',
        courseId: 'api-practice',
        title: 'タスク追加(POST)',
        description: 'フォームからAPIにデータを送信',
        docSource: 'https://ja.react.dev/reference/react-dom/components/form',
    },
    {
        id: 'api-tasks-update',
        courseId: 'api-practice',
        title: 'タスク更新(PATCH)',
        description: 'タスクの完了状態を切り替える',
        docSource: 'https://developer.mozilla.org/ja/docs/Web/HTTP/Methods/PATCH',
    },
    {
        id: 'api-tasks-delete',
        courseId: 'api-practice',
        title: 'タスク削除(DELETE)',
        description: 'タスクをAPIから削除する',
        docSource: 'https://developer.mozilla.org/ja/docs/Web/HTTP/Methods/DELETE',
    },
    {
        id: 'api-custom-hook',
        courseId: 'api-practice',
        title: 'useTasksフック',
        description: 'API操作をカスタムフックに抽出',
        docSource: 'https://ja.react.dev/learn/reusing-logic-with-custom-hooks',
    },
    {
        id: 'api-error-loading',
        courseId: 'api-practice',
        title: 'エラー/ローディングUI',
        description: 'APIの状態に応じたUI表示',
        docSource: 'https://ja.react.dev/learn/synchronizing-with-effects',
    },
];

// メタデータ + コンテンツファイルを結合して Step[] を生成
export const steps: Step[] = stepMetas.map(meta => ({
    ...meta,
    content: getStepContent(meta.id),
    code: getStepCode(meta.id),
}));

// コースIDでステップを取得
export function getStepsByCourse(courseId: string): Step[] {
    return steps.filter(step => step.courseId === courseId);
}

// コースIDからコース情報を取得
export function getCourseById(courseId: string): Course | undefined {
    return courses.find(course => course.id === courseId);
}
