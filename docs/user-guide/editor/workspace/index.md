---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - ワークスペース
toc: toc-editor-guide.html
title: ワークスペース
---

<div style="width: 500px" class="figure align-right">
  <img src="../images/editor-default.png" alt="Editor window">
  <p class="caption">エディタウィンドウ</p>
</div>

メインワークスペースは、
パレットからノードをドラッグし、ノード同士をワイヤーで繋ぐことによってフローを開発する場所です。

ワークスペースの上部には1列のタブがあります。
これはそれぞれのフローおよび展開されているサブフローに対応します。

<br style="clear: both;" />

### 表示ツール

<div style="width: 340px; float: right">
 <table class="action-ref">
  <tr><th colspan="2">リファレンス</th></tr>
  <tr><td>動作</td><td><code>core:zoom-in</code></td></tr>
  <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-=</code></td></tr>
 </table>
 <table class="action-ref">
  <tr><th colspan="2">リファレンス</th></tr>
  <tr><td>動作</td><td><code>core:zoom-reset</code></td></tr>
  <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-0</code></td></tr>
 </table>
 <table class="action-ref">
  <tr><th colspan="2">リファレンス</th></tr>
  <tr><td>動作</td><td><code>core:zoom-out</code></td></tr>
  <tr><td>ショートカットキー</td><td><code>Ctrl/⌘--</code></td></tr>
 </table>
</div>

ワークスペースのフッタには、
ズームイン、ズームアウト、ズームレベルをデフォルトへとリセットするボタンが含まれています。

また、ビューナビゲータのためのトグルボタンも含まれます。

 <div style="width: 349px" class="figure">
   <img src="../images/editor-workspace-navigator.png" alt="Workspace footer with view navigator active">
   <p class="caption">ビューナビゲータ起動時のワークスペースフッタ</p>
 </div>

<br style="clear: both;" />

<table class="action-ref">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>動作</td><td><code>core:toggle-navigator</code></td></tr>
 <tr><td>ショートカットキー</td><td><i>なし</i></td></tr>
</table>

ビューナビゲータはワークスペース全体の縮小図を提供し、現在見えている範囲をハイライトします。
この範囲をナビゲータ内でドラッグすると、
ワークスペースの他の場所にすばやく移動することができます。
また、ワークスペースの遠くの端で「迷子」になったノードを発見するために非常に役立ちます。

### ビューをカスタマイズする

<table class="action-ref">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>動作</td><td><code>core:show-user-settings</code></td></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-,</code></td></tr>
</table>

ワークスペースビューは、
ユーザ設定ダイアログの「表示（View）」タブからカスタマイズすることができます。

<br style="clear: both;" />

<div style="width: 450px" class="figure align-right">
  <img src="../images/editor-user-settings-view.png" alt="User Settings View tab">
  <p class="caption">ユーザ設定の表示（View）タブ</p>
</div>
