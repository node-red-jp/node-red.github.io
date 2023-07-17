---
layout: docs-api
toc: toc-api-admin.html
title: PUT /flow/:id
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - update flow
---

アクティブなフロー設定を更新します。
フローはタブとしてエディタ内に表示されます。

新しいフロー設定が開始される前に、既存のフロー内のすべてのノードが停止されます。

必要となる権限: <code>flows.write</code>

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - 認証が有効になっている場合
`Content-type`             | `application/json`

### Arguments

Path Component | Description
---------------|------------
`id`           | 更新するフローのid、もしくは `global`

リクエストボディは単一のフロー設定オブジェクトでなければなりません。

For a normal flow:
{% highlight json %}
{
  "id": "91ad451.f6e52b8",
  "label": "Sheet 1",
  "nodes": [ ],
  "configs": [ ]
}
{% endhighlight %}

For the global flow:
{% highlight json %}
{
  "id": "global",
  "configs": [ ],
  "subflows": [ ]
}
{% endhighlight %}



### Response

Status Code | Reason           | Response
------------|------------------|--------------
`204`       | 成功             | _無し_
`400`       | 不正なリクエスト | [エラーを返す](/docs/api/admin/errors)
`401`       | 認証されなかった | _無し_

フローの `id` を返します。

{% highlight json %}
{"id":"5a04dce3.a5fb24"}
{% endhighlight %}
