<!--
# 開発プロンプト

## 基本設計
1. "Next.js、TypeScript、Prismaを使用して、シンプルなメモアプリケーションを作成してください。
   - Google認証のみでログインできる
   - メモの作成、編集、削除ができる
   - レスポンシブデザインで、モバイルでも使いやすい
   - モダンなUIライブラリ（Shadcn UI）を使用"

## 認証機能
2. "Next.jsとNextAuthを使用して、Google認証を実装してください。
   - Googleアカウントでのログインのみ対応
   - JWTを使用した認証状態の永続化
   - ログアウト機能の実装
   - 未認証ユーザーのリダイレクト処理"

## データベース設計
3. "Prismaを使用して、以下のデータモデルを実装してください：
   - Userモデル（id, name, email, image, emailVerified）
   - Noteモデル（id, content, userId, createdAt, updatedAt）
   - UserとNoteの関連付け"

## UI/UXデザイン
4. "以下の要件でUIを実装してください：
   - メモは1行で表示し、長い内容は省略表示
   - メモの内容をクリックして直接編集可能
   - 編集中は外側クリックで保存
   - 削除はゴミ箱アイコンで、確認ダイアログ付き
   - 操作結果はトースト通知で表示"

## APIエンドポイント
5. "Next.jsのAPIルートで以下のエンドポイントを実装：
   - GET /api/notes: メモ一覧の取得
   - POST /api/notes: メモの作成
   - PATCH /api/notes/[noteId]: メモの更新
   - DELETE /api/notes/[noteId]: メモの削除
   - 各エンドポイントで適切なエラーハンドリング"

## コンポーネント設計
6. "以下のReactコンポーネントを実装：
   - Note: メモの表示、編集、削除機能
   - CreateNote: 新規メモ作成フォーム
   - LogoutButton: ログアウト処理
   - 各コンポーネントでローディング状態の管理"

## セキュリティ対策
7. "以下のセキュリティ対策を実装：
   - CSRF保護の設定
   - 認証済みユーザーのみアクセス可能な制御
   - 環境変数による機密情報の管理"
-->

# メモアプリ仕様書

## 概要
- Googleアカウントでログインして利用できるシンプルなメモアプリケーション
- Next.js、TypeScript、Prismaを使用した現代的なウェブアプリケーション
- モバイルフレンドリーなレスポンシブデザイン

## セットアップ手順

### 必要な環境
- Node.js 18.0.0以上
- SQLite（開発環境用）

### 1. プロジェクトのセットアップ
```bash
# リポジトリのクローン
git clone <repository-url>
cd <repository-name>

# 依存関係のインストール
npm install

# 環境変数の設定
cp .env.example .env
```

### 2. 環境変数の設定
`.env`ファイルを編集し、以下の項目を設定：

```env
# データベース接続設定
DATABASE_URL="file:./dev.db"

# NextAuth.js設定
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-super-secret-key-here"

# Google OAuth認証情報
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

### 3. データベースのセットアップ
```bash
# Prismaマイグレーションの実行
npx prisma migrate dev
```

### 4. 開発サーバーの起動
```bash
npm run dev
```

### 5. Google OAuth設定
1. [Google Cloud Console](https://console.cloud.google.com/)にアクセス
2. 新しいプロジェクトを作成
3. OAuth 2.0クライアントIDを作成
4. 承認済みのリダイレクトURIに以下を追加：
   - `http://localhost:3000/api/auth/callback/google`（開発環境）
5. 取得したクライアントIDとシークレットを`.env`に設定

## 開発ガイド

### プロジェクト構造
```
src/
├── app/                    # Nextアプリケーションのルート
│   ├── api/               # APIエンドポイント
│   │   ├── auth/         # 認証関連API
│   │   └── notes/        # メモ関連API
│   ├── page.tsx          # トップページ
├── components/            # Reactコンポーネント
│   ├── ui/               # 共通UIコンポーネント
│   ├── Note.tsx          # メモコンポーネント
│   ├── CreateNote.tsx    # メモ作成コンポーネント
│   └── LogoutButton.tsx  # ログアウトボタン
├── lib/                  # ユーティリティ関数
│   ├── auth.ts          # 認証設定
│   └── prisma.ts        # Prismaクライアント
└── prisma/              # データベース関連
    └── schema.prisma    # データベーススキーマ
```

