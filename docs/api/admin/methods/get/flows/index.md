---
layout: docs-api
toc: toc-api-admin.html
title: GET /flows
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - get flows
---

アクティブなフローの設定を取得します。

必要となる権限: <code>flows.read</code>

### Headers

Header                 | Value
-----------------------|-------
`Authorization`        | `Bearer [token]` - 認証が有効になっている場合
`Node-RED-API-Version` | (*バージョン0.15.0から*) 利用できます。何もセットされていない場合のデフォルトは　`v1` です。

### Response

Status Code | Reason              | Response
------------|---------------------|--------------
`200`       | 成功                | `v1` ノードオブジェクトの配列 <br/> `v2` 現在のリビジョンidを含むフローレスポンスオブジェクト
`400`       | 不正なAPIバージョン | [エラーを返す](/docs/api/admin/errors)
`401`       | 認証されなかった    | _無し_


#### `v1` - ノードオブジェクトの配列
{% highlight json %}
[
  {
    "type": "tab",
    "id": "396c2376.c693dc",
    "label": "Sheet 1"
  }
]
{% endhighlight %}

#### `v2` - フローレスポンスオブジェクト
{% highlight json %}
{
    "rev": "abc-123",
    "flows": [
      {
        "type": "tab",
        "id": "396c2376.c693dc",
        "label": "Sheet 1"
      }
    ]
}
{% endhighlight %}
