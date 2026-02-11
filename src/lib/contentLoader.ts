// コンテンツローダー: Markdownファイルからステップコンテンツを読み込む
// Viteの import.meta.glob + ?raw でビルド時にバンドル

// コンテンツMarkdownファイルの一括インポート
const contentModules = import.meta.glob('../content/steps/*.md', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

// コードサンプルファイルの一括インポート
const codeModules = import.meta.glob('../content/code/*.tsx', {
    query: '?raw',
    import: 'default',
    eager: true,
}) as Record<string, string>;

/**
 * ステップIDからMarkdownコンテンツを取得
 */
export function getStepContent(stepId: string): string {
    const key = `../content/steps/${stepId}.md`;
    return contentModules[key] || '';
}

/**
 * ステップIDからコードサンプルを取得
 */
export function getStepCode(stepId: string): string {
    const key = `../content/code/${stepId}.tsx`;
    return codeModules[key] || '';
}

/**
 * 全コンテンツが読み込み済みか確認
 */
export function getLoadedStepIds(): string[] {
    return Object.keys(contentModules).map(path => {
        const match = path.match(/\/([^/]+)\.md$/);
        return match ? match[1] : '';
    }).filter(Boolean);
}
