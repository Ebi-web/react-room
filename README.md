# react-room

React 部屋で作る Todo アプリケーション

# DB(MySQL)

make コマンドが使える前提で作りました。
プロジェクトのルートディレクトリにある Makefile を使って、

## マイグレーションの確認

```bash
$ make flyway/info
```

## マイグレーションの実行

```bash
$ make flyway/migrate
```
