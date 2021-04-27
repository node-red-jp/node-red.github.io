---
layout: docs-api
toc: toc-api-admin.html
title: POST /flow
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - add flow
---

アクティブな設定にフローを追加します。
フローはエディタ内でタブとして表示されます。

必要となる権限: <code>flows.write</code>

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - 認証が有効になっている場合
`Content-type`             | `application/json`

### Arguments

リクエストボディは単一のフロー設定オブジェクトでなければなりません。

{% highlight json %}
{
  "id": "91ad451.f6e52b8",
  "label": "Sheet 1",
  "nodes": [ ],
  "configs": [ ]
}
{% endhighlight %}

設定オブジェクトには最低でも `nodes` プロパティを含めます。

ランタイムはフローに新しいidを割り当てます。
フロー設定オブジェクトが `id` フィールドを持っている場合でもそれは上書きされ、
属するノードのすべての `z` プロパティにも設定されます。

フローに属するすべてのノードは一意の `id` プロパティを持ちます。
`id` が既に使用されている場合、リクエストは却下されます。

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
