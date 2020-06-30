---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/workspace"
    label: "ワークスペース"
  - 検索
toc: toc-editor-guide.html
title: フローを検索する
---

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-search.png" alt="Search dialog">
  <p class="caption">検索ダイアログ</p>
</div>

検索ダイアログでは、
ワークスペース内のノードを設定ノードを含めて検索することができます。

ノードのすべてのプロパティはインデックス付けされているため、
IDや種類、その他プロパティからノードを検索できます。

検索結果の一覧からノードを選択することで、エディタ内のノードがわかります。

<div style="width: 400px; float: right">
<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-f</code></td></tr>
 <tr><td>メニューオプション</td><td><code>ノードを検索</code></td></tr>
 <tr><td>動作</td><td><code>core:search</code></td></tr>
</table>
</div>

Clicking the <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-caret-right"></i>
button will copy the current search over to the Information sidebar search.

### Search syntax

The search supports a number additional filters to help narrow down the results.

Filter                   | Description                                   |
-------------------------|-----------------------------------------------|
`is:config`              | Limits the results to Configuration nodes     |
`is:subflow`             | Limits the results to Subflows                |
`is:unused`              | Matches Configuration nodes or Subflows that are unused |
`is:invalid`             | Matches nodes that contain configuration errors |
`uses:<config-node-id>`  | Limits the results to nodes that depend on the specific configuration node |