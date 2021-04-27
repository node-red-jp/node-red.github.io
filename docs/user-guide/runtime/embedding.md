---
layout: docs-user-guide
toc: toc-user-guide.html
title: 既存アプリケーションへの組込み
slug: 組込み
redirect_from:
  - /docs/embedding
  - /docs/user-guide/embedding
---

既存のより大きなアプリケーションにNode-REDを組込むことが可能です。
典型的なシナリオとしては、同一のアプリケーションでwebダッシュボードにデータを表示するフローの作成をおこなうために
Node-REDを利用することが考えられます。


自分のアプリケーションの`package.json`の依存モジュールに`node-red`を追加し、
利用している個々のノードの依存関係も追加します。

以下の例はNode-REDを
Expressアプリケーションへ組込むミニマムな構成です。

{% highlight javascript %}
var http = require('http');
var express = require("express");
var RED = require("node-red");

// Expressアプリケーションの生成
var app = express();

// 静的コンテンツのルートを追加
app.use("/",express.static("public"));

// サーバの生成
var server = http.createServer(app);

// 設定オブジェクトの生成 - 他のオプションについてはデフォルトの 'settings.js' ファイルを参照してください
var settings = {
    httpAdminRoot:"/red",
    httpNodeRoot: "/api",
    userDir:"/home/nol/.nodered/",
    functionGlobalContext: { }    // グローバルコンテキストを有効化
};

// サーバと設定とランタイムの初期化
RED.init(server,settings);

// エディタUIのルートを '/red' に指定
app.use(settings.httpAdminRoot,RED.httpAdmin);

// HTTP node UIのルートを '/api' に指定
app.use(settings.httpNodeRoot,RED.httpNode);

server.listen(8000);

// ランタイム起動
RED.start();
{% endhighlight %}

この方法を利用するとき、Node-REDに含まれている`settings.js`ファイルは利用されません。
代わりに、上記のように設定を`RED.init`関数に渡します。

更に以下の設定は既存アプリケーションで決められるべきなので
無効化されます。

 - `uiHost`
 - `uiPort`
 - `httpAdminAuth`
 - `httpNodeAuth`
 - `httpStatic`
 - `httpStaticAuth`
 - `https`
