---
layout: docs-api
toc: toc-api-admin.html
title: GET /flow/:id
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - get flow
---

個別のフロー設定を取得します。
フローはタブとしてエディタ内に表示されます。

必要となる権限: <code>flows.read</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - 認証が有効になっている場合

### Arguments

Path Component | Description
---------------|------------
`id`           | フローのid

`id` が `global` に設定されている場合、
グローバルに設定されているノードとサブフローの設定が返されます。

### Response

Status Code | Reason                   | Response
------------|--------------------------|--------------
`200`       | Success                  | フローオブジェクト。下記例を参照
`401`       | 認証されなかった         | _無し_
`404`       | フローが見つからなかった | _無し_

{% highlight json %}
{
  "id": "91ad451.f6e52b8",
  "label": "Sheet 1",
  "nodes": [ ],
  "configs": [ ],
  "subflows": [ ]
}
{% endhighlight %}
