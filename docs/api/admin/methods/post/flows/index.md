---
layout: docs-api
toc: toc-api-admin.html
title: POST /flows
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - set flows
---

アクティブなフローの設定を行います。

必要となる権限: <code>flows.write</code>

### Headers

Header                     | Value
---------------------------|----------
`Authorization`            | `Bearer [token]` - 認証が有効になっている場合
`Content-type`             | `application/json`
`Node-RED-API-Version`     | (*バージョン0.15.0から*) 利用できます。何もセットされていない場合のデフォルトは　`v1` です。
`Node-RED-Deployment-Type` | `full`, `nodes`, `flows`, `reload` のいずれか


`Node-RED-Deployment-Type` ヘッダはデプロイの方法を決定するために使用されます。

 - `full` - 新しい設定が開始される前に、すべての既存のノードが停止されます。
   これはヘッダが指定されていない場合のデフォルトの挙動です。
 - `nodes` - 新しい設定が適用される前に、変更されたノードだけが停止されます。
 - `flows` - 新しい設定が適用される前に、変更されたノードを含むフローだけが停止されます。
 - `reload` - フローが再読込され、すべてのノードが再開されます。 (Node-RED 0.12.2 から)

### Arguments

リクエストボディのフォーマットは Node-RED API バージョンによって決まります。

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

`rev` プロパティが指定されている場合は、 `GET /flows` によって取得できるリビジョンと一致すべきです。

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

#### ノードクレデンシャルを設定する

リクエストでクレデンシャルを提示するには2つの方法があります。
`flows`配列のノードオブジェクトは`credentials`プロパティを持っており、
このプロパティはノードのクレデンシャルを保持しています。

また、トップレベルオブジェクトも`credentials`プロパティを持っており、
各々のノードのクレデンシャルまたは完全に暗号化された一連のクレデンシャルを持ちます。

**インラインノードクレデンシャル :**

{% highlight json %}
{
    "rev": "abc-123",
    "flows": [
      {
        "type": "tab",
        "id": "396c2376.c693dc",
        "label": "Sheet 1",
        "credentials": {
            "user": "my-username",
            "pass": "my-password"
        }
      }
    ]
}
{% endhighlight %}

**分割されたノードクレデンシャル :**


{% highlight json %}
{
    "rev": "abc-123",
    "flows": [
      {
        "type": "tab",
        "id": "396c2376.c693dc",
        "label": "Sheet 1"
      }
    ],
    "credentials": {
        "396c2376.c693dc": {
            "user": "my-username",
            "pass": "my-password"
        }
    }
}
{% endhighlight %}

**暗号化されたノードクレデンシャル:**

{% highlight json %}
{
    "rev": "abc-123",
    "flows": [
      {
        "type": "tab",
        "id": "396c2376.c693dc",
        "label": "Sheet 1"
      }
    ],
    "credentials": {
        "$": "beea417990012379ca6d4116bd1fda5bOWbwy7UnQvccxAEH1V1pSEETTfSNerYGvP4Aai6RT/DNpnjCCP/fdzildzlJhFjYcRKdO1Q="
    }
}
{% endhighlight %}}



### Response

Status Code | Reason              | Response
------------|---------------------|--------------
`200`       | `v2` 成功           | アクティブなフローの新しい `rev` が返されます。詳細は下記のとおり
`204`       | `v1` 成功           | _無し_
`400`       | 不正なAPIバージョン | [エラーを返す](/docs/api/admin/errors)
`401`       | 認証されなかった    | _無し_
`400`       | バージョン不一致    | [エラーを返す](/docs/api/admin/errors) 詳細は下記のとおり

`v1` APIが使用される場合、成功時はレスポンスボディを含みません。

`v2` APIの場合は、リクエストは `rev` を含まなければならず、最新の `rev` の値でなければなりません。
この値がランタイムのアクティブなフローの `rev` の値と一致すれば、リクエストは成功します。

この値が一致しない場合、ランタイムはより新しいバージョンのフローを使用していることを表し、
リクエストはステータスコード `409` とともに拒否されます。
これによりAPI呼び出し元は、差分を解消させリクエストを再送信できます。

API呼び出し元が強制的にデプロイを行いたい場合は、`rev` プロパティを省略してリクエストします。

リクエストが成功すると、レスポンスには新しい `rev` の値を返します。

{% highlight json %}
{
    "rev": "def-456",
}
{% endhighlight %}

*注意*: `rev` プロパティは文字列です。フォーマット上、他の制約はありません。
