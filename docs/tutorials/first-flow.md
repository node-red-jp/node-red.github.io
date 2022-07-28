---
layout: docs-tutorial
toc: toc-user-guide.html
title: はじめてのフロー
slug: はじめてのフロー
redirect_from:
  - /docs/getting-started/first-flow
---

### 概要

このチュートリアルはNode-REDエディタを紹介し、
Inject、DebugおよびFunctionノードを使ったフローを作成します。


### 1. エディタにアクセスする

Node-REDを[起動](/docs/getting-started)してから、ウェブブラウザでエディタを開きます。

Node-REDを実行している同じコンピュータでブラウザを使っているならば、
以下のURLでアクセスすることができます: <http://localhost:1880>

他のコンピュータを使っている場合、
Node-REDを実行しているコンピュータのIPアドレスを使う必要があります: `http://<ip-address>:1880`.


### 2. Injectノードの追加

Injectノードはノード上のボタンをクリック、またはInject間隔を設定することにより、
フローにメッセージを流すことができます。

[パレット](/docs/user-guide/editor/palette/)から[ワークスペース](/docs/user-guide/editor/workspace/)上にInjectノードをドラッグします。

新規に追加したInjectノードを選択して[情報サイドバーペイン](/docs/user-guide/editor/sidebar/info)で
そのプロパティ情報および何ができるかを確認します。

### 3. Debugノードの追加

Debugノードは[サイドバーのデバッグタブ](/docs/user-guide/editor/sidebar/debug)にメッセージを表示させるノードです。
デフォルトでは`msg.payload`を表示し、
設定次第では`msg`（メッセージオブジェクト全体）を表示させることもできます。

### 4. 2つのノードをワイヤーでつなぐ

Inject/Debugノード双方のポートを[ドラッグ](/docs/user-guide/editor/workspace/wires)して
ワイヤーでつなぐことで2つのノードを接続します。

### 5. デプロイ

この時点ではノードやフローはエディタ上にしか存在しないので
サーバにデプロイする必要があります。

デプロイボタンをクリックするとサーバにデプロイできます。

サイドバーのデバッグタブを選択した状態でInjectボタンをクリックするとデバッグタブに数字が表示されるはずです。
デフォルトでは、Injectノードは1970年1月1日からのミリ秒数（タイムスタンプ）をペイロードとして利用します。
それでは、より有用なことをやってみましょう。

### 6. Functionノードの追加

Functionノードは実際にJavaScriptを書くことができます。

今存在しているノードを一度削除します。（ワイヤを選択し、キーボードのDeleteキーを押下します。）

InjectノードとDebugノードの間にFunctionノードを配置します。

配置したFunctionノードをダブルクリックすると設定ダイアログが開きます。
Functionノードのフィールドに次のコードをコピーして貼り付けます。

{% highlight javascript %}
// ペイロードから日付オブジェクトを生成
var date = new Date(msg.payload);
// 日付文字列に変換して再度ペイロードをセット
msg.payload = date.toString();
// 次のノードへmsgオブジェクトを返す
return msg;
{% endhighlight %}

完了ボタンをクリックして設定ダイアログを閉じ、デプロイボタンをクリックしてデプロイします。

Injectボタンをクリックするとサイドバーのデバッグタブに、
書式化されたタイムスタンプが表示されるでしょう。

***

### まとめ

このフローはフロー作成の基本的なコンセプトを説明しています。
どのようにInjectノードを手動でフローを始動させるために使うのか、
どのようにDebugノードがサイドバーに表示するのかを示しています。
また、どのようにFunctionノードをメッセージに対して動作するカスタムJavaScriptコードを書くために使うのかを示しています。

### ソース

このチュートリアルで作成したフローは以下のJSONで示されます。
これをエディタにインポートするため、クリップボードにコピーし、読み込みダイアログにペーストします。


```json
[{"id":"58ffae9d.a7005","type":"debug","name":"","active":true,"complete":false,"x":640,"y":200,"wires":[]},{"id":"17626462.e89d9c","type":"inject","name":"","topic":"","payload":"","repeat":"","once":false,"x":240,"y":200,"wires":[["2921667d.d6de9a"]]},{"id":"2921667d.d6de9a","type":"function","name":"Format timestamp","func":"// Create a Date object from the payload\nvar date = new Date(msg.payload);\n// Change the payload to be a formatted Date string\nmsg.payload = date.toString();\n// Return the message so it can be sent on\nreturn msg;","outputs":1,"x":440,"y":200,"wires":[["58ffae9d.a7005"]]}]
```

### 次のステップ

 - [2つ目のフロー作成](second-flow)

### 関連するドキュメント

 - [エディタを利用する](/docs/user-guide/editor/)
 - [コアノード](/docs/user-guide/nodes)
 - [メッセージを利用する](/docs/user-guide/messages)
 - [Functionノードを利用する](/docs/user-guide/writing-functions)
