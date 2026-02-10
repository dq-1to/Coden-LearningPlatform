# Supabase 移行仕様書 (Final)

## 1. 概要
本ドキュメントは、現在ローカルストレージ（localStorage）で管理している学習データを、BaaSであるSupabase（PostgreSQL）へ移行するための仕様および手順をまとめたものである。

### 1-1. アーキテクチャ構成
**構成案: Vite + React SPA + Supabase (推奨)**
- フロントエンド: 既存のVite + React構成を維持
- バックエンド: Supabase (Auth, Database)
- **将来性への配慮**: 認証ロジック等はHooks (`useAuth`) に切り出し、将来的なNext.js移行時にも再利用可能な設計とする。

### 1-2. 目的
- **データ永続化**: ブラウザのキャッシュクリアやデバイス変更によるデータ消失を防ぐ
- **マルチデバイス対応**: PCやスマホなど複数の端末で学習進捗を同期可能にする
- **機能拡張**: チャレンジモードの回答履歴保存、ランキング機能などの基盤構築

## 2. データベース設計 (Schema Definition)

### 2-1. Profiles Table (`profiles`)
ユーザーの基本情報および集計済みポイントを管理。`auth.users` と1対1で紐づく。

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `uuid` | PK. References `auth.users.id`. Cascade Delete. |
| `username` | `text` | ユーザー名（表示用） |
| `avatar_url` | `text` | アバター画像URL |
| `total_pt` | `integer` | 現在の所持ポイント合計 (Default: 0) |
| `created_at` | `timestamptz` | Default: `now()` |
| `updated_at` | `timestamptz` | Default: `now()` |

### 2-2. Learning Stats Table (`learning_stats`)
ユーザーごとの学習統計サマリー。

| Column | Type | Description |
| :--- | :--- | :--- |
| `user_id` | `uuid` | PK. References `profiles.id`. |
| `total_study_time` | `integer` | 累計学習時間（秒） |
| `total_correct` | `integer` | 正解数合計 |
| `total_wrong` | `integer` | 不正解数合計 |
| `streak_days` | `integer` | 現在の連続学習日数 |
| `last_study_date` | `date` | 最終学習日 |
| `updated_at` | `timestamptz` | 更新日時 |

### 2-3. Step Progress Table (`step_progress`)
各ステップごとの詳細進捗データ。

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `bigint` | PK. Identity. |
| `user_id` | `uuid` | References `profiles.id`. |
| `step_id` | `text` | ステップID (例: 'counter', 'todo') |
| `is_completed` | `boolean` | 完了フラグ |
| `attempts` | `integer` | 試行回数 |
| `errors` | `integer` | エラー回数 |
| `best_time` | `integer` | ベストタイム（秒） |
| `last_attempt_at` | `timestamptz` | 最終試行日時 |

**Unique Constraint**: `(user_id, step_id)`

### 2-4. User Achievements Table (`user_achievements`)
獲得した実績の管理。

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `bigint` | PK. Identity. |
| `user_id` | `uuid` | References `profiles.id`. |
| `achievement_id` | `text` | 実績ID (例: 'first-complete') |
| `unlocked_at` | `timestamptz` | 解除日時 (Default: `now()`) |

**Unique Constraint**: `(user_id, achievement_id)`

### 2-5. Point History Table (`point_history`)
ポイント獲得履歴（ログ）。

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `bigint` | PK. Identity. |
| `user_id` | `uuid` | References `profiles.id`. |
| `amount` | `integer` | 獲得ポイント数 |
| `reason` | `text` | 獲得理由 (例: 'CORRECT_ANSWER') |
| `created_at` | `timestamptz` | Default: `now()` |

### 2-6. User Submissions Table (`user_submissions`) 【New】
チャレンジモード等のユーザー回答コード履歴。
同じ課題 (`challenge_id`) に対して複数回の回答を保存可能にするため、Unique制約は設けず、全ての試行を記録する。

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | `bigint` | PK. Identity. |
| `user_id` | `uuid` | References `profiles.id`. |
| `challenge_id` | `text` | 課題ID (例: 'challenge-1') |
| `code` | `text` | ユーザーが記述したコード |
| `status` | `text` | 実行結果 ('passed', 'failed', 'error') |
| `error_message` | `text` | エラー時のメッセージ (Optional) |
| `execution_time` | `integer` | 実行時間 (ms) |
| `submitted_at` | `timestamptz` | 回答日時 (Default: `now()`) |

## 3. RLS (Row Level Security) ポリシー
全テーブル共通で以下のポリシーを基本とする。

- **SELECT**: `auth.uid() = user_id` (自分のデータのみ参照可)
- **INSERT**: `auth.uid() = user_id` (自分のデータのみ作成可)
- **UPDATE**: `auth.uid() = user_id` (自分のデータのみ更新可)
- **DELETE**: `auth.uid() = user_id` (自分のデータのみ削除可)

※ `profiles` テーブルについては、トリガーを用いて `auth.users` 作成時に自動作成されるようにする。

## 4. 移行実装ステップ

### Step 1: プロジェクトセットアップ
1. Supabaseプロジェクトの作成
2. `.env` ファイルへの環境変数追加
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
3. 依存ライブラリのインストール
   - `npm install @supabase/supabase-js`

### Step 2: データベース構築
上記のスキーマ定義に基づき、SQLエディタまたはTable Editorでテーブルを作成し、RLSを有効化する。

### Step 3: Auth Context & Hooksの実装 (重要)
将来的なNext.js移行を見据え、認証ロジックを `useAuth` フックおよび `AuthContext` に完全にカプセル化する。

**インターフェース定義 (例):**
```ts
interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signIn: (provider: Provider) => Promise<void>;
  signOut: () => Promise<void>;
}
```
コンポーネント側では `supabase.auth.signIn...` を直接呼ばず、必ず `useAuth().signIn()` を経由させることで、バックエンド実装の変更に強い設計とする。

### Step 4: 既存Contextの改修
各Context (`StatsContext`, `AchievementContext`, `PtContext`) を以下のように改修する。

**例: StatsContext**
- **初期化**: localStorageからの読み込みをやめ、`useEffect` でSupabaseからデータをfetchする形に変更。
- **更新**: `setStats` と同時に、Supabaseへの `upsert` を実行するロジックに変更。
- **オフライン対応**: 一時的にlocalStorageに保存し、オンライン復帰時に同期するロジックを検討（Optional）。

### Step 5: チャレンジモードの実装
`user_submissions` テーブルへの保存処理を実装する。
回答送信時に `supabase.from('user_submissions').insert(...)` を実行し、成功・失敗にかかわらず履歴を残す。
履歴画面では `submitted_at` の降順でデータを取得し、過去の試行を表示できるようにする。

## 5. ディレクトリ構成案 (推奨)

```
src/
  ├── lib/
  │   └── supabase.ts      # Client初期化 (このファイル外でsupabase-jsを触らない)
  ├── hooks/
  │   └── useAuth.ts       # 認証ロジックのカスタムフック
  ├── context/
  │   └── AuthContext.tsx  # 認証状態のProvide
  ├── services/            # DBアクセスロジックの分離 (Repositoryパターンに近い構成)
  │   ├── statsService.ts
  │   ├── achievementService.ts
  │   ├── pointService.ts
  │   └── submissionService.ts # チャレンジ回答履歴用
  └── types/
      └── database.types.ts # Supabase型定義 (Generated)
```
