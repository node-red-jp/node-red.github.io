---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/workspace"
    label: "ワークスペース"
  - "ワイヤー"
toc: toc-editor-guide.html
title: ワイヤー
---

<div style="width: 435px" class="figure align-right">
  <img src="../images/editor-node-wire.png" alt="Node elements">
  <p class="caption">ノードを繋ぐ</p>
</div>

ノードのポートでマウスの左ボタンを押し、目的のノードまでドラッグしてマウスを放すことで、
ノード同士を接続することができます。

また、`Ctrl/Command`キーを押したままにした場合、
ノードのポート上でマウスの左ボタンをクリック（そして放して）目的のノードをクリックすることでも接続できます。
`Ctrl/Command`キーを押したままにし、接続する目的のノードが出力ポートを持っていた場合、
新しいワイヤーはそのノードから開始されます。
これによって一連のノードを素早く繋げることができます。

これもワークスペース上で`Ctrl/Command-Click`によって呼び出される、
クイック追加ダイアログと組み合わせることができ、
素早く新しいノードを追加し、フロー内で前のノードと繋げることができます。


#### ワイヤーに割り込む

入力ポートと出力ポートの両方を持つノードをワイヤーの中間にドラッグした場合、
ワイヤーが破線で描画されます。
このときノードをドロップすると、自動的にその位置でノードが挿入されます。

<div class="figure">
  <img src="../images/editor-wiring-splice.png" alt="">
  <p class="caption">ワイヤー上でノードをドロップしてフローの中間に挿入する</p>
</div>

#### ワイヤーを動かす

ポートからワイヤーを切断するには、ワイヤーをクリックすることで選択状態にし、
そのポート上でマウスの左ボタンを押したときに`Shift`キーを押し続けます。
そしてマウスをドラッグすると、ポートからワイヤを切断して他のポートにドロップできます。
ワークスペース上でマウスボタンが放された場合、
ワイヤーは削除されます。

もしポートが複数のワイヤーを持っていた場合、
`Shift`キーを押したままボタンを押したときにどのワイヤーも選択されていなければ、すべてのワイヤーが移動します。

#### 複数のワイヤーを選択する

`Ctrl/Command`をホールドした状態でクリックすることで複数のワイヤーを選択することもできます。

複数のノードを選択するとき、ノード間のワイヤーもハイライトされます。このことにより、一度選択したノードを追跡しやすくなります。

<div class="figure">
  <img src="../images/select-multiple-wires.png" alt="">
  <p class="caption">複数のワイヤーを選択する</p>
</div>


#### ワイヤーを削除する

1. 1つ以上のワイヤーを選択します
    1. 1つのワイヤーを選択するには、1つのワイヤーを左クリックします
    1. 複数のワイヤーを選択するには、`Ctrl/Command`をホールドしている状態で1つのワイヤーを左クリックし、他のワイヤーをクリックします。
1. `Delete`キーを押します


#### ワイヤーを切る
ワイヤーを切ることでワイヤーを削除することもできます。`Alt/Option`キーをホールドすることで、左クリックを押したままマウスをドラッグします:

<div class="figure">
  <img src="../images/slicing-wires.gif" alt="">
  <p class="caption">ワイヤーを切る</p>
</div>


#### ノードをデタッチする

##### ノードを削除し、ワイヤーを残す
フローの中央からノードを削除することができ、バックグラウンドで結びつきが自動的に修正されます。


<div class="row">
  <div class="figure column">
    <img src="../images/delete-node-keep-wires.gif" alt="">
    <p class="caption">ノードを削除し、ワイヤーを残す</p>
  </div>
  <table class="action-ref double-column">
    <tr><th colspan="2">リファレンス</th></tr>
    <tr><td>動作</td><td><code>core:core:delete-selection-and-reconnect</code></td></tr>
    <tr><td>ショートカットキー</td><td><kbd>Ctrl/⌘-delete</kbd></td></tr>
  </table>
</div>

##### ワイヤーからノードをデタッチする
ノードを削除せずにフローからノードをデタッチすることもできます:

<div class="row">
  <div class="figure column">
    <img src="../images/detatch-node-from-wire.gif" alt="">
    <p class="caption">ワイヤーからノードをデタッチする</p>
  </div>
  <table class="action-ref double-column">
    <tr><th colspan="2">リファレンス</th></tr>
    <tr><td>動作</td><td><code>core:detach-selected-nodes</code></td></tr>
    <tr><td>ショートカットキー</td><td><code>*割当なし</code></td></tr>
  </table>
</div>

<i>\* **ワイヤーからのノードのデタッチ**にはデフォルトのショートカットはありませんが、設定ダイアログのキーボードペインで割当をおこなうことができます。</i> 
