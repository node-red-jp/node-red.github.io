---
layout: docs-api
toc: toc-api-admin.html
title: エラー
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - エラー
---

すべてのAPIメソッドは一般的なHTTPレスポンスコードを利用して、成功または失敗を表します。

ステータスコード | 理由
------------|------------------
`200`       | Success - 結果はレスポンスコンテンツになります
`204`       | Success - これ以上のコンテンツはありません
`400`       | Bad request - 下記のレスポンスフォーマットを参照してください
`401`       | Not authorized - [認証](oauth.html)を参照してください
`404`       | Not found - リソースが見つかりませんでした
`409`       | Version mismatch - [`POST /flows`](methods/post/flows)を参照してください
`500`       | Server Error - サーバーで問題が発生しました

### エラー応答

レスポンスコートが`400`の場合、
レスポンス本体は以下のフィールドを含むJSONオブジェクトになります。:

フィールド     | 説明
----------|-----------------------
`code`    | エラーコード
`message` | エラーの説明

    {
      code: "module_already_loaded",
      message: "Module already loaded"
    }

#### エラーコード

コード                    | 説明
------------------------|-----------------------
`unexpected_error`      | 予期しないエラーが発生しました
`invalid_request`       | リクエストに無効なパラメータが含まれています
`settings_unavailable`  | ストレージシステムは設定の変更をサポートしていません
`module_already_loaded` | 要求されたモジュールは既にロードされています
`type_in_use`           | リクエストは現在使用されているNodeタイプを削除または無効にしようとしています
`invalid_api_version`       | リクエストが`Node-RED-API-Version` ヘッダに無効なAPIバージョンを指定しました
