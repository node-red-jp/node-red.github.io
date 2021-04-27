---
layout: docs-getting-started
toc: toc-user-guide.html
title: ローカルでNode-REDを実行する
slug: ローカル
redirect_from:
  - /docs/getting-started/installation
  - /docs/getting-started/running
  - /docs/getting-started/upgrading

---

<div class="doc-callout">
<div style="float: left; margin-right: 10px;"><img src="/images/logos/raspberrypi.svg" height="30">
<img src="/images/logos/debian.svg" height="30">
<img src="/images/logos/ubuntu.svg" height="30">
</div>
Raspberry PiまたはUbuntuまたはDiet-Piを含むDebianベースのオペレーティングシステムの場合、
<a href="raspberrypi">こちら</a>のRaspberry Piのインストールスクリプトを利用できます。
</div>

<div class="doc-callout">
<div style="float: left; margin-right: 10px;"><img src="/images/logos/redhat.svg" height="30">
<img src="/images/logos/fedora.svg" height="30">
<img src="/images/logos/centos.svg" height="40">
</div>
RedHat、FedoraおよびCentOSを含むRPMベースのオペレーティングシステムを利用している場合、
<a href="https://github.com/node-red/linux-installers">こちら</a>で入手できるRPMのインストールスクリプトを利用することができます。
</div>

<div class="doc-callout">
<div style="float: left; margin-right: 10px; margin-bottom: 10px;">
<img src="/images/logos/windows.svg" height="30">
</div>
Windowsを利用している場合、Node-REDをインストールするための詳細な手順は<a href="/docs/getting-started/windows">こちら</a>で見つけることができます。
</div>

### 必須条件

ローカル環境にNode-REDをインストールするためには[サポートされているNode.jsのバージョン](/docs/faq/node-versions)が必要です。

### npmによってインストールする

Node-REDをインストールするため、Node.jsに同梱の`npm`コマンドを利用できます:

```
sudo npm install -g --unsafe-perm node-red
```

Windowsを利用している場合、このコマンドを<code>sudo</code>からは始めません。

このコマンドは、依存関係とともにNode-REDをグローバルモジュールとしてインストールします。

コマンドの出力の最後が以下のようになった場合、インストールが成功したと確認できます。

```
+ node-red@1.1.0
added 332 packages from 341 contributors in 18.494s
found 0 vulnerabilities
```

### Dockerでインストールする

最も簡単な方法によってDockerで直接実行するには、次のようにします:
```
docker run -it -p 1880:1880 --name mynodered nodered/node-red
```
更なる追加情報は私達の[docker](/docs/getting-started/docker)のガイドを参照してください。

### Snapでインストールする

