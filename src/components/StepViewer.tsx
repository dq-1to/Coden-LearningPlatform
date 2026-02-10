// 学習フレーム層 - ステップビューワー
// 解説テキストと完成コードを表示

import { ReactNode } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Step } from '../types';
import CodeBlock from './CodeBlock';

interface StepViewerProps {
    step: Step | undefined;
}

// 解説テキストをセクションごとにパースしてリッチに表示
// 【】記法のコンテンツはカスタムパーサーで処理し、
// Markdownコンテンツはreact-markdownでレンダリング
function renderContent(content: string): ReactNode[] {
    const lines = content.split('\n');
    const elements: ReactNode[] = [];
    let currentSection: string[] = [];
    let sectionTitle = '';
    let key = 0;
    let isLegacyFormat = false;

    // 【】記法があるかチェック
    for (const line of lines) {
        if (/^【(.+)】$/.test(line)) {
            isLegacyFormat = true;
            break;
        }
    }

    // Markdownフォーマット（【】がない）の場合
    if (!isLegacyFormat) {
        return [
            <div key="md-content" className="explanation-markdown">
                <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                        code({ className, children, ...props }) {
                            const match = /language-(\w+)/.exec(className || '');
                            const codeStr = String(children).replace(/\n$/, '');
                            if (match) {
                                return (
                                    <CodeBlock
                                        code={codeStr}
                                        language={match[1]}
                                        showLineNumbers={true}
                                        showCopyButton={true}
                                    />
                                );
                            }
                            return (
                                <code className="inline-code" {...props}>
                                    {children}
                                </code>
                            );
                        },
                    }}
                >
                    {content}
                </ReactMarkdown>
            </div>
        ];
    }

    // レガシー【】フォーマットの場合（既存パーサー）
    const flushSection = () => {
        if (currentSection.length > 0 || sectionTitle) {
            elements.push(
                <div key={key++} className="explanation-section-block">
                    {sectionTitle && (
                        <h4 className="explanation-subtitle">{sectionTitle}</h4>
                    )}
                    <div className="explanation-body">
                        {currentSection.map((line, i) => {
                            // コード行
                            if (/^(const |let |var |import |function |return |if |switch |useEffect|useMemo|useCallback|\{|<|・省略)/.test(line.trim())) {
                                return <code key={i} className="inline-code-line">{line}</code>;
                            }
                            // リスト項目
                            if (line.trim().startsWith('・')) {
                                return <li key={i} className="explanation-list-item">{line.trim().substring(1)}</li>;
                            }
                            // 空行
                            if (line.trim() === '') {
                                return <br key={i} />;
                            }
                            // 通常テキスト
                            return <p key={i} className="explanation-paragraph">{line}</p>;
                        })}
                    </div>
                </div>
            );
            currentSection = [];
            sectionTitle = '';
        }
    };

    for (const line of lines) {
        const titleMatch = line.match(/^【(.+)】$/);
        if (titleMatch) {
            flushSection();
            sectionTitle = titleMatch[1];
            continue;
        }
        currentSection.push(line);
    }
    flushSection();

    return elements;
}

function StepViewer({ step }: StepViewerProps) {
    if (!step) {
        return <div className="step-viewer">ステップを選択してください</div>;
    }

    return (
        <div className="step-viewer">
            {/* 解説セクション */}
            <section className="explanation-section">
                <h3 className="section-title">📖 解説</h3>
                <div className="explanation-content">
                    {renderContent(step.content)}
                </div>
                <a
                    href={step.docSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="doc-link"
                >
                    📄 React公式ドキュメントを見る
                </a>
            </section>

            {/* コードサンプル */}
            <section className="code-section">
                <h3 className="section-title">💻 サンプルコード</h3>
                <CodeBlock
                    code={step.code}
                    language="jsx"
                    showLineNumbers={true}
                    showCopyButton={true}
                />
            </section>
        </div>
    );
}

export default StepViewer;
