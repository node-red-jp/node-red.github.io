---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/sidebar"
    label: "サイドバー"
  - "コンテキスト"
toc: toc-editor-guide.html
title: 'サイドバー: コンテキストデータ'
---

<div style="width: 300px" class="figure align-right">
  <img src="../images/editor-sidebar-context.png" alt="Context data Sidebar">
  <p class="caption">コンテキストデータサイドバー</p>
</div>

コンテキストデータサイドバーはコンテキストデータストアの中身を表示します。

コンテキストの使い方についての更なる情報は、[コンテキストを利用する](/docs/user-guide/context)ガイドを参照してください。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>動作</td><td><code>core:show-context-tab</code></td></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-g x</code></td></tr>
</table>

パネルは、各コンテキストスコープに応じた、ノード・フロー・グローバルの3つのセクションに分かれています。

コンテキストのデータをロードするには、更新ボタン <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-refresh"></i>
をクリックしなければいけません。

ノードとフローのどちらのセクションも更新ボタンの隣にチェックボックスがあり、
これがデータの自動更新をするかどうかを切り替えます。

コンテキストプロパティの名称にマウスをホバーすると、
1つの値だけを更新するための更新ボタンが表示されます。

コンテキストプロパティの値にマウスをホバーすると、
その内容をクリップボードへコピーするボタンが表示されます。
値はJSONに変換されるため、すべての値がコピーされるわけではありません。
