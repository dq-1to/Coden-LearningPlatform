import { createContext, useContext, useState, ReactNode } from 'react';
import styles from './Preview.module.css';

// Step6: useContext - グローバルstate、コンテキストAPIを学ぶプレビュー

// テーマコンテキスト
interface ThemeContextType {
    theme: 'light' | 'dark';
    toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

// テーマプロバイダー
function ThemeProvider({ children }: { children: ReactNode }) {
    const [theme, setTheme] = useState<'light' | 'dark'>('light');

    const toggleTheme = () => {
        setTheme(theme === 'light' ? 'dark' : 'light');
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
}

// カスタムフック
function useTheme() {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeProvider');
    }
    return context;
}

// テーマ表示コンポーネント
function ThemeDisplay() {
    const { theme, toggleTheme } = useTheme();

    return (
        <div className={theme === 'dark' ? styles.themeDisplayDark : styles.themeDisplayLight}>
            <h4>現在のテーマ: {theme === 'dark' ? '🌙 ダーク' : '☀️ ライト'}</h4>
            <button
                onClick={toggleTheme}
                className={theme === 'dark' ? styles.themeBtnDark : styles.themeBtnLight}
            >
                テーマを切り替え
            </button>
        </div>
    );
}

// 子コンポーネント（Contextの値を使用）
function NestedComponent() {
    const { theme } = useTheme();

    return (
        <div className={theme === 'dark' ? styles.nestedDark : styles.nestedLight}>
            <p>👶 ネストされた子コンポーネント</p>
            <p className={styles.nestedHint}>
                propsを使わずにテーマを取得しています
            </p>
        </div>
    );
}

function ContextPreview() {
    return (
        <div className={styles.previewContent}>
            <ThemeProvider>
                <ThemeDisplay />
                <NestedComponent />
            </ThemeProvider>
        </div>
    );
}

export default ContextPreview;
