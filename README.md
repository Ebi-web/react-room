# react-room

React 部屋で作る Todo アプリケーション

# DB(MySQL)

make コマンドが使える前提で作りました。マイグレーション管理には flyway を使っています。
プロジェクトのルートディレクトリにある Makefile を使って、

## マイグレーションの確認

```bash
$ make flyway/info
```

## マイグレーションの実行

```bash
$ make flyway/migrate
```

## NOTE

- flyway は新たにマイグレーションを追加する場合に SQL ファイル名に以下のような命名規則があるので注意してください。

```
V[バージョン番号(整数or小数)]__[説明].sql
```

- バージョン番号の順にマイグレーションが実行されます。
- 説明の箇所には `create_users_table`のようにそのマイグレーションについての説明を記述してください。

# API(GraphQL)

## 新しく API 実装したい場合は

1. `schema.graphqls` に[Schema Definition Language](https://graphql.org/learn/schema/) を用いて新しい定義型なり関数のシグネチャを定義しませう
2. `go run github.com/99designs/gqlgen generate` で schema.resolvers.go に実装すべき関数が吐かれるので実装するのです。
3. 適宜 `resolvers.go` を編集してください。(説明雑。筆者もよく分かってない。)
