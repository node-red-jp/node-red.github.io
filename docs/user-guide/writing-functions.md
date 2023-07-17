---
layout: docs-user-guide
toc: toc-user-guide.html
title: Functionノードの書き方
slug: Functionノード
redirect_from:
  - /docs/writing-functions
---

Functionノードは、受け取ったメッセージに対してJavaScriptコードを実行することができ、
フローを継続するためにゼロ個以上のメッセージを返します。

メッセージは`msg`と呼ばれる一つのオブジェクトとして渡されます。
このオブジェクトは慣例により、メッセージ本体を含む`msg.payload`プロパティを持っています。

独自のプロパティをメッセージに追加することも可能ですが、
そのことをドキュメントに記載するべきです。

### Functionの作成

Functionノードに入力されたコードは、関数の*本体*に相当します。
最も単純な関数は、メッセージを単にそのまま返す場合です。:

{% highlight javascript %}
return msg;
{% endhighlight %}

Functionノードが`null`を返すと、メッセージは渡されずにフローが終了します。

Functionノードは必ずmsgオブジェクトを返します。
数値や文字列を返すとエラーが発生します。

返されるメッセージオブジェクトは受け取ったオブジェクトと同一である必要はありません。
全く新しいオブジェクトを作って返すこともできます。
以下がその例です。:

{% highlight javascript %}
var newMsg = { payload: msg.payload.length };
return newMsg;
{% endhighlight %}

<div class="doc-callout"><em>Note</em> : 新しいメッセージオブジェクトを生成すると、
受信した元のメッセージのあらゆるプロパティを失うことになります。これによりフローが壊れることがあり、
例えば HTTP In/Response フローでは <code>msg.req</code> と <code>msg.res</code>  プロパティが
最初から最後まで失われないようにする必要があります。
一般論として、Functionノードはどんな変更をプロパティに行っても、
受け取ったメッセージオブジェクトを返す<em>べき</em>です。</div>

デバッグを助けるため、 node.warn() はサイドバーに警告を表示します。例えば:

{% highlight javascript %}
node.warn("my var xyz = " + xyz);
{% endhighlight %}

詳細情報は以下のログに関するセクションを確認してください。

### 複数の出力に送る

Functionノードの編集ダイアログで出力の数を変更することができます。
2つ以上の出力がある場合、複数の出力にメッセージを送るために、
複数のメッセージを含む一つの配列を返すことができます。

これにより、条件に応じて異なる出力にメッセージを送る関数を簡単に書くことができます。 
例えば、以下の例はtopicが`banana`なら最初の出力ではなく
2番目の出力に全てを送ります。:

{% highlight javascript %}
if (msg.topic === "banana") {
   return [ null, msg ];
} else {
   return [ msg, null ];
}
{% endhighlight %}

以下の例は、入力されたメッセージをそのまま最初の出力に渡し、
そのメッセージのpayloadの長さを含むメッセージを２番目の出力に渡します。:

{% highlight javascript %}
var newMsg = { payload: msg.payload.length };
return [msg, newMsg];
{% endhighlight %}

#### 任意の数の出力を処理する

*Node-RED 1.3以降*

`node.outputCount` には、Functionノードに設定された出力の数が含まれます。

これにより、編集ダイアログにセットされた出力数を変数にハンドルして関数を作成することができます。

たとえば、受信メッセージを出力の間でランダムに拡散したい場合は、次のように書きます:

{% highlight javascript %}
// 出力数と同じ長さの配列を生成
const messages = new Array(node.outputCount)
// メッセージ送信する乱数出力を選択
const chosenOutputIndex = Math.floor(Math.random() * node.outputCount);
// 選択した出力だけにメッセージを送信
messages[chosenOutputIndex] = msg;
// 選択された出力を含む配列を返す
return messages;
{% endhighlight %}

関数自体を変更することなく、編集ダイアログの設定のみで出力数を構成できるようになりました。

### 複数のメッセージを送る

複数メッセージの配列を含む一つの配列を返すことで、
一つの出力に複数のメッセージを返すことができます。
一つの出力に複数のメッセージを返すと、
後続のノードは返された配列の要素の順番にメッセージを一つずつ受け取ります。

以下の例では、`msg1`、`msg2`、`msg3`は最初の出力に送られます。
`msg4`は２番目の出力に送られます。

{% highlight javascript %}
var msg1 = { payload:"first out of output 1" };
var msg2 = { payload:"second out of output 1" };
var msg3 = { payload:"third out of output 1" };
var msg4 = { payload:"only message from output 2" };
return [ [ msg1, msg2, msg3 ], msg4 ];
{% endhighlight %}

以下の例は、受信したpayloadを個別の単語に分け、
それぞれの単語を順次送る一つのメッセージを返します。

