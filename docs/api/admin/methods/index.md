---
layout: docs-api
toc: toc-api-admin.html
title: Admin API Methods
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - メソッド

---

 Endpoint                                                   | Description
------------------------------------------------------------|-------------------------
[<span class="method">GET</span>/auth/login](get/auth/login)               | アクティブな認証スキームを取得する
[<span class="method">POST</span>/auth/token](post/auth/token)             | アクセストークンを発行する
[<span class="method">POST</span>/auth/revoke](post/auth/revoke)           | アクセストークンを取り消す
[<span class="method">GET</span>/settings](get/settings)                   | ランタイムの設定を取得する
[<span class="method">GET</span>/flows](get/flows)                         | アクティブなフローの設定を取得する
[<span class="method">POST</span>/flows](post/flows)                       | アクティブなフローの設定を行う
[<span class="method">POST</span>/flow](post/flow)                         | アクティブな設定にフローを追加する
[<span class="method">GET</span>/flow/:id](get/flow)                       | フローの設定を取得する
[<span class="method">PUT</span>/flow/:id](put/flow)                       | フローの設定を更新する
[<span class="method">DELETE</span>/flow/:id](delete/flow)                 | フローを削除する
[<span class="method">GET</span>/nodes](get/nodes)                         | インストールされたノードの一覧を取得する
[<span class="method">POST</span>/nodes](post/nodes)                       | ノードをインストールする
[<span class="method">GET</span>/nodes/:module](get/nodes/module)          | ノードの情報を取得する
[<span class="method">PUT</span>/nodes/:module](put/nodes/module)          | ノードの有効・無効を設定する
[<span class="method">DELETE</span>/nodes/:module](delete/nodes/module)    | ノードを削除する
[<span class="method">GET</span>/nodes/:module/:set](get/nodes/module/set) | Node Setの情報を取得する
[<span class="method">PUT</span>/nodes/:module/:set](put/nodes/module/set) | Node setの有効・無効を設定する