### 主要コンポーネントの説明

#### Note.tsx
- メモの表示、編集、削除機能を提供
- インライン編集機能の実装
- 削除確認ダイアログの実装

#### CreateNote.tsx
- 新規メモの作成フォーム
- 1行テキストエリアの実装
- 作成時の自動保存機能

#### LogoutButton.tsx
- ログアウト機能の実装
- ローディング状態の管理
- トースト通知の実装

### APIエンドポイント

#### GET /api/notes
- ログインユーザーのメモ一覧を取得
- 作成日時の降順でソート

#### POST /api/notes
- 新規メモの作成
- 必須フィールド: content

#### PATCH /api/notes/[noteId]
- メモの内容を更新
- 必須フィールド: content

#### DELETE /api/notes/[noteId]
- メモの削除

## テスト

```bash
# ユニットテストの実行
npm run test

# E2Eテストの実行
npm run test:e2e
```

## デプロイ

### Vercelへのデプロイ
1. [Vercel](https://vercel.com)でアカウントを作成
2. プロジェクトをインポート
3. 環境変数を設定
4. デプロイを実行

### 本番環境の設定
1. 本番用のデータベースをセットアップ
2. 環境変数を本番用に更新
3. Google OAuth設定の更新（本番用のリダイレクトURIの追加）

## 認証機能
- Google OAuth2.0による認証
  - Googleアカウントのみでログイン可能
  - 認証状態の永続化（JWTを使用）
  - ログアウト機能

## メモ機能
### 表示
- メモの一覧表示
  - 作成日時の降順で表示
  - 1行表示でコンパクトなデザイン
  - 長いメモは自動的に省略表示

### 作成
- シンプルな入力フォーム
  - 1行テキストエリア
  - 内容のみの入力（タイトルなし）
- 作成時の自動保存

### 編集
- インライン編集機能
  - メモの内容をクリックして編集開始
  - 編集エリア外をクリックして保存
  - 変更がない場合は自動キャンセル

### 削除
- ゴミ箱アイコンによる削除機能
  - 削除前の確認ダイアログ
  - 削除の取り消しは不可

## UI/UX
### レイアウト
- ヘッダー部分
  - アプリタイトル表示
  - ログアウトボタン配置

- メインコンテンツ
  - メモ作成フォーム
  - メモ一覧表示

### デザイン要素
- モダンなUIコンポーネント
  - Shadcn UIを使用
  - アイコンはLucide Iconsを使用

### フィードバック
- トースト通知
  - メモの作成成功/失敗
  - メモの更新成功/失敗
  - メモの削除成功/失敗
  - ログイン/ログアウト時の通知

## データベース構造
### Userテーブル
- id: ユーザーID
- name: 名前
- email: メールアドレス
- image: プロフィール画像URL
- emailVerified: メール確認日時

### Noteテーブル
- id: メモID
- content: メモの内容
- userId: 作成者のID
- createdAt: 作成日時
- updatedAt: 更新日時

## セキュリティ
- CSRF対策
  - Next.jsの組み込みCSRF保護
- 認証チェック
  - 未認証ユーザーのアクセス制限
  - APIエンドポイントの保護
- 環境変数による機密情報の管理
  - Google OAuth認証情報
  - データベース接続情報

## エラーハンドリング
- API通信エラー
  - エラーメッセージの表示
  - 適切なHTTPステータスコードの返却
- 認証エラー
  - ログインページへのリダイレクト
  - エラーメッセージの表示
- データ操作エラー
  - ユーザーフレンドリーなエラーメッセージ
  - 失敗時の状態復元

## パフォーマンス最適化
- サーバーサイドレンダリング
- 効率的なデータフェッチング
- 適切なローディング状態の表示