{% highlight javascript %}
var outputMsgs = [];
var words = msg.payload.split(" ");
for (var w in words) {
    outputMsgs.push({payload:words[w]});
}
return [ outputMsgs ];
{% endhighlight %}

### メッセージの非同期送信

メッセージを送信する前に何らかの非同期処理を行う必要がある場合、
Functionノードの最後で（非同期処理の結果の）メッセージを返すことはできません。

その場合、送信したいメッセージ（複数可）を`node.send()`関数に渡して用いる必要があります。
前のセクションで記述したように、
返却するメッセージは同じ配置にします。

 以下がその例です。:

{% highlight javascript %}
doSomeAsyncWork(msg, function(result) {
    msg.payload = result;
    node.send(msg);
});
return;
{% endhighlight %}


Functionノードは`node.send`に渡されたメッセージオブジェクトを全てクローンします。
これは関数内で再利用されるメッセージオブジェクトが意図しない変更がされないようにするためです。
Node-RED 1.0以前では、Functionノードは`node.send`に渡された*最初*のメッセージはクローンされませんが、
残りはクローンされます。

Functionノードは`node.send`に渡された第一引数を*クローンしない*ことを、
この関数に第二引数として`false`を受け渡すことによって、実行環境に要求できます。
これは、メッセージにクローンできないものが含まれている場合、
またはパフォーマンス上の理由でメッセージ送信のオーバーヘッドを最小限に抑える場合におこなわれます。

{% highlight javascript %}
node.send(msg,false);
{% endhighlight %}

#### 終了時メッセージ

*Node-RED 1.0以降*

Functionノードはメッセージについて非同期処理をおこなう場合、
メッセージ処理が終了したとき実行環境は自動的に検知します。

これを助けるため、Functionノードでは適切なタイミングで`node.done()`を呼び出すことが推奨されます。
これはランタイムにシステムを介してメッセージを適切に追跡できるようにします。

{% highlight javascript %}
doSomeAsyncWork(msg, function(result) {
    msg.payload = result;
    node.send(msg);
    node.done();
});
return;
{% endhighlight %}

### 起動時にコードを実行する

*Node-RED 1.1.0以降*

1.1.0リリースによって、
Functionノードはノードが起動されたときに実行されるコードを提供する`初期化処理`タブを提供しています。
これはFunctionノードが必要とする状態にセットアップするために利用されます。

例えば、
メインの関数が利用するローカルコンテキストに値を初期化します:
```
if (context.get("counter") === undefined) {
    context.set("counter", 0)
}
```

初期化処理関数は、
メインの関数がメッセージを処理し始める前に非同期ジョブを完了させておく必要がある場合にPromiseを返却できます。
初期化処理関数が完了する前に到達した全てのメッセージはキューに蓄積され、準備ができたら処理されます。

### 片付け

Functionノードの中で非同期のコールバックを用いる場合、
フローが再デプロイされる際に処理中のリクエストや使用中のコネクションなどを後片付けする必要があります。
この後片付けは、2種類の方法で実施できます。

`close`イベントハンドラを追加します:

{% highlight javascript %}
node.on('close', function() {
    // コネクションの切断など、全ての非同期コードの後片付けをここで行う
});
{% endhighlight %}

もしくは、*Node-RED 1.1.0から*、
ノードの編集ダイアログに`終了処理`タブにコードを追加できるようになりました。

### イベントのログ

ノードがコンソールに何かをログ出力する必要がある場合は、以下の関数のどれかを使うことができます:

{% highlight javascript %}
node.log("何かが起きました");
node.warn("知っておくべき何かが起きました");
node.error("なんてこった、何か良くないことが起きました");
{% endhighlight %}

コンソール出力がどこに表示されるのかはどのOSを利用しているかとどのようにNode-REDを起動したかに依ります。
コマンドラインを使って起動した場合 - ログはコンソールに出力されます。
システムサービスとして実行した場合、システムログに出力されます。PM2のようにアプリの元で実行した場合、独自のログ表示になります。ラズベリーパイ上のインストールスクリプトは、ログを表示させる`node-red-log`コマンドを追加します。

`warn`と`error`メッセージはフローエディタ右側のデバッグタブにも送られます。

より詳細なログには、`node.trace()`および`node.debug()`が利用できます。
これらのレベルを出力するようにログが設定されていない場合、ログには出力されません。

### エラーの処理

Functionノードが実行中のフローを停止させるべきエラーに遭遇した場合、何も返却するべきではありません。
同じタブのCatchノードをトリガーするために、
元のメッセージを第2引数として`node.error`を呼ぶべきです。:

{% highlight javascript %}
node.error("エラー発生", msg);
{% endhighlight %}

### データの保存

