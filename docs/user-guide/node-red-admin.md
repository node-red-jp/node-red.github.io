---
layout: docs-user-guide
toc: toc-user-guide.html
title: コマンドラインAdminツール
slug: node-red-admin
redirect_from:
  - /docs/node-red-admin
---

[node-red-admin](http://npmjs.org/package/node-red-admin)コマンドラインツールを使用すると、
リモートのNode-REDインスタンスを管理することができます。

Node-RED 1.1.0から、今や`node-red-admin`は`node-red`コマンドに組み込まれています - 
個別にインストールする必要はありません。

`node-red`に含まれているバージョンで使うには、`node-red admin`コマンドを使います。

個別にインストールする場合、`node-red-admin`コマンドを利用します。


### インストール

`node-red-admin`コマンドを個別にインストールしたい場合、
Adminツールをグローバルnpmインストールします。

    npm install -g --unsafe-perm node-red-admin

<div class="doc-callout">
<em>Note</em> : <code>sudo</code>はLinux/OS Xでルートユーザ以外のユーザとして実行するときに必要となるコマンドです。
Windowsで実行するときは、<a href="https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx">Administratorとしてコマンドプロンプトから</a>、
<code>sudo</code>コマンドを使わずに実行してください。
</div>


### ターゲットとログイン

リモートでNode-REDインスタンスを管理するには、まずAdminツールでアクセスしたいNode-REDインスタンスを指定しなければいけません。
デフォルトでは`http://localhost:1880`が指定されています。変更するには`target`コマンドを使用します。

    node-red-admin target http://node-red.example.com/admin

[認証](/docs/user-guide/runtime/securing-node-red)が有効な場合は、`login`します。

    node-red-admin login

これらのコマンドはターゲットとアクセストークンの情報を格納する`~/.node-red/cli-config.json` 
というファイルを作成します。

<div class="doc-callout">
<em>Note</em> : `hash-pw`オプションは、ログインしている必要<i>なく</i>、いつでも実行することができます。
</div>

### その他のコマンド

このツールは以下のコマンドを提供します。:

 - `target`  - ターゲットURLおよびポートをhttp://localhost:1880 のように設定もしくは確認する
 - `login`   - Node-RED管理APIのターゲットにログインする
 - `list`    - インストール済みノードの一覧を表示する
 - `info`    - モジュールまたはノードの詳細情報を表示する
 - `enable`  - 指定したモジュールまたはノードセットを有効にする
 - `disable` - 指定したモジュールまたはノードセットを無効にする
 - `search`  - インストールしたいNode-REDモジュールを検索する
 - `install` - Node-REDにNPMからモジュールをインストールする
 - `remove`  - Node-REDからNPMモジュールを削除する
 - `hash-pw` - `adminAuth`および`httpNodeAuth`プロパティに利用可能なパスワードのハッシュ値を生成する