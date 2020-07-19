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
[<span>GET</span>/auth/login](get/auth/login)               | アクティブな認証スキームを取得する
[<span>POST</span>/auth/token](post/auth/token)             | アクセストークンを発行する
[<span>POST</span>/auth/revoke](post/auth/revoke)           | アクセストークンを取り消す
[<span>GET</span>/settings](get/settings)                   | ランタイムの設定を取得する
[<span>GET</span>/flows](get/flows)                         | アクティブなフローの設定を取得する
[<span>POST</span>/flows](post/flows)                       | アクティブなフローの設定を行う
[<span>POST</span>/flow](post/flow)                         | アクティブな設定にフローを追加する
[<span>GET</span>/flow/:id](get/flow)                       | フローの設定を取得する
[<span>PUT</span>/flow/:id](put/flow)                       | フローの設定を更新する
[<span>DELETE</span>/flow/:id](delete/flow)                 | フローを削除する
[<span>GET</span>/nodes](get/nodes)                         | インストールされたノードの一覧を取得する
[<span>POST</span>/nodes](post/nodes)                       | ノードをインストールする
[<span>GET</span>/nodes/:module](get/nodes/module)          | ノードの情報を取得する
[<span>PUT</span>/nodes/:module](put/nodes/module)          | ノードの有効・無効を設定する
[<span>DELETE</span>/nodes/:module](delete/nodes/module)    | ノードを削除する
[<span>GET</span>/nodes/:module/:set](get/nodes/module/set) | Node Setの情報を取得する
[<span>PUT</span>/nodes/:module/:set](put/nodes/module/set) | Node setの有効・無効を設定する
