---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: ステータス
slug: ステータス
---

実行中は、ノードはエディタのUIとステータス情報を共有できます。
例えば、MQTTノードはそれらが現在接続されているかどうかを示すことができます。

<div style="text-align: center">
    <img title="node status" src="images/node_status.png"/>
</div>

現在の状態を設定するために、ノードは`status`関数を使用します。
たとえば、次の2つの呼び出しはMQTTノードによって使用され、
上記のイメージに示されている状況を設定します:

{% highlight javascript %}
this.status({fill:"red",shape:"ring",text:"disconnected"});

this.status({fill:"green",shape:"dot",text:"connected"});
{% endhighlight %}

*デフォルトでは、ノードのステータス情報がエディタに表示されます。
ドロップダウンメニューの* Display Node Status *オプションを選択することで無効にして再度有効にすることができます。*

### Statusオブジェクト

statusオブジェクトは3つのプロパティで構成されます: `fill`、`shape`、`text`です。

最初の2つはステータスアイコンの外観を定義し、
3つ目はオプションの短いテキスト（20文字未満）を
アイコンの横に表示します。

`shape`プロパティは次のようになります: `ring`、`dot`

`fill`プロパティは次のようになります: `red`、`green`、`yellow`、`blue`、`grey`

これにより、次のアイコンを使用することができます:

<div style="margin-left: 50px">
    <svg width="100" height="40">
       <rect x="5"  y="5" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#fff" stroke="#cc0000"/>
       <rect x="25" y="5" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#fff" stroke="#55aa88"/>
       <rect x="45" y="5" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#fff" stroke="#F9DF31"/>
       <rect x="65" y="5" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#fff" stroke="#53A3F3"/>
       <rect x="85" y="5" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#fff" stroke="#d3d3d3"/>
       <rect x="5"  y="25" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#cc0000" stroke="#cc0000"/>
       <rect x="25" y="25" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#55aa88" stroke="#55aa88"/>
       <rect x="45" y="25" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#F9DF31" stroke="#F9DF31"/>
       <rect x="65" y="25" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#53A3F3" stroke="#53A3F3"/>
       <rect x="85" y="25" width="9" height="9" rx="2" ry="2" stroke-width="3" fill="#d3d3d3" stroke="#d3d3d3"/>
    </svg>
</div>

statusオブジェクトが空のオブジェクト`{}`である場合、
ステータスエントリはノードからクリアされます。

### 注: Statusノード

Node-RED v0.12.xから、
他のフローをトリガーにするため、
Statusノードを使用してメッセージの接続や切断といった他のノードのステータスの更新を取得することができるようになりました。
