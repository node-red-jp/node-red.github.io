---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/workspace"
    label: "ワークスペース"
  - "インポート/エクスポート"
toc: toc-editor-guide.html
title: フローのインポートとエクスポート
---

JSON形式でフローをエディタにインポートしたりエクスポートしたりすることで、
フローを非常に簡単に他の人々と共有することができます。

### フローをインポートする

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-import.png" alt="Import dialog">
  <p class="caption">読み込みダイアログ</p>
</div>

読み込みダイアログでは次に示す方法でフローをインポートできます:

 - JSON形式のフローデータを直接貼り付ける
 - JSONファイルをアップロードする
 - ローカルのフローライブラリを参照する
 - インストールしたノードが提供するサンプルを参照する

いずれの場合も、ダイアログでは現在のフローにノードをインポートするか、
新しいフローを作成するかを選ぶことができます。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-i</code></td></tr>
 <tr><td>メニューオプション</td><td><code>読み込み</code></td></tr>
 <tr><td>動作</td><td><code>core:show-import-dialog</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>none</i></td></tr>
 <tr><td>メニューオプション</td><td><i>none</i></td></tr>
 <tr><td>動作</td><td><code>core:show-library-import-dialog</code></td></tr>
</table>

<table class="action-ref inline">
 <tr><th colspan="2">Reference</th></tr>
 <tr><td>Key shortcut</td><td><i>none</i></td></tr>
 <tr><td>Menu option</td><td><i>none</i></td></tr>
 <tr><td>Action</td><td><code>core:show-examples-import-dialog</code></td></tr>
</table>



<br style="clear:both" />

### フローをエクスポートする

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-export.png" alt="Export Flows dialog">
  <p class="caption">フロー書き出しダイアログ</p>
</div>

書き出しダイアログは次に示す方法でエディタからJSON形式のフローをコピーするために利用できます:

 - JSONをシステムのクリップボードにコピーする
 - JSONをファイルとしてダウンロードする
 - ローカルのフローライブラリに保存する

選択されているノード、現在のフロー（タブノードを含む）またはすべてのフロー設定を
エクスポートすることができます。

ダイアログはエクスポートするJSONフォーマットとしてインデントのない形式とインデント付きの形式という選択肢を提示します。
インデントのないフォーマットでは空白がなく、単一行のJSONになります。
インデント付きのフォーマットでは、読みやすいようにインデントがつけられ、複数行になります。

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-e</code></td></tr>
 <tr><td>メニューオプション</td><td><code>書き出し</code></td></tr>
 <tr><td>動作</td><td><code>core:show-export-dialog</code></td></tr>
</table>
<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><i>none</i></td></tr>
 <tr><td>メニューオプション</td><td><i>none</i></td></tr>
 <tr><td>動作</td><td><code>core:show-library-export-dialog</code></td></tr>
</table>
