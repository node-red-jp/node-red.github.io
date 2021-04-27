---
layout: docs-api
toc: toc-api-context.html
title: Memoryストア
slug:
  - url: "/docs/api/context"
    label: "コンテキスト"
  - 'メモリ'
---

**バージョン0.19の新機能**

メモリコンテキストストアは、Node-REDによって使用されるデフォルトストアです。
すべてのコンテキストデータをメモリに保持し、Node-REDが再起動すると消去されます。
同期的アクセスも非同期的アクセスもサポートしています。

### 設定

メモリストアを作成する際、次の設定が利用できます。

{% highlight javascript %}
contextStorage: {
   default: {
       module:"memory",
   }
}
{% endhighlight %}

### オプション

メモリストアにはオプションとして指定できるものはありません。
