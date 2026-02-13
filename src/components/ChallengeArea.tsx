import { useState } from 'react';
import CodeEditor from './CodeEditor';
import { challenges } from '../data/challenges';
import { useAuth } from '../hooks/useAuth';
import { submissionService } from '../services/submissionService';
import styles from './ChallengeArea.module.css';

interface ChallengeAreaProps {
    stepId: string;
    onComplete: () => void;
}

function ChallengeArea({ stepId, onComplete }: ChallengeAreaProps) {
    const { user } = useAuth();
    const challenge = challenges[stepId];
    const [code, setCode] = useState(challenge?.initialCode || '');
    const [showHints, setShowHints] = useState(false);
    const [hintIndex, setHintIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [result, setResult] = useState<{ passed: boolean; details: string[] } | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    if (!challenge) {
        return (
            <div className={styles.challengeAreaEmpty}>
                <div className={styles.emptyBox}>
                    <span className={styles.emptyIcon}>🚧</span>
                    <h3 className={styles.emptyTitle}>
                        このステップのチャレンジは準備中です
                    </h3>
                    <p className={styles.emptyDescription}>
                        閲覧・練習モードで学習を進めましょう
                    </p>
                </div>
            </div>
        );
    }

    // コードチェック
    const checkCode = async () => {
        const passed: string[] = [];
        const failed: string[] = [];

        challenge.checkPoints.forEach(cp => {
            if (code.includes(cp)) {
                passed.push(`✅ "${cp}" が含まれています`);
            } else {
                failed.push(`❌ "${cp}" が見つかりません`);
            }
        });

        const allPassed = failed.length === 0;
        setResult({
            passed: allPassed,
            details: [...passed, ...failed]
        });

        if (user) {
            setIsSubmitting(true);
            try {
                await submissionService.saveSubmission(user.id, {
                    challengeId: stepId,
                    code,
                    status: allPassed ? 'passed' : 'failed',
                    errorMessage: failed.join('\n'),
                    executionTime: 0 // Mock execution time
                });
            } catch (error) {
                console.error('Submission failed:', error);
            } finally {
                setIsSubmitting(false);
            }
        }

        if (allPassed) {
            setTimeout(() => onComplete(), 1500);
        }
    };

    // リセット
    const resetCode = () => {
        setCode(challenge.initialCode);
        setResult(null);
        setShowSolution(false);
    };

    // 次のヒント
    const showNextHint = () => {
        setShowHints(true);
        if (hintIndex < challenge.hints.length - 1) {
            setHintIndex(hintIndex + 1);
        }
    };

    return (
        <div className={styles.challengeArea}>
            {/* ヘッダー */}
            <div className={styles.header}>
                <div className={styles.headerTop}>
                    <span className={styles.headerIcon}>🏆</span>
                    <h3 className={styles.headerTitle}>{challenge.title}</h3>
                </div>
                <p className={styles.headerDescription}>
                    {challenge.description}
                </p>
            </div>

            {/* エディタ */}
            <div className={styles.editorWrapper}>
                <div className={styles.editorToolbar}>
                    <div className={styles.editorDots}>
                        <span className={styles.dotRed} />
                        <span className={styles.dotYellow} />
                        <span className={styles.dotGreen} />
                    </div>
                    <span className={styles.editorLabel}>
                        TypeScript React
                    </span>
                </div>
                <CodeEditor
                    value={code}
                    onChange={setCode}
                    language="typescriptreact"
                    height="300px"
                />
            </div>

            {/* アクションボタン */}
            <div className={styles.actions}>
                <button
                    onClick={isSubmitting ? undefined : checkCode}
                    disabled={isSubmitting}
                    className={isSubmitting ? styles.btnCheckDisabled : styles.btnCheck}
                >
                    {isSubmitting ? '⏳ チェック中...' : '▶️ コードチェック'}
                </button>
                <button
                    onClick={showNextHint}
                    className={styles.btnHint}
                >
                    💡 ヒント ({showHints ? `${hintIndex + 1}/${challenge.hints.length}` : '?'})
                </button>
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    className={showSolution ? styles.btnSolutionActive : styles.btnSolution}
                >
                    {showSolution ? '📖 解答を隠す' : '📖 解答を見る'}
                </button>
                <button
                    onClick={resetCode}
                    className={styles.btnReset}
                >
                    🔄 リセット
                </button>
            </div>

            {/* ヒント表示 */}
            {showHints && (
                <div className={styles.hintBox}>
                    <h4 className={styles.hintTitle}>
                        💡 ヒント
                    </h4>
                    {challenge.hints.slice(0, hintIndex + 1).map((hint, i) => (
                        <p key={i} className={styles.hintItem}>
                            {i + 1}. {hint}
                        </p>
                    ))}
                </div>
            )}

            {/* 結果表示 */}
            {result && (
                <div className={result.passed ? styles.resultPassed : styles.resultFailed}>
                    <h4 className={result.passed ? styles.resultTitlePassed : styles.resultTitleFailed}>
                        {result.passed ? '🎉 素晴らしい！全てのチェックポイントをクリアしました！' : '🔍 チェック結果'}
                    </h4>
                    {result.details.map((detail, i) => (
                        <p key={i} className={detail.startsWith('✅') ? styles.detailPassed : styles.detailFailed}>
                            {detail}
                        </p>
                    ))}
                </div>
            )}

            {/* 模範解答 */}
            {showSolution && (
                <div className={styles.solutionWrapper}>
                    <div className={styles.solutionHeader}>
                        📖 模範解答
                    </div>
                    <CodeEditor
                        value={challenge.solutionCode}
                        onChange={() => { }}
                        language="typescriptreact"
                        height="300px"
                        readOnly
                    />
                </div>
            )}
        </div>
    );
}

export default ChallengeArea;
