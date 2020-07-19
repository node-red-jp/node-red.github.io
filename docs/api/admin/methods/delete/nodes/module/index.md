---
layout: docs-api
toc: toc-api-admin.html
title: DELETE /nodes/:module
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - delete node
---

ノードを削除します。

必要となる権限: <code>nodes.write</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - 認証が有効になっている場合

### Arguments

Path Component | Description
---------------|------------
`module`       | モジュール名

### Response

Status Code | Reason           | Response
------------|------------------|--------------
`204`       | 成功             | _無し_
`400`       | 不正なリクエスト | [エラーを返す](/docs/api/admin/errors)
`401`       | 認証されなかった | _無し_
`404`       | 見つからなかった | _無し_
