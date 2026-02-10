import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';

interface CodeBlockProps {
    code: string;
    language?: string;
    showLineNumbers?: boolean;
    showCopyButton?: boolean;
}

function CodeBlock({
    code,
    language = 'jsx',
    showLineNumbers = true,
    showCopyButton = true
}: CodeBlockProps) {
    const codeRef = useRef<HTMLElement>(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        if (codeRef.current) {
            Prism.highlightElement(codeRef.current);
        }
    }, [code, language]);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch {
            // fallback
            const textarea = document.createElement('textarea');
            textarea.value = code;
            document.body.appendChild(textarea);
            textarea.select();
            document.execCommand('copy');
            document.body.removeChild(textarea);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const lines = code.split('\n');

    return (
        <div className="code-block-wrapper">
            <div className="code-block-header">
                <span className="code-block-lang">{language.toUpperCase()}</span>
                {showCopyButton && (
                    <button
                        className={`code-copy-btn ${copied ? 'copied' : ''}`}
                        onClick={handleCopy}
                    >
                        {copied ? '✓ コピー済み' : '📋 コピー'}
                    </button>
                )}
            </div>
            <div className="code-block-body">
                {showLineNumbers && (
                    <div className="code-line-numbers">
                        {lines.map((_, i) => (
                            <span key={i}>{i + 1}</span>
                        ))}
                    </div>
                )}
                <pre className="code-block-pre">
                    <code ref={codeRef} className={`language-${language}`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
}

export default CodeBlock;
