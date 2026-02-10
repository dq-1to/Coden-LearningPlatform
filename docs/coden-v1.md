# Coden v1.0 仕様書

## 1. アプリケーション概要
**Coden (コーデン)** は、React完全初心者が「基礎」から「実践的なAPI連携」までを段階的に学習できるワンストップ・プラットフォームです。
「読む → 埋める → テストする → 書く」の4段階学習フローにより、知識の定着と実装力の向上を同時に実現します。

---

## 2. ターゲットユーザー
- **React 初学者**: HTML/CSS/JSの基礎はあるがReactは初めての人
- **初級者脱却を目指す人**: チュートリアルはやったが「自分でコードが書けない」人
- **API連携を学びたい人**: フロントエンドとバックエンドの通信（非同期処理）を実践したい人

---

## 3. 主要機能 (Features)

### 3-1. 4段階学習フロー
各学習ステップは以下の4つのモードで構成されます。

1. **📖 閲覧モード (View Mode)**
   - 公式ドキュメントに基づいた解説
   - シンタックスハイライト付きのサンプルコード
   - 目的: 概念の理解

2. **✏️ 練習モード (Practice Mode)**
   - 穴埋め形式のクイズ（5〜6問/ステップ）
   - 即時正誤判定
   - 目的: 重要構文の暗記・定着

3. **🧪 テストモード (Test Mode)**
   - 実際のコンポーネントコードの穴埋めテスト
   - 合格するとプレビュー（実行結果）が解禁される
   - 目的: コードリーディングと修正能力の確認

4. **🏆 チャレンジモード (Challenge Mode)**
   - 自由記述形式の課題（Monaco Editor使用）
   - 仕様（要件）だけが与えられ、ゼロから実装する
   - キーワード判定による自動採点 + 模範解答の確認
   - 目的: 実装力・応用力の獲得

### 3-2. ダッシュボード & 進捗管理
- 全19ステップの進捗一覧表示
- 獲得Pt（経験値）とレベルシステム
- 連続学習日数（ストリーク）の記録
- 実績バッジの解除（例：「初チャレンジクリア」「3日連続学習」）

### 3-3. 擬似バックエンド環境
- `json-server` を利用したRESTful API
- エンドポイント: `/api/counter`, `/api/tasks`
- 対応メソッド: GET, POST, PATCH, DELETE
- 役割: 実際のHTTP通信を用いた非同期処理の学習

---

## 4. 学習カリキュラム (Curriculum)

### 基礎コース (11 Steps)
Reactの基本概念を網羅。
1. `jsx`: JSXのルール
2. `props`: Propsによるデータ受け渡し
3. `usestate`: useStateとイベントハンドラ
4. `conditional`: 条件付きレンダリング
5. `lists`: リスト表示 (map)
6. `forms`: フォーム入力と制御コンポーネント
7. `useeffect`: 副作用とライフサイクル
8. `custom-hooks`: カスタムフックの基本
9. `context`: Context APIによる状態共有
10. `performance`: メモ化 (useMemo, useCallback)
11. `testing`: テストの基礎

### API連携コース (8 Steps)
非同期処理とデータ管理の実践。
1. `api-counter-get`: fetchでのデータ取得
2. `api-counter-post`: POSTリクエスト
3. `api-tasks-list`: 配列データの取得と表示
4. `api-tasks-create`: フォームからのデータ送信
5. `api-tasks-update`: 楽観的更新
6. `api-tasks-delete`: 削除処理
7. `api-custom-hook`: データフェッチのフック化
8. `api-error-loading`: ローディング・エラー状態の管理

---

## 5. 技術スタック (Tech Stack)

### Frontend
- **Framework**: React / Vite
- **Language**: TypeScript
- **State Management**: React Context (Redux等は未使用)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Markdown**: `react-markdown`, `remark-gfm`
- **Routing**: React Router v7
- **Testing**: Vitest, React Testing Library
- **Styling**: Pure CSS (CSS Variables)

### Backend (Mock)
- **Server**: json-server
- **Runtime**: Node.js

---

## 6. データ構造

### Step (学習ステップ)
```typescript
interface Step {
    id: string;
    title: string;
    description: string;
    content: string; // Markdown解説
    code: string;    // サンプルコード
    courseId: string;
}
```

### Challenge (自由記述課題)
```typescript
interface Challenge {
    id: string; // Step IDと対応
    title: string;
    description: string;
    initialCode: string;   // エディタ初期値
    solutionCode: string;  // 模範解答
    hints: string[];
    checkPoints: string[]; // 判定用キーワード
}
```

---

## 7. ディレクトリ構成

```
src/
├── components/      # UIコンポーネント (Button, Header等)
│   ├── previews/    # 各ステップの実行結果プレビュー
│   └── ...
├── context/         # 全体状態 (Stats, Pt, Achievements)
├── data/            # 学習コンテンツ (Steps, Exercises, Challenges)
├── hooks/           # カスタムフック (KeyboardShortcuts等)
├── pages/           # ページコンポーネント (Dashboard, LearningView)
├── styles/          # CSSファイル群
└── types/           # TypeScript型定義
server/
├── db.json          # モックデータベース
└── routes.json      # APIルーティング定義
```

---

## 8. 補足事項
本仕様書の学習カリキュラムおよび解説テキストは、**2026年2月時点の [React公式ドキュメント](https://react.dev/)** を参照して作成されています。Reactの破壊的変更やドキュメントの改訂に伴い、内容の修正が必要になる場合があります。

