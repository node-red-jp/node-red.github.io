---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/workspace"
    label: "ワークスペース"
  - "サブフロー"
toc: toc-editor-guide.html
title: サブフロー
---

サブフローとは、ワークスペースでノードの集まりを1つのノードにまとめたものを指します。

フローの見た目の複雑さを減らすため、
または複数の場所で使用する再利用可能なフローとしてノードのグループをまとめるために利用できます。

作成されたサブフローは利用可能なノードのパレットへ追加されます。
サブフローの個々のインスタンスは他のノードと同様にワークスペースに追加されます。

*Note:* サブフローは直接的であれ間接的であれ、それ自身のインスタンスを含むことができません。

### 空のサブフローを作成する

サブフローは、メニューで「サブフロー -> サブフローを作成」オプションを選択することで作成できます。
これは空のサブフローを作成し、ワークスペースでサブフローを展開します。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>なし</i></td></tr>
 <tr><td>メニューオプション</td><td><code>サブフロー -&gt; サブフローを作成</code></td></tr>
 <tr><td>動作</td><td><code>core:create-subflow</code></td></tr>
</table>

### ノードをサブフローに変換する

メニューから「サブフロー -> 選択部分をサブフロー化」オプションを選択することで、
現在選択しているノードをサブフローに変換することもできます。
このノードは新しいサブフローへと移動し、
フローではサブフローインスタンスノードに置換されます。

<div class="figure">
  <img src="../images/editor-subflow-create-selection.png" alt="Creating a subflow">
  <p class="caption">サブフローを作成する</p>
</div>

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-subflow-invalid-selection.png" alt="Invalid subflow selection">
  <p class="caption">不正なサブフロー選択</p>
</div>

サブフローへの変換は選択範囲に入ってくるワイヤーが1つのノードに接続されている場合のみ可能です。
結果としてサブフローノードは最大1つの入力を持つことができます。

<br style="clear: both" />

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>なし</i></td></tr>
 <tr><td>メニューオプション</td><td><code>サブフロー -&gt; 選択部分をサブフロー化</code></td></tr>
 <tr><td>動作</td><td><code>core:convert-to-subflow</code></td></tr>
</table>


### サブフローを編集する

サブフローを開いて内容を編集するには2つの方法があります。
パレットでこのノードをダブルクリックする、
またはサブフローインスタンスノードの編集ダイアログで「フローのテンプレートを編集」ボタンをクリックします。

ワークスペースでサブフローは新しいタブとして開かれます。
一般的なフローのタブとは異なり、サブフロータブは閉じて非表示にすることができます。

<div style="width:616px" class="figure">
  <img src="../images/editor-edit-subflow.png" alt="Editing a subflow">
  <p class="caption">サブフローを編集する</p>
</div>

#### 入出力

サブフローの入出力は、
通常どおりフローに繋げることができる灰色の正方形のノードで表示されます。

ツールバーには、これらのノードを追加および削除するためのオプションがあります。
通常のフローノードと同様に、最大1つの入力と必要な数の出力があります。

#### ステータスノード

ツールバーは、サブフローへの'status'出力の追加をオプションとして提供します。
これはサブフローインスタンスのノードのステータスを更新するために使用されます。

#### サブフロープロパティの編集

「プロパティを編集」ボタンはサブフロープロパティ編集ダイアログを開きます。
フロープロパティ編集ダイアログでは、サブフローの名称と詳細を設定することができます。

<ul>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-cog"></i> : Properties - per-instance properties that are exposed as environment variables within the subflow.</li>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-file-text"></i> : Description - per-node documentation formatted using Markdown. This is displayed in the <a href="../sidebar/info">Information sidebar</a> when the node is selected.</li>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-object-group"></i> : Appearance - options to customise the appearance of the node.</li>
</ul>

<div class="figure">
  <img style="width: calc(30% - 10px); display: inline-block;" src="../images/editor-edit-subflow-properties.png" alt="Subflow edit dialog - properties">
  <img style="width: calc(30% - 10px); margin-left: 10px; display: inline-block;"  src="../images/editor-edit-subflow-description.png" alt="Subflow edit dialog - description">
  <img style="width: calc(30% - 10px); margin-left: 10px; display: inline-block;"  src="../images/editor-edit-subflow-appearance.png" alt="Subflow edit dialog - appearance">
  <p class="caption">Subflow edit dialog - properties, description and appearance tabs</p>
</div>

##### プロパティ

<div style="width:487px" class="figure align-right">
  <img src="../images/editor-edit-subflow-property.png" alt="サブフロープロパティの編集">
  <p class="caption">Editing subflow properties</p>
</div>
<div style="width:487px" class="figure align-right">
  <img src="../images/editor-edit-subflow-property-ui.png" alt="サブフロープロパティのUI">
  <p class="caption">Editing subflow property UI</p>
</div>

編集ダイアログの'Properties'タブは、カスタマイズされる各サブフローのインスタンスのプロパティのセットを定義するのに使用されます。
プロパティはサブフロー内に環境変数として展開されます。

プロパティテーブル内の各エントリはサブフローのインスタンスが編集される際に、どのように表示されるかカスタマイズできます。
'UI Preview'タブは、それがどう表示されるかのプレビューを提供します。


<br style="clear: both;" />





##### 外観

外観タブはつぎのオプションを提供します:

 - ノードが表示されるカテゴリの変更
 - ノードのラベルが表示されるかどうかの選択
 - ノードの色の変更
 - ノードのアイコンの変更
 - ポートラベルのカスタマイズ


#### サブフローを削除する

サブフローツールバーの「サブフローを削除」ボタンは、
サブフローとその*すべて*のインスタンスノードを削除するために利用できます。