`msg`オブジェクトとは違って、Functionノードは複数回の呼び出しの間で、自分の`context`オブジェクトの中にデータを保持しておくことができます。

Node-REDのコンテキストについての詳細な情報は[こちら](/docs/user-guide/context)で確認することができます。

Functionノードの場合、
コンテキストにアクセスすることができる3つの定義済み変数が存在します。:

   - `context` - ノードスコープのローカルなコンテキスト
   - `flow` - フロースコープのコンテキスト
   - `global` - グローバルスコープのコンテキスト
   
以下の例では`flow`コンテキストを利用しますが、
`context`および`global`でも同様に利用できます。

<div class="doc-callout"><em>Note</em> : これらの定義済み変数はFunctionノードの特徴です。
ノードを自作する場合は、コンテキストへのアクセス方法は<a href="/docs/creating-nodes/context">ノード作成ガイド</a>を参照してください。</div>

コンテキストへのアクセスには、同期または非同期の2種類のモードがあります。
既存のコンテキストストアは両方のモードを提供しています。いくつかのストアは非同期アクセスのみ提供しており、
同期してアクセスがおこなわれるとエラーを発生させます。

コンテキストから値を取得するには以下のようにします。:

{% highlight javascript %}
var myCount = flow.get("count");
{% endhighlight %}

値を設定するには以下のようにします。:

{% highlight javascript %}
flow.set("count", 123);
{% endhighlight %}
   
以下の例は関数が何回実行されているか、
その回数を保持します。:

{% highlight javascript %}
// もしまだカウンタが存在していなければ0に初期化
var count = context.get('count')||0;
count += 1;
// 値を書き戻して保存
context.set('count',count);
// 送信するメッセージの一部にカウントを含める
msg.count = count;
return msg;
{% endhighlight %}

#### 複数の値の取得/設定

Node-RED 0.19以降、複数の値の取得または設定を1回でできるようになっています。:

{% highlight javascript %}
// Node-RED 0.19以降
var values = flow.get(["count", "colour", "temperature"]);
// values[0]には'count'の値が格納される
// values[1]には'colour'の値が格納される
// values[2]には'temprature'の値が格納される
{% endhighlight %}

{% highlight javascript %}
// Node-RED 0.19以降
flow.set(["count", "colour", "temperature"], [123, "red", "12.5"]);
{% endhighlight %}

この方法では、値が見つからない場合には`null`が設定されます。


#### コンテキストへの非同期なアクセス

コンテキストストアでのデータ保管に非同期なアクセスが必要な場合、
`get`および`set`関数はコールバック引数が必須です。

{% highlight javascript %}
// 単一の値を取得
flow.get("count", function(err, myCount) { ... });

// 複数の値を取得
flow.get(["count", "colour"], function(err, count, colour) { ... })

// 単一の値を設定
flow.set("count", 123, function(err) { ... })

