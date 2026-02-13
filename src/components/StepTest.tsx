import { useState, KeyboardEvent } from 'react';
import { stepTests } from '../data/stepTests';
import { useStats } from '../context/StatsContext';
import { useAchievements } from '../context/AchievementContext';
import PreviewArea from './PreviewArea';
import styles from './StepTest.module.css';

// ステップテストコンポーネント
// 練習問題完了後に表示される総合テスト

interface StepTestProps {
    stepId: string;
    onPass: () => void;
    totalSteps?: number;
    completedSteps?: string[];
}

function StepTest({ stepId, onPass, totalSteps = 8, completedSteps = [] }: StepTestProps) {
    const { recordCorrectAnswer, recordWrongAnswer } = useStats();
    const { unlockAchievement, unlockedAchievements } = useAchievements();

    // ステップIDからテストデータを取得
    const test = stepTests[stepId];

    // 各穴埋めの入力値
    const [inputs, setInputs] = useState<string[]>(
        test ? Array(test.answers.length).fill('') : []
    );

    // 各穴埋めの正誤状態
    const [results, setResults] = useState<(boolean | null)[]>(
        test ? Array(test.answers.length).fill(null) : []
    );

    // ヒント表示状態
    const [showHints, setShowHints] = useState(false);

    // テスト結果メッセージ
    const [message, setMessage] = useState('');

    // 開始時間（スピードスター実績用）
    const [startTime] = useState(Date.now());

    // ミスカウント（パーフェクト実績用）
    const [hasError, setHasError] = useState(false);

    // テスト合格状態
    const [isPassed, setIsPassed] = useState(false);

    // プレビュー表示状態
    const [showPreview, setShowPreview] = useState(false);

    if (!test) {
        return <div className={styles.stepTestEmpty}>テストデータがありません</div>;
    }

    // 入力変更ハンドラ
    const handleInputChange = (index: number, value: string) => {
        const newInputs = [...inputs];
        newInputs[index] = value;
        setInputs(newInputs);
    };

    // キーボードハンドラ
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            checkAnswers();
        }
    };

    // 回答確認
    const checkAnswers = () => {
        const newResults = inputs.map((input, index) =>
            input.trim() === test.answers[index]
        );
        setResults(newResults);

        const allCorrect = newResults.every(r => r === true);
        const correctCount = newResults.filter(r => r === true).length;
        const wrongCount = newResults.filter(r => r === false).length;

        // 統計を記録
        for (let i = 0; i < correctCount; i++) {
            recordCorrectAnswer(stepId);
        }
        for (let i = 0; i < wrongCount; i++) {
            recordWrongAnswer(stepId);
            setHasError(true);
        }

        if (allCorrect) {
            setMessage('🎉 おめでとうございます！テスト合格です！');
            setIsPassed(true);

            // 実績チェック
            // 初回完了
            if (!unlockedAchievements.includes('first-complete')) {
                unlockAchievement('first-complete');
            }

            // スピードスター（1分以内）
            const elapsedTime = Date.now() - startTime;
            if (elapsedTime < 60000 && !unlockedAchievements.includes('speed-star')) {
                unlockAchievement('speed-star');
            }

            // パーフェクト（ミスなし）
            if (!hasError && !unlockedAchievements.includes('perfect')) {
                unlockAchievement('perfect');
            }

            // マスター（全ステップ完了）
            const newCompletedCount = completedSteps.includes(stepId)
                ? completedSteps.length
                : completedSteps.length + 1;
            if (newCompletedCount >= totalSteps && !unlockedAchievements.includes('master')) {
                unlockAchievement('master');
            }
        } else {
            setMessage(`${correctCount}/${test.answers.length} 正解です。もう一度確認してみましょう。`);
        }
    };

    // プレビューを確認して完了
    const handleShowPreview = () => {
        setShowPreview(true);
    };

    // 次のステップへ進む
    const handleComplete = () => {
        onPass();
    };

    // テンプレートを穴埋め入力付きでレンダリング
    const renderTemplate = () => {
        const parts = test.template.split(/____(\d+)____/);
        return parts.map((part, i) => {
            // 奇数インデックスは穴埋め番号
            if (i % 2 === 1) {
                const index = parseInt(part) - 1;
                const resultClass = results[index] === true
                    ? styles.correct
                    : results[index] === false
                        ? styles.incorrect
                        : '';
                return (
                    <input
                        key={i}
                        type="text"
                        className={`${styles.testInput} ${resultClass}`}
                        value={inputs[index]}
                        onChange={(e) => handleInputChange(index, e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder={`(${index + 1})`}
                        disabled={isPassed}
                    />
                );
            }
            // 偶数インデックスは通常のコード
            return <span key={i}>{part}</span>;
        });
    };

    // プレビュー表示モード
    if (showPreview) {
        return (
            <div className={`${styles.stepTest} ${styles.passed}`}>
                <div className={styles.testHeader}>
                    <span className={`${styles.testBadge} ${styles.success}`}>✓ テスト合格</span>
                    <h3 className={styles.testTitle}>{test.title}</h3>
                </div>

                <div className={styles.previewSection}>
                    <h4>🎮 動作プレビュー</h4>
                    <p className={styles.previewDescription}>あなたが書いたコードの動作を確認しましょう！</p>
                    <div className={styles.previewContainer}>
                        <PreviewArea stepId={stepId} isCompleted={true} />
                    </div>
                </div>

                <div className={styles.testActions}>
                    <button
                        className={styles.completeBtn}
                        onClick={handleComplete}
                    >
                        ✓ 次のステップへ進む
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className={`${styles.stepTest} ${isPassed ? styles.passed : ''}`}>
            <div className={styles.testHeader}>
                <span className={styles.testBadge}>{isPassed ? '✓ テスト合格' : '📝 ステップテスト'}</span>
                <h3 className={styles.testTitle}>{test.title}</h3>
            </div>
            <p className={styles.testDescription}>{test.description}</p>
            {!isPassed && <p className={styles.keyboardHint}>💡 Ctrl + Enter で回答を確認</p>}

            <div className={styles.testCodeArea}>
                <pre className={styles.testTemplate}>
                    <code>{renderTemplate()}</code>
                </pre>
            </div>

            {showHints && (
                <div className={styles.testHints}>
                    <h4>💡 ヒント</h4>
                    <ol>
                        {test.hints.map((hint, i) => (
                            <li key={i} className={results[i] === true ? styles.hintSolved : ''}>
                                {hint}
                            </li>
                        ))}
                    </ol>
                </div>
            )}

            {message && (
                <div className={`${styles.testMessage} ${message.includes('合格') ? styles.success : styles.info}`}>
                    {message}
                </div>
            )}

            <div className={styles.testActions}>
                {!isPassed && (
                    <>
                        <button
                            className={styles.hintToggleBtn}
                            onClick={() => setShowHints(!showHints)}
                        >
                            {showHints ? 'ヒントを隠す' : 'ヒントを表示'}
                        </button>
                        <button
                            className={styles.checkTestBtn}
                            onClick={checkAnswers}
                        >
                            🔍 回答を確認
                        </button>
                    </>
                )}
                {isPassed && (
                    <button
                        className={styles.previewBtn}
                        onClick={handleShowPreview}
                    >
                        🎮 動作を確認する
                    </button>
                )}
            </div>
        </div>
    );
}

export default StepTest;