OSが[Snap](https://snapcraft.io/docs/core/install)をサポートしている場合、
以下のようにNode-REDをインストールすることができます:

```
sudo snap install node-red
```

Snapパッケージとしてインストールした場合、
利用しなくてはならない以下のような外部の機能へのアクセスを持っていないセキュアなコンテナで実行できます:

 - メインシステムストレージにアクセスする。ローカルホームディレクトリへのread/writeのみ許可されています。
 - `gcc` - インストールしたいノードのバイナリコンポーネントをコンパイルするために必要です
 - `git` - プロジェクト機能を利用したい場合、必要になります
 - GPIOハードウェアへの直接アクセス権
 - フローの（例えば）Execノードで実行される外部コマンドへのアクセス権

コンテナのセキュリティは低下するものの
より幅広いアクセスが可能な「クラシック」モードで実行することもできます。

### 実行する

一度グローバルモジュールとしてインストールしたら、
ターミナルにおいて`node-red`コマンドを使ってNode-REDを起動することができます。
`Ctrl-C`を使うか、ターミナルウィンドウを閉じることでNode-REDを停止することができます。

```
$ node-red

Welcome to Node-RED
===================

30 Jun 23:43:39 - [info] Node-RED version: v1.1.0
30 Jun 23:43:39 - [info] Node.js  version: v10.21.0
30 Jun 23:43:39 - [info] Darwin 18.7.0 x64 LE
30 Jun 23:43:39 - [info] Loading palette nodes
30 Jun 23:43:44 - [warn] rpi-gpio : Raspberry Pi specific node set inactive
30 Jun 23:43:44 - [info] Settings file  : /Users/nol/.node-red/settings.js
30 Jun 23:43:44 - [info] HTTP Static    : /Users/nol/node-red/web
30 Jun 23:43:44 - [info] Context store  : 'default' [module=localfilesystem]
30 Jun 23:43:44 - [info] User directory : /Users/nol/.node-red
30 Jun 23:43:44 - [warn] Projects disabled : set editorTheme.projects.enabled=true to enable
30 Jun 23:43:44 - [info] Creating new flows file : flows_noltop.json
30 Jun 23:43:44 - [info] Starting flows
30 Jun 23:43:44 - [info] Started flows
30 Jun 23:43:44 - [info] Server now running at http://127.0.0.1:1880/red/
```

そして、ブラウザで<http://localhost:1880>を指定することでNode-REDエディタにアクセスすることができます。

ログ出力は様々な情報を提供してくれます。

 - Node-REDおよびNode.jsのバージョン
 - パレットにノードをロードしようとしたときに発生したエラー
 - 設定ファイルおよびユーザディレクトリの位置
 - 利用しているフローファイルの名称

Node-REDはデフォルトのフローファイルとして`flows_<hostname>.json`を利用します。
`node-red`[コマンド](/docs/getting-started/local#command-line-usage)の引数としてフローファイル名を渡すことで、これを変更することができます。

### コマンドラインの使い方

Node-REDは`node-red`コマンドを使うことで起動できます。
このコマンドは様々な引数をとることができます:

```
node-red [-v] [-?] [--settings settings.js] [--userDir DIR]
         [--port PORT] [--title TITLE] [--safe] [flows.json|projectName]
         [-D X=Y|@file]
```

オプション                  | 詳細     |
------------------------|-----------------|
`-p`, `--port PORT`     | ランタイムが待ち受けているTCPポートを設定します。デフォルト: `1880` |
`--safe`                | フローを起動せずにNode-REDを起動します。このオプションはエディタでフローを開き、フローを起動せずに変更をおこなえるようにします。変更をデプロイしたとき、フローは起動されます。 |
`-s`, `--settings FILE` | 利用する設定ファイルを設定する。デフォルト: `settings.js` in `userDir` |
`--title TITLE`         | プロセスウィンドウタイトルを設定する。 |
`-u`, `--userDir DIR`   | 利用するユーザディレクトリを設定する。デフォルト: `~/.node-red` |
`-v`                    | 冗長な出力を取得します。 |
`-D X=Y|@file`          | [個別に設定を上書きする](#個別に設定を上書きする) |
`-?`, `--help`          | コマンドラインの使い方を表示し、終了します。 |
`flows.json|projectName`| プロジェクト機能を有効にしていない場合、作業したいフローファイルをこのオプションで指定します。プロジェクト機能が有効な場合、どのプロジェクトを利用するのかを指定します。 |

Node-REDはデフォルトのフローファイルとして`flows_<hostname>.json`を利用します。
実行しているコンピュータがホスト名を変更した場合、
静的なファイル名をコマンドライン引数または[設定ファイル](/docs/user-guide/runtime/settings-file)内の`flowsFile`オプションとして、
提供することを保証する必要があります。

#### 個別に設定を上書きする

*Since Node-RED 1.1.0*

コマンドライン上で`-D`（もしくは`--define`）オプションを使うことで
個別に設定を上書きすることができます。

例えば、ログレベルを変更することができます:
```
-D logging.console.level=trace
```

また、ファイルによって設定をカスタマイズできます:
```
-D @./custom-settings.txt
```

ファイルには上書きする設定の一覧を含んでいる必要があります:
```
logging.console.level=trace
logging.console.audit=true
```




### 基盤であるNode.jsプロセスに引数を渡す


基盤であるNode.jsプロセスに引数を渡さなければならない機会はあります。
例えば、Raspberry PiやBeagleBone Blackのように、
メモリ容量が制限されたデバイスで実行する場合です。

これをおこなうためには、起動スクリプトの`node-red`の代わりに`node-red-pi`を利用する必要があります。
_Note_: このスクリプトはWindowsでは利用できません。

反対に、`node`コマンドを利用してNode-REDを起動した場合、
`red.js`およびNode-RED自体に渡す引数を指定する前に
Nodeプロセスに引数を渡す必要があります。

以下の2つのコマンドは2種類のアプローチを紹介しています:

    node-red-pi --max-old-space-size=128 --userDir /home/user/node-red-data/
    node --max-old-space-size=128 red.js --userDir /home/user/node-red-data/

### Node-REDをアップグレードする

<div class="doc-callout">
<div style="float: left; margin-right: 10px;"><img src="/images/logos/raspberrypi.svg" height="30">
<img src="/images/logos/debian.svg" height="30">
<img src="/images/logos/ubuntu.svg" height="30">
</div>
Raspberry Piスクリプトを利用してNode-REDをインストールした場合、それを再利用することでアップグレードすることができます。
スクリプトは<a href="/docs/hardware/raspberrypi">こちら</a>で入手できます。</div>

グローバルnpmパッケージとしてNode-REDをインストールした場合、
以下のコマンドによって最新版にアップグレードすることができます:

```
sudo npm install -g --unsafe-perm node-red
```

Windowsを利用している場合、コマンドの先頭に<code>sudo</code>は不要です。



### 次のステップ

 - [エディタをセキュアにする方法を学習する](/docs/user-guide/runtime/securing-node-red)
 - [はじめてのフローを作成する](/docs/tutorials/first-flow)
 - [起動時にNode-REDを起動する](/docs/faq/starting-node-red-on-boot)
