import { useEffect, useRef, useState } from 'react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-bash';
import styles from './CodeBlock.module.css';

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
        <div className={styles.codeBlockWrapper}>
            <div className={styles.codeBlockHeader}>
                <span className={styles.codeBlockLang}>{language.toUpperCase()}</span>
                {showCopyButton && (
                    <button
                        className={`${styles.codeCopyBtn} ${copied ? styles.copied : ''}`}
                        onClick={handleCopy}
                    >
                        {copied ? '✓ コピー済み' : '📋 コピー'}
                    </button>
                )}
            </div>
            <div className={styles.codeBlockBody}>
                {showLineNumbers && (
                    <div className={styles.codeLineNumbers}>
                        {lines.map((_, i) => (
                            <span key={i}>{i + 1}</span>
                        ))}
                    </div>
                )}
                <pre className={styles.codeBlockPre}>
                    <code ref={codeRef} className={`language-${language}`}>
                        {code}
                    </code>
                </pre>
            </div>
        </div>
    );
}

export default CodeBlock;
