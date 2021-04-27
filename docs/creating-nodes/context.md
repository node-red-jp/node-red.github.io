---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: コンテキスト
slug: コンテキスト
---

ノードは、そのコンテキストオブジェクト内にデータを格納することができます。

コンテキストについての更なる情報は、[コンテキストを利用するためのガイド](../user-guide/context)を参照してください。

ノードに利用可能なコンテキストは3種類あります。

- Node - 値を設定したノードのみ参照可能
- Flow - 同一のフロー（またはエディタ内の同一のタブ）上のすべてのノードが参照可能
- Global - すべてのノードが参照可能

これらのコンテキストそれぞれにアクセスするための定義済み変数を持っているFunctionノードとは異なり、
カスタムノードは独自にこれらのコンテキストに
アクセスする必要があります。

{% highlight javascript %}
// Access the node's context object
var nodeContext = this.context();

var flowContext = this.context().flow;

var globalContext = this.context().global;
{% endhighlight %}

こららのコンテキストオブジェクトのそれぞれが同じように`get`/`set`関数を有していることが
[Functionノードを記述するためのガイド](/docs/writing-functions#データの保存)で説明されています。

注意: 他のノードによって使用されたり共有されたりする設定ノードは、ユーザーによる指定がない限り、デフォルトではグローバルです。
そのため、フローコンテキストへはアクセスできません。
