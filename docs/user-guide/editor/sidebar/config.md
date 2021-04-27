---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/sidebar"
    label: "サイドバー"
  - "設定"
toc: toc-editor-guide.html
title: 'サイドバー: ノードの設定'
---

<div style="width: 300px" class="figure align-right">
  <img src="../images/editor-sidebar-config-nodes.png" alt="Configuration nodes Sidebar">
  <p class="caption">ノードの設定サイドバー</p>
</div>

ノードの設定サイドバーは、
スコープごとにすべてのConfigurationノードの一覧を表示します。

各ノードはタイプとラベルとともに、
このConfigurationノードを現在利用している通常フローのノードの数を表示します。

Configurationノードが未使用の場合、破線の枠線が表示されます。
ヘッダの「未使用（unused）」フィルターを選択することで、
未使用のノードのみ表示するようにビューをフィルタリングできます。

Configurationノード上でダブルクリックすると、そのノードの編集ダイアログを開くことができます。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>動作</td><td><code>core:show-config-tab</code></td></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-g c</code></td></tr>
</table>
