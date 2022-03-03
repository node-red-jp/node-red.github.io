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

#### Selecting multiple wires

You can also select multiple wires by holding <kbd>ctrl</kbd> while clicking on them.

When you select multiple nodes, we also highlight any wires between them. This can make it easier to follow a flow once you have selected it.

<div class="figure">
  <img src="../images/select-multiple-wires.png" alt="">
  <p class="caption">Selecting multiple wires</p>
</div>


#### Deleting wires

1. Select one or more wires 
    1. To select a single wire, left click 1 wire.
    1. To select multiple wires, left click 1 wire then while holding <kbd>ctrl/⌘</kbd>, click on the other wires.
1. Press the <kbd>delete</kbd> key


#### Slicing wires
You can also remove wires by slicing through them. You do this by holding the ctrl (or cmd) key, then dragging the mouse with the right-hand button pressed:

<div class="figure">
  <img src="../images/slicing-wires.gif" alt="">
  <p class="caption">Slicing wires</p>
</div>


#### Detaching nodes

##### Delete Node, keep wires
You can delete a node from the middle of a flow and have the wiring automatically repair itself in the background:


<div class="row">
  <div class="figure column">
    <img src="../images/delete-node-keep-wires.gif" alt="">
    <p class="caption">Delete Node, keep wires</p>
  </div>
  <table class="action-ref double-column">
    <tr><th colspan="2">Reference</th></tr>
    <tr><td>Action</td><td><code>core:core:delete-selection-and-reconnect</code></td></tr>
    <tr><td>Key shortcut</td><td><kbd>Ctrl/⌘-delete</kbd></td></tr>
  </table>
</div>

##### Detach Node from wires
You can also detach a node from the flow without deleting it:

<div class="row">
  <div class="figure column">
    <img src="../images/detatch-node-from-wire.gif" alt="">
    <p class="caption">Detach Node from wires</p>
  </div>
  <table class="action-ref double-column">
    <tr><th colspan="2">Reference</th></tr>
    <tr><td>Action</td><td><code>core:detach-selected-nodes</code></td></tr>
    <tr><td>Key shortcut</td><td><code>*Not assigned</code></td></tr>
  </table>
</div>

<i>\* There is no default shortcut for **Detach Node from wires**, but you can assign one yourself in the Keyboard pane of the Settings dialog.</i> 
