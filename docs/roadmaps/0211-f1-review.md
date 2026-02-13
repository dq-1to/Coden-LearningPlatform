# PR #5 レビュー指摘事項 — 即対応リスト

> Phase1 コード品質改善 PR レビューで検出された即対応すべき改善点

---

## 優先度: 高（すぐに対応）

### 1. `Sidebar.module.css` 末尾の不要なドット削除

- **ファイル**: `src/components/Sidebar.module.css` (341行目付近)
- **内容**: ファイル末尾に意味のない `.` が残存
- **リスク**: CSSパース時に予期せぬ動作を引き起こす可能性
- **対応**: 該当の `.` を削除
- **工数**: 1分

---

### 2. `PreviewArea.module.css` と `Preview.module.css` のスタイル重複統合

- **ファイル**:
  - `src/components/PreviewArea.module.css`
  - `src/components/previews/Preview.module.css`
- **内容**: `counterDisplay`, `todoInputArea` 等の同一スタイル定義が両ファイルに存在
- **リスク**: 修正時に片方だけ更新し見た目が崩れる。保守性が低い
- **対応**: Preview系スタイルは `Preview.module.css` に一本化し、`PreviewArea.module.css` の重複定義を削除。importを修正
- **工数**: 15〜30分

---

## 優先度: 中（次スプリントで対応）

### 3. `ChallengeArea.module.css` のハードコードカラー → CSS変数統一

- **ファイル**: `src/components/ChallengeArea.module.css`
- **内容**: `#4f46e5`, `#ef4444` 等の直接カラーコードが使用されており、`index.css` で定義済みのCSS変数（`var(--teal-400)` 等）と統一されていない
- **リスク**: テーマ変更やダークモード対応時に一括変更が困難
- **対応**: ハードコードカラーを対応するCSS変数に置換。不足する変数は `index.css` に追加
- **工数**: 30分〜1時間

---

### 4. `LearningView.module.css` と `StepViewer.module.css` の共通スタイル整理

- **ファイル**:
  - `src/pages/LearningView.module.css`
  - `src/components/StepViewer.module.css`
- **内容**: `viewModeHint`, `hintBoxLarge`, `hintIcon` 等が両ファイルに存在
- **リスク**: 同一用途のスタイルが分散し、変更漏れが発生しやすい
- **対応**: 共通スタイルを `src/styles/shared.module.css` 等に切り出し、両コンポーネントからimport
- **工数**: 30分〜1時間

---

## 対応スケジュール

| # | 項目 | 優先度 | 工数 | 対応時期 |
|---|------|--------|------|---------|
| 1 | Sidebar末尾ドット削除 | 高 | 1分 | 即対応 |
| 2 | Preview CSS重複統合 | 高 | 15〜30分 | 即対応 |
| 3 | ChallengeArea CSS変数統一 | 中 | 30分〜1時間 | 次スプリント |
| 4 | 共通スタイル切り出し | 中 | 30分〜1時間 | 次スプリント |