// 複数の値を設定
flow.set(["count", "colour", [123, "red"], function(err) { ... })
{% endhighlight %}

コールバック関数に渡される第1引数`err`は、
コンテキストにアクセスする際にエラーが発生する場合のみセットします。

先述のカウンタの例を、非同期におこなうと以下のようになります。:

{% highlight javascript %}
context.get('count', function(err, count) {
    if (err) {
        node.error(err, msg);
    } else {
        // もしまだカウンタが存在していなければ0に初期化
        count = count || 0;
        count += 1;
        // 値を書き戻して保存
        context.set('count',count, function(err) {
            if (err) {
                node.error(err, msg);
            } else {
                // 送信するメッセージの一部にカウントを含める
                msg.count = count;
                // メッセージの送信
                node.send(msg);
            }
        });
    }
});
{% endhighlight %}

#### 複数のコンテキストストア

0.19版では、複数のコンテキストストアに値を格納できます。
例として、`memory`および`file`といったストアの両方を利用することができます。

`get`/`set`関数は、利用するストアを特定するため、
任意の引数を利用することができます。

{% highlight javascript %}
// 値の同期取得
var myCount = flow.get("count", storeName);

// 値の非同期取得
flow.get("count", storeName, function(err, myCount) { ... });

// 値の同期設定
flow.set("count", 123, storeName);

// 値の非同期設定
flow.set("count", 123, storeName, function(err) { ... })
{% endhighlight %}


#### globalコンテキスト

globalコンテキストは、Node-RED起動時にオブジェクトを予め格納しておくことができます。
オブジェクトは、*settings.js*ファイルの`functionGlobalContext`プロパティで
定義することができます。

このテクニックはFunctionノード内で追加モジュールのロードに
利用することができます。

### ステータスの追加

他のノードが行えるのと同じように、Functionノードもステータス表示を装飾することができます。
ステータスをセットするには、`node.status`関数を呼びます。
例えば

{% highlight javascript %}
node.status({fill:"red",shape:"ring",text:"切断されています"});
node.status({fill:"green",shape:"dot",text:"接続されています"});
node.status({text:"文字だけの状態"});
node.status({});   // 状態をクリアします
{% endhighlight %}

指定可能なパラメータの詳細については
[ノードのステータス](/docs/creating-nodes/status)を参照してください。

ステータスのどんな変化でも、Statusノードでキャッチできます。

### 追加モジュールのロード

### `functionGlobalContext` オプションの利用 

Functionノードに追加モジュールを直接ロードすることはできません。
*settings.js*ファイルでロードし、
`functionGlobalContext`プロパティに追加される必要があります。

例えば、`os`組込みモジュールは*settings.js*ファイルに以下の設定を追加することによって、
すべてのFunctionノードで利用可能になります。

{% highlight javascript %}
functionGlobalContext: {
    osModule:require('os')
}
{% endhighlight %}

この時点で、モジュールはFunctionノード内で以下のように参照できます。
`global.get('osModule')`

設定ファイルでロードされたモジュールは、設定ファイルと同じディレクトリにインストールされる必要があります。
デフォルトのユーザディレクトリ（`~/.node-red`）を利用しているだろうほとんどのユーザは以下のようにインストールを実行します。:

    cd ~/.node-red
    npm install name_of_3rd_party_module

### `functionExternalModules` オプションを使う

*Node-RED 1.3.0以降*

*settings.js* ファイルの `functionExternalModules` を `true` にセットすることで、
Functionノードの編集ダイアログには
モジュールを追加できるリストが表示されます。
また、ノードのコード内でモジュールを参照するために使用する変数を指定します。

<img style="margin-left: 20px;" src="/docs/user-guide/images/function_external_modules.png" width="500px">

追加するモジュールは、ノードがデプロイされる時に `~/.node-red/externalModules/` に自動的にインストールされます。










***

### APIリファレンス

Functionノード内では以下のオブジェクトが利用できます。

#### `node`
 * `node.id` : Functionノードのid - *0.19で追加*
 * `node.name` : Functionノードの名前 - *0.19で追加*
 * `node.outputCount` : Functionノードの出力数をセット - *1.3で追加*
 * `node.log(..)` : [メッセージをログ出力](#イベントのログ)
 * `node.warn(..)` : [警告メッセージをログ出力](#イベントのログ)
 * `node.error(..)` : [エラーメッセージをログ出力](#イベントのログ)
 * `node.debug(..)` : [デバッグメッセージをログ出力](#イベントのログ)
 * `node.trace(..)` : [トレースメッセージをログ出力](#イベントのログ)
 * `node.on(..)` : [イベントハンドラーを登録](#メッセージの非同期送信)
 * `node.status(..)` : [ノードステータスを更新](#ステータスの追加)
 * `node.send(..)` : [メッセージを非同期に送信](#メッセージの非同期送信)
 * `node.done(..)` : [終了時のメッセージ](#終了時メッセージ)

#### `context`
 * `context.get(..)` : ノードスコープコンテキストからプロパティ値を取得する
 * `context.set(..)` : ノードスコープコンテキストにプロパティ値を設定する
 * `context.keys(..)` : すべてのノードスコープコンテキストのプロパティキーの一覧を取得する
 * `context.flow` : `flow`と同義です
 * `context.global` : `global`と同義です

#### `flow`
 * `flow.get(..)` : フロースコープコンテキストからプロパティ値を取得する
 * `flow.set(..)` : フロースコープコンテキストにプロパティ値を設定する
 * `flow.keys(..)` : すべてのフロースコープコンテキストのプロパティキーの一覧を取得する

#### `global`
 * `global.get(..)` : グローバルスコープコンテキストからプロパティ値を取得する
 * `global.set(..)` : グローバルスコープコンテキストにプロパティ値を設定する
 * `global.keys(..)` : すべてのグローバルスコープコンテキストのプロパティキーの一覧を取得する

#### `RED`
 * `RED.util.cloneMessage(..)` : メッセージオブジェクトを再利用できるように安全にクローンします  

#### `env`
 * `env.get(..)` : 環境変数を取得する


#### その他のモジュールと関数

Functionノードは以下のモジュールと関数を利用可能です。:

* `Buffer` - Node.jsの`Buffer`モジュール
* `console` - Node.jsの`console`モジュール(ログ出力には`node.log`を利用する方が良いです。)
* `util` - Node.jsの`util`モジュール
* `setTimeout/clearTimeout` - javascriptのtimeout関数
* `setInterval/clearInterval` - javascriptのinterval関数

Note: Functionノードは、停止もしくは再デプロイ時に、
全ての未完了のタイムアウトやインターバルタイマーを自動的にクリアします。
