---
layout: docs-api
toc: toc-api-admin.html
title: POST /auth/revoke
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - revoke token
---

アクセストークンを取り消します。

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]`
`Content-type`             | `application/json`

### Arguments

リクエストボディは下記のようなJSON文字列とします:

Field   | Description
--------|------------------------
`token` | 無効化するトークン

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | 成功             | _無し_
`401`       | 認証されなかった | _無し_
