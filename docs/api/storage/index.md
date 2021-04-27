---
layout: docs-api
toc: toc-api-storage.html
title: Storage API
slug: storage
---

Node-REDランタイムがどこにデータを格納するか設定するための接続可能な方法を提供します。

このAPIは下記の情報を格納します:

 - フロー設定
 - フロークレデンシャル
 - ユーザ設定
 - ユーザセッション
 - ノードライブラリコンテンツ

デフォルトでは、Node-REDはこのAPIのローカルのファイルシステム実装を使用します。

APIの機能は [こちら](methods/) にドキュメントとしてまとまっています。

### 設定

settings.js内の `storageModule` プロパティは、カスタムモジュールを識別するために使用されます:

{% highlight javascript %}
storageModule: require("my-node-red-storage-plugin")
{% endhighlight %}

### Promises

APIは [JavaScriptのPromise](https://promisesaplus.com/) を広く利用しています。

Promiseは非同期処理の最終的な結果を表します。
結果が有効になるまで、プレースホルダーとして振る舞います。

Node-REDは [When.js](https://github.com/cujojs/when) ライブラリを使用しています。
下記が使用例です。より完全な例は `red/runtime/storage/localfilesystem.js` にある
デフォルトのファイルシステム実装です。

{% highlight javascript %}
function getFlows() {
    // create and return a promise
    return when.promise(function(resolve,reject) {
        // resolve - a function to be called with the successful result
        // reject - a function to be called if an error occurs

        // do some asynchronous work, with a callback on completion
        doAsyncWork(function(err,result) {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

getFlows()
    .then(function(result) {
        // Called when getFlows completes successfully
    })
    .otherwise(function(err) {
        // Called when getFlows hits an error
    });
{% endhighlight %}
