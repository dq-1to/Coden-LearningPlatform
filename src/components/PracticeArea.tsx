import { useState, useEffect, KeyboardEvent } from 'react';
import { exercises } from '../data/exercises';
import { useStats } from '../context/StatsContext';

// 練習エリアコンポーネント
// 穴埋め形式でコードを書いて練習する

interface PracticeAreaProps {
    stepId: string;
    onAllComplete: () => void;
}

function PracticeArea({ stepId, onAllComplete }: PracticeAreaProps) {
    const { recordCorrectAnswer, recordWrongAnswer } = useStats();

    // 現在の問題インデックス
    const [currentIndex, setCurrentIndex] = useState(0);
    // ユーザーの入力
    const [userAnswer, setUserAnswer] = useState('');
    // 回答結果の表示状態
    const [showResult, setShowResult] = useState(false);
    // 正解かどうか
    const [isCorrect, setIsCorrect] = useState(false);
    // ヒント表示
    const [showHint, setShowHint] = useState(false);
    // 答え表示
    const [showAnswer, setShowAnswer] = useState(false);
    // 各問題の正解状態
    const [solvedQuestions, setSolvedQuestions] = useState<number[]>([]);

    // 現在のステップの練習問題
    const stepExercises = exercises[stepId] || [];
    const currentExercise = stepExercises[currentIndex];

    // ステップが変わったら状態をリセット
    useEffect(() => {
        setCurrentIndex(0);
        resetState();
        setSolvedQuestions([]);
    }, [stepId]);

    // 問題がない場合
    if (!currentExercise) {
        return (
            <div className="practice-area">
                <p className="practice-empty">このステップの練習問題はありません</p>
            </div>
        );
    }

    // 回答を確認
    const checkAnswer = () => {
        const correct = userAnswer.trim() === currentExercise.answer;
        setIsCorrect(correct);
        setShowResult(true);

        if (correct) {
            recordCorrectAnswer(stepId);
            if (!solvedQuestions.includes(currentIndex)) {
                const newSolved = [...solvedQuestions, currentIndex];
                setSolvedQuestions(newSolved);

                // 全問正解チェック
                if (newSolved.length === stepExercises.length) {
                    setTimeout(() => {
                        onAllComplete && onAllComplete();
                    }, 1000);
                }
            }
        } else {
            recordWrongAnswer(stepId);
        }
    };

    // 次の問題へ
    const goNext = () => {
        if (currentIndex < stepExercises.length - 1) {
            setCurrentIndex(currentIndex + 1);
            resetState();
        }
    };

    // 前の問題へ
    const goPrev = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
            resetState();
        }
    };

    // 状態をリセット
    const resetState = () => {
        setUserAnswer('');
        setShowResult(false);
        setIsCorrect(false);
        setShowHint(false);
        setShowAnswer(false);
    };

    // キーボードハンドラ
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        // Ctrl + Enter で回答送信
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            checkAnswer();
        }
    };

    // テンプレートを入力欄付きで表示
    const renderTemplate = () => {
        const parts = currentExercise.template.split('______');
        return (
            <div className="code-template">
                <code>
                    {parts[0]}
                    <input
                        type="text"
                        value={userAnswer}
                        onChange={(e) => {
                            setUserAnswer(e.target.value);
                            setShowResult(false);
                        }}
                        className={`answer-input ${showResult ? (isCorrect ? 'correct' : 'incorrect') : ''}`}
                        placeholder="ここに入力"
                        onKeyDown={handleKeyDown}
                    />
                    {parts[1]}
                </code>
            </div>
        );
    };

    const allSolved = solvedQuestions.length === stepExercises.length;

    return (
        <div className="practice-area">
            {/* 進捗表示 */}
            <div className="practice-header">
                <span className="practice-progress">
                    練習 {currentIndex + 1} / {stepExercises.length}
                    <span className="solved-count">
                        （正解: {solvedQuestions.length}/{stepExercises.length}）
                    </span>
                </span>
                <h4 className="practice-title">{currentExercise.title}</h4>
            </div>

            {/* 全問正解メッセージ */}
            {allSolved && (
                <div className="all-complete-message">
                    🎉 全問正解！ステップテストへ進みます...
                </div>
            )}

            {/* 問題説明 */}
            <p className="practice-description">{currentExercise.description}</p>

            {/* ヒント: Ctrl+Enter */}
            <p className="keyboard-hint">💡 Ctrl + Enter で回答を確認</p>

            {/* コードテンプレート */}
            {renderTemplate()}

            {/* 結果表示 */}
            {showResult && (
                <div className={`result-message ${isCorrect ? 'correct' : 'incorrect'}`}>
                    {isCorrect ? (
                        <span>🎉 正解です！</span>
                    ) : (
                        <span>❌ 不正解です。もう一度試してみましょう。</span>
                    )}
                </div>
            )}

            {/* ヒント表示 */}
            {showHint && (
                <div className="hint-box">
                    💡 ヒント: {currentExercise.hint}
                </div>
            )}

            {/* 答え表示 */}
            {showAnswer && (
                <div className="answer-box">
                    ✅ 答え: <code>{currentExercise.answer}</code>
                </div>
            )}

            {/* ボタン群 */}
            <div className="practice-actions">
                <button
                    onClick={() => setShowHint(!showHint)}
                    className="hint-btn"
                >
                    {showHint ? 'ヒントを隠す' : 'ヒント'}
                </button>
                <button
                    onClick={() => setShowAnswer(!showAnswer)}
                    className="show-answer-btn"
                >
                    {showAnswer ? '答えを隠す' : '答えを見る'}
                </button>
                <button
                    onClick={checkAnswer}
                    className="check-btn"
                >
                    確認
                </button>
            </div>

            {/* ナビゲーション */}
            <div className="practice-nav">
                <button
                    onClick={goPrev}
                    disabled={currentIndex === 0}
                    className="nav-btn"
                >
                    ← 前へ
                </button>
                <button
                    onClick={goNext}
                    disabled={currentIndex === stepExercises.length - 1}
                    className="nav-btn"
                >
                    次へ →
                </button>
            </div>
        </div>
    );
}

export default PracticeArea;
