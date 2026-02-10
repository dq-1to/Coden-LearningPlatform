// Monaco Editorラッパーコンポーネント
import Editor from '@monaco-editor/react';

interface CodeEditorProps {
    value: string;
    onChange: (value: string) => void;
    language?: string;
    height?: string;
    readOnly?: boolean;
}

function CodeEditor({ value, onChange, language = 'typescript', height = '400px', readOnly = false }: CodeEditorProps) {
    return (
        <div className="code-editor-wrapper">
            <Editor
                height={height}
                language={language}
                value={value}
                onChange={(val) => onChange(val || '')}
                theme="vs-dark"
                options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: 'on',
                    roundedSelection: true,
                    scrollBeyondLastLine: false,
                    automaticLayout: true,
                    tabSize: 4,
                    wordWrap: 'on',
                    readOnly,
                    padding: { top: 12, bottom: 12 },
                    suggestOnTriggerCharacters: true,
                    quickSuggestions: true,
                }}
            />
        </div>
    );
}

export default CodeEditor;
