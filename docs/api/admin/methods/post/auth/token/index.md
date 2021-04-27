---
layout: docs-api
toc: toc-api-admin.html
title: POST /auth/token
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - get token
---

アクセストークンを発行します。

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]`
`Content-type`             | `application/json`

### Arguments

リクエストボディは下記のようなJSON文字列とします:

Field        | Description
-------------|------------------------
`client_id`  | クライアントを特定します。現在は `node-red-admin` または `node-red-editor` とします。
`grant_type` | `password` とします。
`scope`      | スペース区切りの権限リストを指定します。現在は `*` または `read` とします。
`username`   | 認証に使用するユーザー名
`password`   | 認証に使用するパスワード


### Response

Status Code | Reason           | Response
------------|------------------|--------------
`200`       | 成功             | 下記例を参照
`401`       | 認証されなかった | _無し_

{% highlight json %}
{
  "access_token": "A_SECRET_TOKEN",
  "expires_in":604800,
  "token_type": "Bearer"
}
{% endhighlight %}
