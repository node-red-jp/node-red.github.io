---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/workspace"
    label: "ワークスペース"
  - ノード
toc: toc-editor-guide.html
title: ノード
---

ノードは以下のような方法でワークスペースに追加できます。:

 - [パレット](../palette)からドラッグする
 - [クイック追加ダイアログ](#クイック追加ダイアログ)を利用する
 - ライブラリまたはクリップボードからインポートする


 <div style="width: 222px" class="figure align-right">
   <img src="../images/editor-node-port-label.png" alt="Node port labels">
   <p class="caption">ノードポートラベル</p>
 </div>

ノード同士はポートを介してワイヤーで繋がれます。
ノードの多くは1つの入力ポートと複数の出力ポートを持っています。
ポートは、マウスをホバーした際に表示されるラベルを持っているかもしれません。
ノードはラベルを指定することができ、例えばSwitchノードはポートに対応するルールを表示します。
また、ラベルはノードの編集ダイアログでカスタマイズすることができます。

いくつかのノードは、ノードの下にステータスメッセージとアイコンを表示します。
これはノードの実行状態を示します。
例えば、MQTTノードでは現在接続しているか否かを示します。

<div style="width: 550px" class="figure">
  <img src="../images/editor-node-details.png" alt="">
  <p class="caption">ノードの要素</p>
</div>

ノードにデプロイされていない変更があった場合、ノードの上に青い丸が表示されます。
ノードの設定にエラーがあった場合、赤い三角形が表示されます。

一部のノードは左端または右端にボタンを持っています。
これらはノードに何らかの作用をもたらします。
InjectノードやDebugノードはボタンを持っているコアノードです。

#### クイック追加ダイアログ

クリック追加ダイアログは、
パレットからノードをドラッグする必要なく、マウスがどこにあろうともワークスペースにノードを追加できる簡単な方法です。

<div style="width: 340px" class="figure align-right">
  <img src="../images/editor-quick-add.png" alt="Quick-Add dialog">
  <p class="caption">クイック追加ダイアログ</p>
</div>

ワークスペースをクリックするときに`Ctrl`または`Command`キーを押すことで、
ダイアログが開きます。

ダイアログは追加できるすべてのノード一覧を含みます。
一覧の上部には主な5つのコアノードを表示し、
その下に最近追加されたノードが続き、最後に残りのノードがアルファベット順に並びます。

パレットと同様に、
ダイアログの上部には一覧をフィルタリングし、素早くノードを発見するための入力欄があります。

ノード一覧で`Ctrl`または`Command`キーを押しながらクリックすると、
ノードクイック追加ダイアログが開いたままノードが追加され、フローの次のノードが追加されます。

ダイアログをトリガーするときにワイヤーがクリックされると、
追加されたノードにワイヤーが繋がれます。

#### ノードのプロパティを編集する

ノードの設定はノード上でダブルクリック、
またはワークスペースでフォーカスされているときに`Enter`キーを押すことで編集できます。
複数のノードが選択されている場合、選択された*最初*のノードを編集します。

編集ダイアログには3つのタブがあります:

<ul>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-cog"></i> : Properties - the edit form specific to the node type being edited.</li>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-file-text"></i> : Description - per-node documentation formatted using Markdown. This is displayed in the <a href="../sidebar/info">Information sidebar</a> when the node is selected.</li>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-object-group"></i> : Appearance - options to customise the appearance of the node.</li>
</ul>

<div class="figure">
  <img style="width: calc(30% - 10px); display: inline-block;" src="../images/editor-edit-node.png" alt="Node edit dialog - properties">
  <img style="width: calc(30% - 10px); margin-left: 10px; display: inline-block;"  src="../images/editor-edit-node-description.png" alt="Node edit dialog - description">
  <img style="width: calc(30% - 10px); margin-left: 10px; display: inline-block;"  src="../images/editor-edit-node-appearance.png" alt="Node edit dialog - appearance">
  <p class="caption">Node edit dialog - properties, description and appearance tabs</p>
</div>

外観タブには次のオプションがあります:

 - ノードのラベルを表示するかどうか
 - ノードのアイコンの変更
 - ポートラベルのカスタマイズ

#### ノードの有効化・無効化

ノードはダイアログの最下部のトグルボタンで有効化・無効化できます。
ノードが無効化されている場合、フローがデプロイされるときには作成されません。
フローの途中に無効化されたノードがある場合は、メッセージは通過しません。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>none</i></td></tr>
 <tr><td>メニューオプション</td><td><i>none</i></td></tr>
 <tr><td>動作</td><td><code>core:enable-selected-nodes</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>none</i></td></tr>
 <tr><td>メニューオプション</td><td><i>none</i></td></tr>
 <tr><td>動作</td><td><code>core:disable-selected-nodes</code></td></tr>
</table>

#### 設定ノード

設定ノードは、
フロー内の通常のノードと共有できる再利用可能な設定を持った特殊なノードです。

例えば、MQTT InノードおよびMQTT OutノードはMQTTブローカ設定ノードを利用して、
MQTTブローカーへの共通した接続を表します。

設定ノードは、その設定ノードを必要とするノードの編集ダイアログを介して追加されます。
必要なタイプの利用可能な設定ノードから選択するか、
新しいインスタンスを追加するためのフィールドがあります。

<div style="width:468px;" class="figure align-center">
  <img src="../images/editor-edit-node-config-node.png" alt="Adding a configuration node">
  <p class="caption">設定ノードを追加する</p>
</div>

セレクトボックスの横のボタンをクリックすることで、
選択しているノードの編集ダイアログを開く、または新しいインスタンスを追加します。


<div style="width:321px;" class="figure align-right">
  <img src="../images/editor-edit-config-node.png" alt="Configuration node edit dialog">
  <p class="caption">設定ノード編集ダイアログ</p>
</div>

設定ノードにはアイコンや設定するラベルがないため、
設定ノードの編集ダイアログにはノードプロパティと説明タブのみがあります。

ダイアログのフッタには、この設定ノードを利用しているノードの数が表示されます。
また、設定ノードのスコープを設定するセレクトボックスも表示されます。
スコープは、この設定ノードが利用できるフローを定義します。
デフォルトではすべてのフローで利用できますが、セレクトボックスはこのスコープを1つのフローに限定することができます。

通常のノードとおなじく、フッタのトグルボタンで有効化や無効化ができます。

[ノードの設定サイドバー](/docs/user-guide/editor/sidebar/config)で、すべての設定ノードの管理をおこなうことができます。
