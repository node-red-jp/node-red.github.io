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

### インストール

`node-red-admin`コマンドを使用可能にするため、
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

 - `list` - インストール済みノードの一覧を表示する
 - `info` - モジュールまたはノードセットの詳細情報を表示する
 - `enable` - 指定したモジュールまたはノードセットを有効にする
 - `disable` - 指定したモジュールまたはノードセットを無効にする
 - `search` - npm公開リポジトリで指定したキーワードに関連するNode-REDモジュールを検索する
 - `install` - npm公開リポジトリからNode-REDモジュールをインストールする
 - `remove` - npm公開リポジトリからインストールしたNode-REDモジュールを削除する
 - `hash-pw` - `adminAuth`および`httpNodeAuth`プロパティに利用可能なパスワードのハッシュ値を生成する
