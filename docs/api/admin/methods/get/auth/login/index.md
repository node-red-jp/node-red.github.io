---
layout: docs-api
toc: toc-api-admin.html
title: GET /auth/login
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - get auth
---
アクティブな認証スキームを取得します。

### Response

Status Code | Reason         | Response
------------|----------------|--------------
`200`       | 成功           | 下記例を参照

現在のバージョンでは、2種類のレスポンスを返します。

#### アクティブな認証スキームがない場合

    {}

#### 認証情報ベースの場合

{% highlight json %}
{
  "type": "credentials",
  "prompts": [
    {
      "id": "username",
      "type": "text",
      "label": "Username"
    },
    {
      "id": "password",
      "type": "password",
      "label": "Password"
    }
  ]
}
{% endhighlight %}

`prompts` フィールドは [トークンの発行](../../../post/auth/token) で
どのフィールドが必須かを示します。
