---
layout: docs-editor-guide
slug:
  - url: /docs/user-guide/editor
    label: エディタ
  - url: "/docs/user-guide/editor/palette"
    label: "パレット"
  - 'マネージャ'
toc: toc-editor-guide.html
title: パレットマネージャ
---


パレットマネージャは、パレットに新しいノードをインストールするために利用できます。
パレットマネージャはユーザ設定ダイアログのパレットタブからアクセスできます。

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-user-settings-palette-nodes.png" alt="Palette Manager - Nodes tab">
  <p class="caption">パレットマネージャ - 現在のノードタブ</p>
</div>

<table class="action-ref inline">
 <tr><th colspan="2">リファレンス</th></tr>
 <tr><td>ショートカットキー</td><td><code>Ctrl/⌘-Shift-p</code></td></tr>
 <tr><td>メニューオプション</td><td><code>パレットの管理</code></td></tr>
 <tr><td>動作</td><td><code>core:manage-palette</code></td></tr>
</table>

パレットマネージャは2つのタブを持っています。:

 - 現在のノード（Nodes）は、実行環境に現在インストールされているモジュールの一覧です
 - ノードの追加（Install）は、インストール可能なモジュールの一覧です

### ノードを管理する

現在のノードタブの各エントリには、
モジュールが提供している個々のノードの一覧とモジュールの名称とバージョンが表示されています。

各モジュールは削除、無効化、更新をおこなうことができます。
現在フロー内で利用されているノードの場合、削除や無効化はおこなえません。


### ノードをインストールする

<div style="width:400px" class="figure align-right">
  <img src="../images/editor-user-settings-palette-install.png" alt="Palette Manager - Install tab">
  <p class="caption">パレットマネージャ - ノードを追加タブ</p>
</div>

ノードを追加（Install）タブでは、利用可能なモジュールの検索とインストールをおこなうことができます。

モジュールを検索するためには、検索バーにその名称を入力します。
検索結果には、モジュールの最終更新日とドキュメントへのリンクを含んだ詳細情報が表示されます。
「ノードを追加（install）」ボタンをクリックすることでインストールできます。

<div style="width: 500px" class="figure">
  <img src="../images/editor-user-settings-palette-install-details.png" alt="Palette Manager - Install module details">
  <p class="caption">パレットマネージャ - インストールするモジュールの詳細情報</p>
</div>
