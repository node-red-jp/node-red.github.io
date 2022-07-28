---
layout: docs-tutorial
toc: toc-user-guide.html
title: 2つ目のフロー作成
slug: 2つ目のフロー
redirect_from:
  - /docs/getting-started/second-flow

---


### 概要

このチュートリアルは[最初のチュートリアル](first-flow)を元に、
ローカルで何か役に立つことをするために外部ソースからデータを持ってくることをはじめるフローを作成します。

このフローでは:

 - 一定間隔でウェブサイトから情報を取得
 - 使いやすい形式に情報を変換
 - デバッグサイドバーに結果を表示

### 1. Injectノードの追加

[前回のチュートリアル](first-flow)では、
Injectノードをそのボタンをクリックしたときにフローを始動させるために利用しました。
このチュートリアルでは、Injectノードを一定間隔でフローを始動するように設定します。

パレットからワークスペース上にInjectノードをドラッグします。

配置したInjectノードをダブルクリックすると設定ダイアログが開きます。
`毎日5分間隔`にセットして定期実行を設定します。

完了ボタンをクリックして設定ダイアログを閉じます。

### 2. HttpRequestノードの追加

Http Requestノード（最初のhttpノードではありません）を使ってWebページの内容を取得することができます。

ノードを配置後に設定ダイアログの`URL`項目に以下をセットします。

    https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv

完了をクリックしてダイアログを閉じます。

これはアメリカ地質調査所のウェブサイトの、先月の大きな地震のフィードです。このフィードには[様々なオプション](https://earthquake.usgs.gov/earthquakes/feed/v1.0/csv.php)が存在しています。
このチュートリアルを狩猟したあとに遊ぶことができるでしょう。

### 3. CSVノードの追加

CSVノードを追加し、そのプロパティを編集します。
「1行目に列名を含む」のオプションを有効化します。

そして完了をクリックして閉じます。

### 4. Debugノードの追加

Debugノードを追加します。

### 5. すべてのノードをワイヤーで接続

ワイヤーを追加して接続します:

  - Injectノードの出力とHTTP Requestノードの入力
  - HTTP Requestノードの出力とCSVノードの入力
  - CSVノートの出力とDebugノードの入力

### 6. Switchノードの追加

ワークスペースにSwitchノードを追加します。
プロパティを編集し、プロパティに`msg.payload.mag`を入力し、`>=`と`数値`による評価に変更し、値に`7`を設定します。
完了をクリックして閉じます。

CSVノードからこのSwitchノードに2つ目のワイヤーを追加します。

### 7. Changeノードの追加

Changeノードを追加し、Switchノードの出力に繋ぎます。
`msg.payload`に文字列`PANIC!`をセットするように設定します。

### 8. Debugノードの追加

新しいDebugノードをChangeノードの入力ポートにワイヤーで接続

### 9. デプロイ

デプロイボタンをクリックすることでランタイムにフローをデプロイします。
以下のような内容のエントリのリストを確認できるはずです:

    msg.payload : Object
    {"time":"2017-11-19T15:09:03.120Z","latitude":-21.5167,"longitude":168.5426,"depth":14.19,"mag":6.6,"magType":"mww","gap":21,"dmin":0.478,"rms":0.86,"net":"us","id":"us2000brgk","updated":"2017-11-19T17:10:58.449Z","place":"68km E of Tadine, New Caledonia","type":"earthquake","horizontalError":6.2,"depthError":2.8,"magError":0.037,"magNst":72,"status":"reviewed","locationSource":"us","magSource":"us"}

それぞれのプロパティの左にある小さな矢印をクリックすることで、
プロパティを開いて内容を確認できます。

マグニチュード7以上の地震があった場合、
以下のようなデバッグメッセージも確認できます。

    msg.payload : string(6)
    "PANIC!"

`7`という分岐の値を小さく変更してプログラムをテストすることもできます。変更後は、忘れずにデプロイをクリックします。
***

### まとめ

このフローは5分間隔で自動的に実行され、URL先からデータを回収します。
データを加工し、デバッグサイドバーに表示します。
また、データのマグニチュードの値を確認し、
マグニチュードが7以上だった場合に追加のメッセージのためにフローを分岐させます。
メッセージのペイロードは適切なかたちにされ、デバッグサイドバーに表示されます。


### ソース

このチュートリアルで作成したフローは以下のJSONで表されます。
エディタにこれをインポートするには、クリップボードにコピーしてから読み込みダイアログにペーストします。

    [{"id":"e36406f2.8ef798","type":"inject","z":"f03b57d5.e525f8","name":"","topic":"","payload":"","payloadType":"str","repeat":"300","crontab":"","once":false,"x":130,"y":900,"wires":[["c3c50023.3bbed"]]},{"id":"c3c50023.3bbed","type":"http request","z":"f03b57d5.e525f8","name":"Recent Quakes","method":"GET","url":"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_month.csv","tls":"","x":300,"y":900,"wires":[["8afc6cac.e0812"]]},{"id":"8afc6cac.e0812","type":"csv","z":"f03b57d5.e525f8","name":"","sep":",","hdrin":true,"hdrout":"","multi":"one","ret":"\\n","temp":"","x":470,"y":900,"wires":[["44779781.4190f8","6f0eb546.9e208c"]]},{"id":"44779781.4190f8","type":"debug","z":"f03b57d5.e525f8","name":"","active":true,"complete":false,"x":630,"y":900,"wires":[]},{"id":"6f0eb546.9e208c","type":"switch","z":"f03b57d5.e525f8","name":"","property":"payload.mag","propertyType":"msg","rules":[{"t":"gte","v":"7","vt":"num"}],"checkall":"true","outputs":1,"x":510,"y":960,"wires":[["d78d4aa8.8c8208"]]},{"id":"d78d4aa8.8c8208","type":"change","z":"f03b57d5.e525f8","name":"","rules":[{"t":"set","p":"payload","pt":"msg","to":"PANIC!","tot":"str"}],"action":"","property":"","from":"","to":"","reg":false,"x":650,"y":1020,"wires":[["72fddece.fac0d"]]},{"id":"72fddece.fac0d","type":"debug","z":"f03b57d5.e525f8","name":"","active":true,"complete":false,"x":750,"y":960,"wires":[]}]

### 関連するドキュメント

 - [エディタを利用する](/docs/user-guide/editor/)
 - [コアノード](/docs/user-guide/nodes)
 - [Functionノードを利用する](/docs/user-guide/writing-functions)
