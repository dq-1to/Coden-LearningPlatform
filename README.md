# Coden - React Learning Platform (v1.0)

Coden（コーデン）は、Reactを基礎から応用まで段階的に学べるインタラクティブ学習プラットフォームです。
「読む・解く・テストする・書く」の4ステップサイクルにより、知識の定着と実装力の向上を同時に実現します。

## 🚀 主な機能

*   **19の学習ステップ**: 基礎文法からAPI連携まで、React開発に必要な知識を網羅。
*   **4段階学習フロー**:
    *   📖 **閲覧モード**: 公式ドキュメントに基づいた解説とサンプルコード。
    *   ✏️ **練習モード**: 穴埋め形式のクイズで重要構文を暗記。
    *   🧪 **テストモード**: 実際のコードの穴埋めテストで理解度をチェック。
    *   🏆 **チャレンジモード**: Monaco Editorを使った自由記述課題で実装力を鍛える。
*   **擬似バックエンド**: `json-server` を統合し、GET/POST/PATCH/DELETEなどのAPI通信を実践的に学習可能。
*   **Supabase連携**: ユーザー認証と学習データのクラウド同期機能。
*   **学習ダッシュボード**: 進捗状況、獲得Pt、連続学習日数（ストリーク）を可視化。
*   **プロフィール管理**: 学習履歴の確認、実績バッジのコレクション機能。

## 📦 インストールと起動

1.  **依存関係のインストール**
    ```bash
    npm install
    ```

2.  **環境変数の設定**
    ルートディレクトリに `.env` ファイルを作成し、Supabaseの接続情報を設定します。
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
    ```

3.  **アプリケーションの起動（推奨）**
    フロントエンドとバックエンド（APIサーバー）を同時に起動します。
    ```bash
    npm run dev:all
    ```
    ブラウザで `http://localhost:5173` にアクセスしてください。
    初回起動時はログイン画面が表示されます。「アカウント登録」からユーザーを作成して開始してください。

4.  **その他のコマンド**
    *   `npm run dev`: フロントエンドのみ起動（API連携機能は使えません）
    *   `npm run api`: バックエンド（json-server）のみ起動
    *   `npm run build`: プロダクションビルド
    *   `npm run preview`: ビルド後のプレビュー

## 📚 ディレクトリ構成

*   `src/data`: 学習コンテンツ（ステップ、問題、テスト、チャレンジ定義）
*   `src/components`: UIコンポーネント（CodeEditor, Steps, Previews等）
*   `src/pages`: ページコンポーネント（LearningView, Dashboard）
*   `server`: json-server用データベース (`db.json`) と設定

## 🛠️ 技術スタック

*   React 19 + Vite
*   TypeScript
*   Supabase (PostgreSQL, Auth)
*   Monaco Editor (`@monaco-editor/react`)
*   React Router v7
*   json-server
*   react-markdown

## 📝 仕様書

詳細な仕様については [docs/coden-v1.md](./docs/coden-v1.md) を参照してください。

> **Note**:  
> 本アプリケーションの学習コンテンツおよび解説は、**2026年2月時点の [React公式ドキュメント](https://react.dev/)** に基づいて作成されています。将来的なアップデートにより、最新の仕様と差異が生じる可能性があります。

## 💻 推奨環境

本アプリはPCでの学習を推奨しています。
*   **OS**: Windows, macOS, Linux
*   **Browser**: Google Chrome, Edge, Firefox, Safari (最新版)
*   **Create Note**: スマートフォン・タブレットではコードエディタ（Monaco Editor）の操作が困難な場合があります。

## ❓ トラブルシューティング

**Q. `npm run dev:all` がエラーになる**
A. ポート `3001` (API用) または `5173` (React用) が他のアプリで使用されていないか確認してください。

**Q. プレビューが表示されない**
A. ステップテストに合格（または全問正解）しないとプレビューは表示されません。まずは練習問題を解いてみてください。


