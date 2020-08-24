---
layout: docs-developing-flows
toc: toc-developing-flows.html
title: フローのドキュメント
slug: フローのドキュメント
---

どのプログラミング言語においても、保守が容易なコードを作成するために必要不可欠なことの一部は、よくドキュメント化されているかを確認することです。

良いドキュメンテーションは、以下の様な多くの目的のために役立ちます:

1. フロー作成者地震であれば全てが明らかなことに見えるかもしれませんが、いくらかの詳細説明が提供されていることは、将来に後から見返す時に自分にとっても役立つでしょう。
2. もしフローを他の開発者と共有している場合、ドキュメンテーションはフローが何をしているか、またどの様に動作するかを理解してもらうのに役立つでしょう。
3. もしフローが外部へAPIを提供する場合、APIがどの様なプロパティやパラメータを期待するか等、使い方をドキュメント化したいでしょう。
4. ドキュメントとして動作を書き出すことにより、改善点を特定できることがあります。

Node-REDの様なビジュアルプログラミング環境においては、ドキュメンテーションはいくつかの方法があります。

- イベントのロジカルな流れを把握するために、ワークスペース上でフローを読むことができます。各ノードは目的は簡単に把握できる様に、また交差するフローを最小限にする様に、それらを適切に配置します。
- グループは、フローの一部を特定できるようにするために用いることができます。
- 共通で利用する部分をサブフロー内へ移動することで、フローの視覚的な複雑さを減らすことができます。
- より完全なドキュメントは、ノード、グループ、タブに追加できます。


### フローの配置

このガイドの[フローの構造](flow-structure)のセクションでは、どの様にフローのコンポーネントを整えるかについて説明しました。
このセクションでは、フローの配置の見た目について考えてゆきます。

ここでの目標は、ワークスペース内を飛び回るこなく、また互いに交差して絡まった様に見える複数のワイヤーを辿ることなく、フローを簡単に辿れる様にすることです。

最も読みやすくする方法は、可能な限り各処理単位を水平に配置する方法です。
エディタのデフォルトの動作である「ノードの配置を補助」の機能は、タブ上のグリッドを用いてノードを整理するのに役立ちます。

<div class="figure">
    <img src="./images/node-arrangement.png" alt="Aligning flows in horizontal rows"/>
    <p class="caption">フローを水平に整列</p>
</div>

もし複数の出力ポートがあるノードが存在する場合、後続の複数の分岐フローを垂直に並べることで、フローの比較が容易となります。

<div style="width: 600px" class="figure">
  <img src="images/node-arrangement-sample-align.png" alt="Aligning branched flows">
  <p class="caption">分岐フローの整列</p>
</div>

フローが長い場合は、いくつかのノードを縦に配置すると良いでしょう。
下の図では、いくつかののノードを縦に配置し、それらの関係を表現しています。
もし、フローの各部がお互いにどの様に関係しているか視覚的に明らかである場合は、フロー全体の性質を理解しやすくなります。

<div class="figure">
    <img src="./images/node-vertical-arrangement.png" alt="Vertically aligning logical segements of a long flow"/>
    <p class="caption">長いフローの一部を縦に整列</p>
</div>

場合によっては、これらフローの一部は、視覚的な複雑さを減らすために、サブフロー化の対象になることもあります。
フローの一部が他の場所で再利用できる場合は、特に当てはまります。

### ノード名

ほぼ全てのノードは、ワークスペース上に表示するラベルをカスタマイズするために `名前` プロパティを持っています。
これは、フロー内の重要なポイントで、適切に名前をつける必要があります。

例えば、Changeノードへ `msg.payload` に現在時刻を格納するルールが設定されている場合、デフォルトで `set msg.payload` というラベルになります。
これはいくらか役に立つラベルですが、このノードの全ての目的を表すものではありません。
そのため、 `Get current time` という名前の方がより的確でしょう。

ここには、考慮すべきバランスがあります。
長いラベルは、フローにおいてより多くの場所を必要とします。
一方で、ラベルが短すぎると共有できる情報が少なくなってしまいます。

一部のノードにおいては、フローで使用できる水平方向のスペースを他のノードに割り当てるために、ラベルを非表示にすることが適切である場合があります。

ラベルに加えて、ノードはタスタムアイコンを持つこともできます。
例えば、様々なタイプのデバイスからデータを取得するMQTT Inノードが沢山ある場合、デバイスのタイプと一致するアイコンを選択することで、より分かりやすくなります。
ただし、アイコンはノードの種類を特定する主な手段であるため、注意してこの機能を利用してください。

適切な名前を選択することは、タブやサブフローについても言えることです。

また、リンクノードにおいても適切な名前はとても重要です。
名前が設定されていないと、リンクノードを用いて異なるタブ間でリンクを作成した時に、リンクノードの内部IDを用いる必要が出てきてしまいます。
これによってユーザは対象のリンクノードを正しく特定することが難しくなり、間違いが生じる可能性があります。
タブ間を接続するAPIの様にリンクノードを用いることを考えている場合は、名前を適切に選択する必要があります。
リンクノードには、各フローの開始点と終了点が明確に分かる様に名前を付けるべきです。

### ポートラベルの追加

If a node has multiple outputs it can be hard to follow the logic if it is not clear on what condition a message may be sent from a particular output.

This is where adding port labels can help document the intended logic.

For example, the Switch node provides default labels for its outputs that are shown when the mouse hovers over them. They can help quickly identify the purpose of each branch in the flow.

Whilst the default labels may be sufficient in the context of the flow itself, it is also possible to customise labels to provide more detailed information.

<div  class="figure">
  <img src="images/node-output-labels.png" alt="Custom output labels on the Switch node's Appearance tab">
  <p class="caption">Custom output labels on the Switch node's Appearance tab</p>
</div>

### Inline Comments

The Comment node can be used to add inline comments to the flow - both the node's label, but also its description that will show in the Information sidebar when selected.

By indenting the flows on the page, you can indicate an implied grouping of the different components.

<div class="figure">
  <img src="images/comment-nodes.png" alt="Documenting flows with the Comment node">
  <p class="caption">Documenting flows with the Comment node</p>
</div>

### Grouping nodes

A more explicit arrangement of the flows can be achieved by grouping related nodes together.

The background colour of each group can also be used to highlight different types of group.

<div class="figure">
  <img src="images/grouping-nodes.png" alt="Grouping nodes">
  <p class="caption"> Grouping nodes</p>
</div>

### Adding longer documentation

All of the techniques discussed so far relate to the visual appearance of the flows. In order to add more in depth documentation, something more is needed.

Every node, group and tab can have longer-form documentation added under the [Description tab in their edit dialog](/docs/user-guide/editor/workspace/nodes#editing-node-properties). This help can be formatted using Markdown and including lists, tables and links. This documentation is then displayed in the [Information sidebar](/docs/user-guide/editor/sidebar/info) when the item is selected.

This longer format of documentation is useful where more explanation is needed of a flow's purpose, or some more complex logic needs to be described.

It is also useful where a flow provides an external API of some sort - providing as much detail as it needed for other developers to use the API.
