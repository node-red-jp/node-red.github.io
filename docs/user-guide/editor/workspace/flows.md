---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/workspace"
    label: "ワークスペース"
  - "フロー"
toc: toc-editor-guide.html
title: フロー
---

フローはエディタのワークスペース内でタブとして表現され、
ノードをまとめる主な方法です。

<div class="figure">
  <img src="../images/editor-flow-tabs.png" alt="Flow tabs">
  <p class="caption">フロータブ</p>
</div>

<div class="doc-callout">
<em>Note</em> : 「フロー」という単語は連結したノードの1セットを口語的に指すこともあります。
つまり、フロー（タブ）は複数のフロー（連結したノードの複数セット）を持つことができます。
</div>

それぞれのフローは名前と[情報サイドバー](../sidebar/info)に表示される詳細を持つことができます。

フロー内のすべてのノードは同じ[フロースコープのコンテキスト](/docs/user-guide/context)にアクセスすることができます。


#### フローを追加する

フローを追加するには、上部バーの <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-plus"></i>
ボタンをクリックするか、タブバーの空いているスペースをダブルクリックします。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>なし</i></td></tr>
 <tr><td>メニューオプション</td><td><code>フロー -&gt; フローを新規追加</code></td></tr>
 <tr><td>動作</td><td><code>core:add-flow</code></td></tr>
</table>

#### フローの並び順を変更する

フローはワークスペースのタブバー内でタブをドラッグ&ドロップすることにより並び順を変更できます。

#### フロープロパティを編集する

<div style="width:350px" class="figure align-right">
  <img src="../images/editor-edit-flow.png" alt="Flow properties editor">
  <p class="caption">フロープロパティエディタ</p>
  <img src="../images/editor-sidebar-info.png" alt="Information Sidebar">
  <p class="caption">情報サイドバー</p>
</div>

フローのプロパティを編集するには、上部バーのタブをダブルクリックします。
この操作でフロープロパティダイアログが開きます。

<ul>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-cog"></i> : Properties - set the flow's name and description. The description
    can use Markdown syntax for formatting and will appear in the <a href="../sidebar/info">Information sidebar</a>.</li>
    <li style="margin-bottom: 10px"><i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-list"></i> : Environment Variables - properties that are exposed as environment variables within the flow. <i>Since Node-RED 2.1</i></li>
</ul>


<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>なし</i></td></tr>
 <tr><td>メニューオプション</td><td><code>フロー -&gt; フロー名を変更</code></td></tr>
 <tr><td>動作</td><td><code>core:edit-flow</code></td></tr>
</table>

#### Enabling or disabling a flow

The flow can be enabled or disabled using the toggle button at the bottom of the
dialog. If a flow is disabled, none of the nodes it contains will be created when
the flow is deployed.

*Since Node-RED 1.1.0*

The <i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-circle-thin"></i> button in the [Information sidebar](../sidebar/info) can also be used to enable or disable the node/flow.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:enable-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:disable-flow</code></td></tr>
</table>

<br style="clear: both;" />

#### Hiding or showing a flow

*Since Node-RED 2.1.0*

A flow can be hidden by clicking on the <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-times"></i> on the tab.

When hidden, the [Information sidebar](../sidebar/info) will show an <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-eye-slash"></i> icon next to it. Clicking that icon will show the flow again.

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Alt-w</code></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Hide flow</code></td></tr>
 <tr><td>Action</td><td><code>core:hide-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Alt-Shift-w</code></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Show last hidden flow</code></td></tr>
 <tr><td>Action</td><td><code>core:show-last-hidden-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Hide other flows</code></td></tr>
 <tr><td>Action</td><td><code>core:hide-other-flows</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Hide all flows</code></td></tr>
 <tr><td>Action</td><td><code>core:hide-all-flows</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><code>[Tab Menu] Show all flows</code></td></tr>
 <tr><td>Action</td><td><code>core:show-all-flows</code></td></tr>
</table>


#### フローを有効化または無効化する

フローは、ダイアログの最下部のトグルボタンによって有効化・無効化できます。
フローが無効化されていれば、
ノードはがデプロイされたときに、フロー内のノードは作成されません。

*Since Node-RED 1.1.0*

[情報サイドバー](../sidebar/info)の<i style="font-size: 0.8em; border-radius: 2px; display:inline-block;text-align:center; width: 20px; color: #777; border: 1px solid #777; padding: 3px;" class="fa fa-circle-thin"></i>ボタンはノード/フローの有効化または無効化をおこなうこともできます。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>none</i></td></tr>
 <tr><td>メニューオプション</td><td><i>none</i></td></tr>
 <tr><td>動作</td><td><code>core:enable-flow</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>none</i></td></tr>
 <tr><td>メニューオプション</td><td><i>none</i></td></tr>
 <tr><td>動作</td><td><code>core:disable-flow</code></td></tr>
</table>


<br style="clear: both;" />

#### フローを削除する

フローを削除するには、フロープロパティダイアログで「削除」ボタンをクリックします。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>なし</i></td></tr>
 <tr><td>メニューオプション</td><td><code>フロー -&gt; フローを削除</code></td></tr>
 <tr><td>動作</td><td><code>core:remove-flow</code></td></tr>
</table>

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-flow-search-tabs.png" alt="Search flows">
  <p class="caption">Search flows</p>
</div>

#### フローを切り替える

有効なフローのリストを表示するには、バー上部の
<i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-list-ul"></i> ボタンをクリックします。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-Shift-f</code></td></tr>
 <tr><td>メニューオプション</td><td><i>none</i></td></tr>
 <tr><td>動作</td><td><code>core:list-flows</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-[</code></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-previous-tab</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><code>Ctrl/⌘-]</code></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-next-tab</code></td></tr>
</table>
