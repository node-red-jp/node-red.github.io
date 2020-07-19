---
layout: docs-api
toc: toc-api-admin.html
title: GET /nodes
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - get nodes
---

インストールされているノードの一覧を取得します。

必要となる権限: <code>nodes.read</code>

### Headers

Header          | Value
----------------|-------
`Accept`        | `application/json` または `text/html` - Responseセクションを参照
`Authorization` | `Bearer [token]` - 認証が有効になっている場合

### Response

Status Code | Reason           | Response
------------|------------------|--------------
`200`       | 成功             | `Accept` ヘッダによる。詳細は下記
`401`       | 認証されなかった | _無し_


#### Accept: application/json

[Node Set](/docs/api/admin/types#node-set) オブジェクトの配列を返す。
例:

{% highlight json %}
[
  {
    "id": "node-red/sentiment",
    "name": "sentiment",
    "types": [
      "sentiment"
    ],
    "enabled": true,
    "module": "node-red"
    "version": "0.10.6"
  }
]
{% endhighlight %}

#### Accept: text/html

インストールされているすべてのノードの
[HTMLファイル](/docs/creating-nodes/node-html) の内容を単一のレスポンスとして返します。
