// 学習フレーム層 - プレビューエリア
// ステップに応じた実行プレビューを切り替え表示

import CounterPreview from './previews/CounterPreview';
import TodoPreview from './previews/TodoPreview';
import MemoPreview from './previews/MemoPreview';
import FormPreview from './previews/FormPreview';
import FetchPreview from './previews/FetchPreview';
import ContextPreview from './previews/ContextPreview';
import ReducerPreview from './previews/ReducerPreview';
import CustomHookPreview from './previews/CustomHookPreview';
import ApiTaskPreview from './previews/ApiTaskPreview';

interface PreviewAreaProps {
    stepId: string;
    isCompleted: boolean;
}

function PreviewArea({ stepId, isCompleted }: PreviewAreaProps) {
    // ステップIDに応じてプレビューコンポーネントを切り替え
    const renderPreview = () => {
        switch (stepId) {
            case 'usestate-basic':
                return <CounterPreview />;
            case 'events':
                return <CounterPreview />;
            case 'conditional':
                return <CounterPreview />;
            case 'lists':
                return <TodoPreview />;
            case 'useeffect':
                return <MemoPreview />;
            case 'forms':
                return <FormPreview />;
            case 'usecontext':
                return <ContextPreview />;
            case 'usereducer':
                return <ReducerPreview />;
            case 'custom-hooks':
                return <CustomHookPreview />;
            case 'api-fetch':
                return <FetchPreview />;
            case 'performance':
                return <CounterPreview />;
            case 'testing':
                return <CounterPreview />;
            // API連携コース
            case 'api-counter-get':
            case 'api-counter-post':
                return <CounterPreview />;
            case 'api-tasks-list':
            case 'api-tasks-create':
            case 'api-tasks-update':
            case 'api-tasks-delete':
            case 'api-custom-hook':
            case 'api-error-loading':
                return <ApiTaskPreview />;
            default:
                return <p>プレビューを選択してください</p>;
        }
    };

    return (
        <div className="preview-area">
            <div className="preview-header">
                <h3 className="section-title">🎮 動作プレビュー</h3>
                {isCompleted && (
                    <span className="completed-badge">✓ 完了済み</span>
                )}
            </div>
            <div className="preview-container">
                {renderPreview()}
            </div>
        </div>
    );
}

export default PreviewArea;

