---
layout: docs-api
toc: toc-api-admin.html
title: POST /nodes
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - url: "/docs/api/admin/methods"
    label: "メソッド"
  - add node module
---

新しいノードモジュールをインストールします。

必要となる権限: <code>nodes.write</code>

### Headers

Header          | Value
----------------|-------
`Authorization` | `Bearer [token]` - 認証が有効になっている場合
`Content-type`  | `application/json` - if installing from a npm repository
`Content-type`  | `multipart/form-data` - if installing a tgz package


### Arguments

npmリポジトリからパッケージをインストールするとき、リクエストボディは下記のフィールドのようなJSON文字列でなければなりません:

Field    | Description
---------|-----------------------
`module` | npmリポジトリからインストールするNodeモジュール名、またはNodeモジュールを含むディレクトリのフルパス。 _注意_: このAPIは `.tgz` のようなファイルやバージョン修飾子など、npmのすべてのモジュール指定形式をサポートしているわけではありません。

{% highlight json %}
{
  "module": "node-red-node-suncalc"
}
{% endhighlight %}

If installing a tgz package the request body must be a `multipart/form-data` 

The following `curl` example will install `node-red-contrib-foo`.

{% highlight shell %}
curl -X POST http://localhost:1880/nodes -H "Content-Type: multipart/form-data" -F "tarball=@node-red-contrib-foo-1.0.3.tgz;type=application/x-compressed-tar;filename=node-red-contrib-foo-1.0.3.tgz"
{% endhighlight  %}

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
      "loaded": true,
      "module": "node-red-node-suncalc"
    }
  ]
}
{% endhighlight %}
