---
layout: docs-api
toc: toc-api-admin.html
title: GET /nodes/:module
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - get module info
---

ノードの情報を取得します。

必要となる権限: <code>nodes.read</code>

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
`200`       | 成功             | [Node Module](/docs/api/admin/types#node-module) オブジェクト。レスポンスボディの例を参照
`400`       | 不正なリクエスト | [エラーを返す](/docs/api/admin/errors)
`401`       | 認証されなかった | _無し_
`404`       | 見つからなかった | _無し_


{% highlight json %}
{
  "name": "node-red-node-suncalc",
  "version": "0.0.6",
  "nodes": [
    {
      "id": "node-red-node-suncalc/suncalc",
      "name": "suncalc",
      "types": [
        "sunrise"
      ],
      "enabled": true,
      "module": "node-red-node-suncalc",
      "version": "0.0.6"
    }
  ]
}
{% endhighlight %}
