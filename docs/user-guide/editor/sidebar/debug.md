---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/sidebar"
    label: "サイドバー"
  - "デバッグ"
toc: toc-editor-guide.html
title: 'サイドバー: デバッグメッセージ'
---

<div style="width: 300px" class="figure align-right">
  <img src="../images/editor-sidebar-debug.png" alt="Debug messages Sidebar">
  <p class="caption">デバッグメッセージサイドバー</p>
</div>

デバッグサイドバーは、ランタイムからの特定のログメッセージと同様に、
フロー内のDebugノードから受け渡されたメッセージを表示します。

メッセージの構造を理解するためにデバッグサイドバーを利用する方法については、
[メッセージを利用する](/docs/user-guide/messages)ガイドを参照してください。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>動作</td><td><code>core:show-debug-tab</code></td></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-g d</code></td></tr>
</table>

デフォルトでは、デバッグサイドバーは受け渡されたすべてのメッセージを表示します。
<i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-filter"></i>ボタンをクリックし、フィルターオプションパネルを開くことでフィルタリングすることができます。

<div style="width: 300px" class="figure">
  <img src="../images/editor-sidebar-debug-filter.png" alt="Debug filter options">
  <p class="caption">デバッグフィルターオプション</p>
</div>

パネルは3つの選択肢を提供します。:

 - *すべてのフロー*（*all nodes*） - すべてのメッセージを表示します
 - *選択したノード*（*selected nodes*） - すべてのDebugノードの一覧から特定のノードを選択します
 - *現在のフロー*（*current flow*） - ワークスペースの現在のフローのノードからのメッセージを表示します

**Note:** Debugノードは最新100件分のメッセージを表示します。
現在のサイドバーにフィルタリングされたメッセージの一覧が表示されている場合、隠されているメッセージも100件の制限に含めてカウントされます。
フローに出力の多いDebugノードが存在する場合、
サイドバーでフィルダリングするよりもワークスペースでそのノードのボタンをクリックして無効化することをお勧めします。

サイドバーは <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-trash"></i>ボタンをクリックすることでいつでもクリアできます。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>動作</td><td><code>core:clear-debug-messages</code></td></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-Alt-l</code></td></tr>
</table>


サイドバーのフッタの<i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-desktop"></i>ボタンは、
デバッグサイドバーを持つブラウザウィンドウを別で開くために利用することができます。





<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:activate-selected-debug-nodes</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:activate-all-debug-nodes</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:activate-all-flow-debug-nodes</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:deactivate-selected-debug-nodes</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:deactivate-all-debug-nodes</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Action</td><td><code>core:deactivate-all-flow-debug-nodes</code></td></tr>
</table>