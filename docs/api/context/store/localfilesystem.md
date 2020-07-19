---
layout: docs-api
toc: toc-api-context.html
title: Fileストア
slug:
  - url: "/docs/api/context"
    label: "コンテキスト"
  - 'ファイルシステム'
---

**バージョン0.19の新機能**

ローカルファイルシステムのコンテキストストアはコンテキストデータをローカルファイルに保持します。
デフォルトでは、コンテキストデータをメモリに格納し、同期的アクセスも非同期的アクセスも許可します。

キャッシュモードはdisabledになっている場合は、非同期アクセスのみをサポートします。

### 設定

ファイルストアを作成する際、次の設定が利用できます。

{% highlight javascript %}
contextStorage: {
   default: {
       module:"localfilesystem",
       config: {
           // see below
       }
   }
}
{% endhighlight %}

### オプション

ファイルストアは次に示す設定オプションが指定できます:

オプション      | 説明
----------------|------------------------------
`dir`           | 保存先の `base` となるディレクトリ。デフォルトではユーザディレクトリ `~/.node-red` となる
`base`          | コンテキストデータを格納するベースディレクトリ。デフォルトでは `"context"`
`cache`         | コンテキストをキャッシュするかどうか。デフォルトでは `true`
`flushInterval` | キャッシュが有効な場合、ストレージへの最小書き込み間隔。秒数表記となり、デフォルトでは `30`

`file` コンテキストストアのデフォルト設定は、`~/.node-red/context` ディレクトリを使用し、
キャッシュが有効になっており、30秒ごとにストレージへ書き込みます。

Raspberry PiのSDカードでの利用など、`flushInterval` はストレージへの利用を最小限に抑えるため利用できます。
ただ、Node-REDが予期せずkillされると、flushされていないデータは消えることに注意してください。

### 実装の詳細

このコンテキストストアは、コンテキストスコープごとに別々のファイルを使用します。
トップレベルには各フローのスコープと1つのグローバルスコープのディレクトリがあります。
各フロースコープのディレクトリ内に、フロースコープを含む `flow.json` と、各ノードコンテキストのファイルです。

```
   $HOME/.node-red/context
     ├── global
     │     └── global.json
     ├── <id of Flow 1>
     │     ├── flow.json
     │     ├── <id of Node a>.json
     │     └── <id of Node b>.json
     └── <id of Flow 2>
           ├── flow.json
           ├── <id of Node x>.json
           └── <id of Node y>.json
```
