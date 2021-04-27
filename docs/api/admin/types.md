---
layout: docs-api
toc: toc-api-admin.html
title: 型
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - 型
---

以下の型は、APIメソッドで利用することができます。

慣習的に、フロー設定はノードオブジェクトのフラットな配列として
表現されてきました。

Node-RED 0.13以降、フロー（またはタブ）ごとに個別管理されるようにAPIが追加されました。
それらのAPIは、フロー設定により豊富なフォーマットを利用できます。
将来的には更に多くのフォーマットを利用できるように主なフロー設定を開発していきますが、
現在は2つのフォーマットを共存させなければなりません。


### Node

Nodeはフロー内の単一のノードの設定を表します。

{% highlight json %}
{
  "id": "123",
  "type": "inject",
  "x": 0,
  "y": 0,
  "z": "456",
  "wires": [ ... ]
}
{% endhighlight %}

フィールド     | 説明
----------|-----------------------
`id`      | ノードごとの一意なID
`type`    | ノードの種類
`x`,`y`   | フローが描画されるときのノードのx/y座標
`z`       | ノードが属するフロー、またはサブフロー
`wires`   | ノードの出力が接続されているワイヤー
*         | 特定の`type`で定義されるフィールド

ノードがConfigurationノードである場合、`x`, `y`および`wires`プロパティは存在してはいけません。

### Subflow

Subflowノードはサブフローの設定を表します。

{% highlight json %}
{
  "id": "6115be82.9eea4",
  "type": "subflow",
  "name": "Subflow 1",
  "info": "",
  "in": [{
    "x": 60,
    "y": 40,
    "wires": [{
      "id": "1830cc4e.e7cf34"
    }]
  }],
  "out": [{
    "x": 320,
    "y": 40,
    "wires": [{
      "id": "1830cc4e.e7cf34",
      "port": 0
    }]
  }],
  "configs": [ ... ],
  "nodes": [ ... ]
}
{% endhighlight %}

### Complete Flow configuration

Complete Flow configurationはランタイムで有効なフローのすべてを表します。
これはNodeオブジェクトのフラットな配列として表されます。`/flows`APIおよびエディタでのインポート/エクスポートによって、メインフローの書式として利用されます。

{% highlight json %}
[
  {
    "id": "1234",
    "type": "inject"
  },
  {
    "id": "5678",
    "type": "debug"
  }
]
{% endhighlight %}

*0.15.0以降*、`/flow`APIは`Node-RED-API-Version`ヘッダが`v2`に設定されている場合、新しいフォーマットをサポートしています。
このフォーマットは、上記のノードの配列を表示し、
フローにリビジョンIDを設定することが可能です。

{% highlight json %}
{
    "rev": "abc-123",
    "flows": [
      {
        "id": "1234",
        "type": "inject"
      },
      {
        "id": "5678",
        "type": "debug"
      }
    ]
}
{% endhighlight %}


### Single Flow configuration

Single Flow configurationは、エディタのタブとして表示される内容を表します。


{% highlight json %}
{
  "id": "1234",
  "label": "Sheet1",
  "nodes": [ ... ],
  "configs": [ ... ],
  "subflows": [ ... ]
}
{% endhighlight %}

フィールド      | 説明
-----------|-----------------------
`id`       | フローの一意なID
`label`    | フローのラベル
`nodes`    | フロー内のノードの配列
`configs`  | フローの設定の配列
`subflows` | フローのサブフローの配列 - `global`フロー設定である場合のみ



### Node Module

Node Moduleはnpmパッケージで提供されるNode Setの一覧を表します。

{% highlight json %}
{
  "name": "node-module-name",
  "version": "0.0.6",
  "nodes": [ ... ]
}
{% endhighlight %}

フィールド     | 説明
----------|-----------------------
`name`    | モジュール名 - `package.json`で定義されている名称
`version` | モジュールのバージョン - `package.json`で定義されているバージョン
`nodes`   | モジュールによって提供されるNode Setオブジェクトの配列

### Node Set

Node Setは、Node Module内の単一のファイルによって提供される型の一覧を表します。
[`node-red.nodes` property of the module's `package.json`](/docs/creating-nodes/packaging#packagejson)の
ドキュメントに該当します。

{% highlight json %}
{
  "id": "node-module-name/node-set-name",
  "name": "node-set-name",
  "types": [ ... ],
  "enabled": true,
  "module": "node-module-name",
  "version": "0.0.6"
}
{% endhighlight %}

フィールド     | 説明
---------|-----------------------
`id`     | Node SetのID - `module/name`
`name`   | Node Setの名称 - `package.json`で定義されている名称
`types`  | Node Setによって提供されるNode Typeの文字列の配列
`enabled`| Node Setが現在利用可能か否か
`module` | Node Setを提供しているモジュールの名称。`node-red`の値は、npmモジュールではなく、ノードがコピーされたファイルからロードされたことを示します。
