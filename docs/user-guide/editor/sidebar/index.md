---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - "サイドバー"
toc: toc-editor-guide.html
title: サイドバー
---

<div style="width: 300px" class="figure align-right">
  <img src="../images/editor-sidebar.png" alt="Editor Sidebar">
  <p class="caption">エディタサイドバー</p>
</div>

サイトバーには、エディタ内のたくさんの便利なツールを提供しているパネルが含まれています。

 - [情報](info) - ノードについての情報およびヘルプを表示します
 - [デバッグ](debug) - Debugノードに受け渡されたメッセージを表示します
 - [ノードの設定](config) - Configurationノードを管理します
 - [コンテキストデータ](context) - コンテキストの内容を表示します

[node-red-dashboard](https://flows.nodered.org/node/node-red-dashboard)のように、いくつかのノードは独自のサイドバーパネルを提供します。

サイドバーのヘッダのアイコン、
または<i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-caret-down"></i>ボタンをクリックして表示されるドロップダウンリスト内のアイコンをクリックすることでパネルが展開されます。

ワークスペースとの境界をドラッグすることでサイドバーをリサイズできます。

この境界を右端までドラッグした場合、サイドバーは非表示になります。
メニューの表示から「サイドバーを表示」オプションを選択する、
またはショートカットキー<code>Ctrl/⌘-Space</code>を利用することで再表示できます。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-Space</code></td></tr>
 <tr><td>メニューオプション</td><td><code>表示 -&gt; サイドバーを表示</code></td></tr>
 <tr><td>動作</td><td><code>core:toggle-sidebar</code></td></tr>
</table>
