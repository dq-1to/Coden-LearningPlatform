// 自由記述チャレンジエリア
import { useState } from 'react';
import CodeEditor from './CodeEditor';
import { challenges } from '../data/challenges';

interface ChallengeAreaProps {
    stepId: string;
    onComplete: () => void;
}

function ChallengeArea({ stepId, onComplete }: ChallengeAreaProps) {
    const challenge = challenges[stepId];
    const [code, setCode] = useState(challenge?.initialCode || '');
    const [showHints, setShowHints] = useState(false);
    const [hintIndex, setHintIndex] = useState(0);
    const [showSolution, setShowSolution] = useState(false);
    const [result, setResult] = useState<{ passed: boolean; details: string[] } | null>(null);

    if (!challenge) {
        return (
            <div className="challenge-area" style={{ padding: '40px', textAlign: 'center' }}>
                <div style={{
                    background: '#f8fafc',
                    borderRadius: '16px',
                    padding: '32px',
                    border: '2px dashed #e2e8f0'
                }}>
                    <span style={{ fontSize: '3rem' }}>🚧</span>
                    <h3 style={{ color: '#64748b', marginTop: '12px' }}>
                        このステップのチャレンジは準備中です
                    </h3>
                    <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                        閲覧・練習モードで学習を進めましょう
                    </p>
                </div>
            </div>
        );
    }

    // コードチェック
    const checkCode = () => {
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
        <div className="challenge-area" style={{ padding: '16px' }}>
            {/* ヘッダー */}
            <div style={{
                background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                borderRadius: '12px',
                padding: '20px 24px',
                marginBottom: '16px',
                color: 'white'
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
                    <span style={{ fontSize: '1.5rem' }}>🏆</span>
                    <h3 style={{ margin: 0, fontSize: '1.1rem' }}>{challenge.title}</h3>
                </div>
                <p style={{ margin: 0, fontSize: '0.9rem', opacity: 0.9 }}>
                    {challenge.description}
                </p>
            </div>

            {/* エディタ */}
            <div style={{
                borderRadius: '12px',
                overflow: 'hidden',
                border: '2px solid #334155',
                marginBottom: '12px'
            }}>
                <div style={{
                    background: '#1e1e1e',
                    padding: '8px 16px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    borderBottom: '1px solid #334155'
                }}>
                    <div style={{ display: 'flex', gap: '6px' }}>
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#ef4444' }} />
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#eab308' }} />
                        <span style={{ width: 12, height: 12, borderRadius: '50%', background: '#22c55e' }} />
                    </div>
                    <span style={{ color: '#94a3b8', fontSize: '0.8rem' }}>
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
            <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', flexWrap: 'wrap' }}>
                <button
                    onClick={checkCode}
                    style={{
                        padding: '10px 24px',
                        background: '#4f46e5',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontWeight: 'bold',
                        fontSize: '0.9rem'
                    }}
                >
                    ▶️ コードチェック
                </button>
                <button
                    onClick={showNextHint}
                    style={{
                        padding: '10px 16px',
                        background: '#f59e0b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    💡 ヒント ({showHints ? `${hintIndex + 1}/${challenge.hints.length}` : '?'})
                </button>
                <button
                    onClick={() => setShowSolution(!showSolution)}
                    style={{
                        padding: '10px 16px',
                        background: showSolution ? '#6366f1' : '#64748b',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    {showSolution ? '📖 解答を隠す' : '📖 解答を見る'}
                </button>
                <button
                    onClick={resetCode}
                    style={{
                        padding: '10px 16px',
                        background: '#ef4444',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem'
                    }}
                >
                    🔄 リセット
                </button>
            </div>

            {/* ヒント表示 */}
            {showHints && (
                <div style={{
                    background: '#fffbeb',
                    border: '1px solid #fbbf24',
                    borderRadius: '8px',
                    padding: '12px 16px',
                    marginBottom: '12px'
                }}>
                    <h4 style={{ margin: '0 0 8px', color: '#b45309', fontSize: '0.9rem' }}>
                        💡 ヒント
                    </h4>
                    {challenge.hints.slice(0, hintIndex + 1).map((hint, i) => (
                        <p key={i} style={{ margin: '4px 0', fontSize: '0.85rem', color: '#92400e' }}>
                            {i + 1}. {hint}
                        </p>
                    ))}
                </div>
            )}

            {/* 結果表示 */}
            {result && (
                <div style={{
                    background: result.passed ? '#f0fdf4' : '#fef2f2',
                    border: `2px solid ${result.passed ? '#22c55e' : '#ef4444'}`,
                    borderRadius: '12px',
                    padding: '16px',
                    marginBottom: '12px'
                }}>
                    <h4 style={{
                        margin: '0 0 8px',
                        color: result.passed ? '#15803d' : '#dc2626',
                        fontSize: '1rem'
                    }}>
                        {result.passed ? '🎉 素晴らしい！全てのチェックポイントをクリアしました！' : '🔍 チェック結果'}
                    </h4>
                    {result.details.map((detail, i) => (
                        <p key={i} style={{
                            margin: '4px 0',
                            fontSize: '0.85rem',
                            color: detail.startsWith('✅') ? '#15803d' : '#dc2626'
                        }}>
                            {detail}
                        </p>
                    ))}
                </div>
            )}

            {/* 模範解答 */}
            {showSolution && (
                <div style={{
                    borderRadius: '12px',
                    overflow: 'hidden',
                    border: '2px solid #6366f1',
                    marginBottom: '12px'
                }}>
                    <div style={{
                        background: '#6366f1',
                        padding: '8px 16px',
                        color: 'white',
                        fontSize: '0.85rem',
                        fontWeight: 'bold'
                    }}>
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
