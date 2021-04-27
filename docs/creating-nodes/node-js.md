---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: JavaScriptファイル
slug: .js
---

`.js`ファイルは、ノードのランタイム動作を定義します。

- [ノードコンストラクタ](#ノードコンストラクタ)
- [メッセージ受信](#メッセージ受信)
- [メッセージ送信](#メッセージ送信)
  - [複数出力](#複数出力)
  - [複数メッセージ](#複数メッセージ)
- [ノードを閉じる](#ノードを閉じる)
  - [タイムアウト動作](#タイムアウト動作)
- [ロギングイベント](#ロギングイベント)
  - [エラー処理](#エラー処理)
- [ステータスの設定](#ステータスの設定)
- [カスタムノードの設定](#カスタムノードの設定)

### ノードコンストラクタ

ノードは、ノードの新しいインスタンスを作成するために使用されるコンストラクタ関数によって定義されます。
この関数はランタイムに登録されるため、
対応するタイプのノードがフローにデプロイされたときに呼び出すことができます。

この関数には、フローエディタで設定されたプロパティを含むオブジェクトが渡されます。

最初に`RED.nodes.createNode`関数を呼び出して、全てのノードが共通して持っている機能を初期化することが必要です。
その後、ノード固有のコードが起動します。

{% highlight javascript %}
function SampleNode(config) {
    RED.nodes.createNode(this,config);
    // node-specific code goes here

}

RED.nodes.registerType("sample",SampleNode);
{% endhighlight %}

### メッセージ受信

ノードは`input`イベントをリスナーに登録し、
フロー内の上流にあるノードからメッセージを受信します。

Node-RED 1.0では、ノードがメッセージの処理を終えたときにノードが実行環境に通知できるようにするため、
新しいスタイルのリスナーが導入されました。
これはリスナー機能に2つの新しいパラメータを追加しました。
この新しいスタイルのリスナーを使っていないNode-RED 0.xに
ノードがインストールされるということを保証するには、注意が必要です。

{% highlight javascript %}
this.on('input', function(msg, send, done) {
    // do something with 'msg'

    // Once finished, call 'done'.
    // This call is wrapped in a check that 'done' exists
    // so the node will work in earlier versions of Node-RED (<1.0)
    if (done) {
        done();
    }
});
{% endhighlight %}

#### エラー処理

ノードがメッセージ処理中にエラーに遭遇した場合、
`done`ファンクションにエラーの詳細を受け渡すべきです。

これによって同じタブに存在するCatchノードがトリガーされ、
ユーザはエラー処理フローを構築できます。

また、`done`ファンクションが提供されていないNode-RED 0.xにノードがインストールされる場合には注意が必要です。
このような場合には`node.error`を使用する必要があります:


{% highlight javascript %}
let node = this;
this.on('input', function(msg, send, done) {
    // do something with 'msg'

    // If an error is hit, report it to the runtime
    if (err) {
        if (done) {
            // Node-RED 1.0 compatible
            done(err);
        } else {
            // Node-RED 0.x compatible
            node.error(err, msg);
        }
    }
});
{% endhighlight %}


### メッセージ送信

フローの先頭にノードが置かれており、外部イベントに反応してメッセージを作成する場合、
Nodeオブジェクトの`send`ファンクションを利用する必要があります。

{% highlight javascript %}
var msg = { payload:"hi" }
this.send(msg);
{% endhighlight %}

ノードがメッセージ受信に反応する`input`イベントリスナー内部からメッセージを送りたい場合、
リスナーファンクションに渡される
`send`ファンクションを使う必要があります:

{% highlight javascript %}
let node = this;
this.on('input', function(msg, send, done) {
    // For maximum backwards compatibility, check that send exists.
    // If this node is installed in Node-RED 0.x, it will need to
    // fallback to using `node.send`
    send = send || function() { node.send.apply(node,arguments) }

    msg.payload = "hi";
    send(msg);

    if (done) {
        done();
    }
});
{% endhighlight %}


`msg`がnullの場合、メッセージは送信されません。

ノードがメッセージを受信したことに呼応してメッセージを送信している場合、
ノードは新しいメッセージオブジェクトを生成するのではなく、受信したメッセージを再利用する必要があります。
これにより、残りのフローに対してメッセージの既存のプロパティが保持されることを保証します。

#### 複数出力

ノードに複数の出力がある場合、メッセージの配列を`send`に渡すことができ、
それぞれが対応する出力先に送られます。

{% highlight javascript %}
this.send([ msg1 , msg2 ]);
{% endhighlight %}

#### 複数メッセージ

この配列内にメッセージの配列を渡すことで、
特定の出力に複数のメッセージを送ることができます:

{% highlight javascript %}
this.send([ [msgA1 , msgA2 , msgA3] , msg2 ]);
{% endhighlight %}

### ノードを閉じる

新しいフローがデプロイされるたびに、既存のノードは削除されます。
このような状況が発生した時、リモートシステムとの接続を切断するなどのように状況を整理する必要がある場合、
`close`イベントをリスナーに登録する必要があります。

{% highlight javascript %}
this.on('close', function() {
    // tidy up any state
});
{% endhighlight %}

ノードが整理を完了するために非同期作業を行う必要がある場合、
登録されたリスナーは、
全ての作業が完了した時に呼び出される関数を引数として受け入れる必要があります。

{% highlight javascript %}
this.on('close', function(done) {
    doSomethingWithACallback(function() {
        done();
    });
});
{% endhighlight %}

*Node-RED 0.17以降*

登録されたリスナーが2つの引数を受け入れる場合、
最初の引数はノードが完全に削除されたことでノードが閉じられたのか、
ただ再起動されているためにノードが閉じられているかを示すbooleanフラグとなります。
ノードが無効された場合にも、 *true* がセットされます。

{% highlight javascript %}
this.on('close', function(removed, done) {
    if (removed) {
        // This node has been disabled/deleted
    } else {
        // This node is being restarted
    }
    done();
});
{% endhighlight %}

#### タイムアウト動作

*Node-RED 0.17以降*

Node-RED 0.17以前は、ランタイムは`done`関数が呼び出されるまでいつまでも待機していました。
このため、ノードがこの関数を呼び出すことができなかった場合、ランタイムがハングしていました。

0.17以降では、ランタイムは15秒以上かかるとノードをタイムアウトさせます。
エラーが記録され、ランタイムは引き続き動作します。


### ロギングイベント

ノードがコンソールに何かを記録する必要がある場合、ノードは以下の関数のうち１つを使用できます：

{% highlight javascript %}
this.log("Something happened");
this.warn("Something happened you should know about");
this.error("Oh no, something bad happened");

// Since Node-RED 0.17
this.trace("Log some internal detail not needed for normal operation");
this.debug("Log something more details for debugging the node's behaviour");


{% endhighlight %}

`warn`および`error`メッセージもフローエディタのデバッグタブに送信されます。

### ステータスの設定

実行中は、ノードはエディタのUIとステータス情報を共有できます。
これは`status`関数で呼び出すことでできます:

{% highlight javascript %}
this.status({fill:"red",shape:"ring",text:"disconnected"});
{% endhighlight %}

ステータスAPIの詳細は[こちら](status)にあります。

### カスタムノードの設定

ノードは、ユーザの`settings.js`ファイルに設定オプションを公開したいかもしれません。

設定の名称は、次の要件に従わなければなりません:

 - 名称のプレフィックスとして対応するノードタイプを付ける必要があります。
 - 設定にはキャメルケースを使用する必要があります。 詳細は下記を参照してください。
 - ノードはユーザがそれを設定することを要求してはなりません。
　　それはわかりやすいデフォルトでなければなりません。

たとえば、ノードタイプ`sample-node`が`colour`という設定を公開した場合、
設定名は`sampleNodeColour`でなければなりません。

ランタイム内で、ノードはその設定を
`RED.setting.sampleNodeColour`として参照することができます。


#### エディタに設定を公開する

*Node-RED 0.17以降*

状況によっては、ノードがエディタに設定値を公開したい場合があります。
この場合、ノードは`registerType`の呼び出しの引数の一部として設定を登録しなければなりません:

{% highlight javascript %}
RED.nodes.registerType("sample",SampleNode, {
    settings: {
        sampleNodeColour: {
            value: "red",
            exportable: true
        }
    }
});
{% endhighlight %}

 - `value`フィールドは、設定に必要なデフォルト値を指定します。
 - `exportable`は、エディタで設定を利用可能にするようにランタイムに指示します。

ランタイムと同様に、
ノードはエディタ内で`RED.settings.sampleNodeColour`として設定を参照できるようになります。

ノードが命名要件を満たさない設定を登録しようとすると、
エラーが記録されます。
