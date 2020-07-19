---
layout: docs-getting-started
toc: toc-user-guide.html
title: Raspberry Piで実行する
slug: raspberry pi
redirect_from:
  - /docs/hardware/raspberrypi
---


### 必須条件

Raspbianを利用している場合、最低でもRaspbian Jessie以降のバージョンが必要です。
Raspbian Busterは現在サポートされています。

### Node-REDをインストールする

私たちの提供するスクリプトはNode.js、npmおよびNode-REDをRaspberry Piにインストールします。
このスクリプトは新しいリリースが入手できるようになった場合、
インストール済のアプリをアップグレードすることも可能です。

以下のコマンドを実行することでスクリプトをダウンロードし、実行することができます。
スクリプトの中身を最初にレビューしたい場合、[こちら](https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)で確認することができます。

```
bash <(curl -sL https://raw.githubusercontent.com/node-red/linux-installers/master/deb/update-nodejs-and-nodered)
```

<div class="doc-callout">
<div style="float: left; margin-right: 10px; margin-bottom: 30px;">
<img src="/images/logos/debian.svg" height="30">
<img src="/images/logos/ubuntu.svg" height="30">
</div>
このスクリプトはUbuntuやDiet-Piを含むDebianベースのオペレーティングシステムで動作します。
npmがインストールする必要のあるバイナリコンポーネントをビルドできることを保証するため、
<code>sudo apt install build-essential git</code>を実行する必要があるかもしれません。
</div>


このスクリプトは以下のことを実行します:

 - 存在すれば事前にパッケージされているバージョンのNode-REDおよびNode.jsを除去します
 - [NodeSource](https://github.com/nodesource/distributions/blob/master/README.md)を利用して現行のNode.js LTSリリースをインストールします。
 Node.jsが既にNodeSourceからインストールされていると認識され、それがNode 8以上とわかった場合、そのままにします
 - npmを利用して最新版のNode-REDをインストールします
 - 追加で有用なRaspberry Pi固有ノードのコレクションをインストールします
 - サービスとしてNode-REDを実行するように設定し、
 サービスとして動作するためのコマンド一覧を提供します

<div class="doc-callout">
<div style="float: left; margin-right: 10px;margin-bottom: 40px;">
<img src="/images/logos/raspberrypi.svg" height="30">
</div>
Node-REDは既にRaspbianリポジトリとしてパッケージされており、
「推奨ソフトウェア」の一覧に含まれています。
これは<code>apt-get install nodered</code>によってインストールすることを可能にし、
またRaspbianパッケージされたバージョンのNode.jsを含んでいますが、<code>npm</code>は含んで<em>いません</em>。
<p>一見これらのパッケージを利用することは便利に見えますが、
上述のインストールスクリプトを利用することを<b>強く推奨</b>します。</p>
</div>

### ローカルで実行する

[ローカルでNode-REDを実行する](/docs/getting-started/local)場合、
ターミナルで`node-red`コマンドを使うことでNode-REDを起動することができます。
そして、`Ctrl-C`を押すかターミナルウィンドウを閉じることで停止することができます。

Raspberry Piの制限されたメモリ容量のため、
基盤となるNode.jsプロセスに未使用のメモリを早く解放するように指示するような
追加引数とともにNode-REDを起動する必要があります。

このためには、代替となる`node-red-pi`コマンドを利用し、
`max-old-space-size`引数を渡す必要があります。

```
node-red-pi --max-old-space-size=256
```

### サービスとして実行する

Raspberry Piのためのインストールスクリプトはサービスとして実行することも設定します。
これはバックグラウンドで実行し、起動時に自動的に起動できるように設定することを意味します。

以下のコマンドはサービスとして動作するために提供されます:

 - `node-red-start` - Node-REDサービスを起動し、そのログ出力を表示します。
 `Ctrl-C`を押す、またはウィンドウを閉じることはサービスを停止*させません*;
 Node-REDはバックグラウンドで実行し続けます
 - `node-red-stop` - Node-REDサービスを停止します
 - `node-red-restart` - Node-REDサービスを停止し、再起動します
 - `node-red-log` - サービスのログ出力を表示させます

メニューオプション`Menu -> Programming -> Node-RED`を選択することによって、
Raspbian DesktopでNode-REDサービスを起動することもできます。

### 起動時に自動起動する

Raspberry Piの電源がついたとき、またはブート時にNode-REDを起動させたい場合、
以下のコマンドを実行することでサービスを自動起動させることができます。

```
sudo systemctl enable nodered.service
```

サービスを無効にするため、以下のコマンドを実行します:
```
sudo systemctl disable nodered.service
```

### エディタを開く

いったんNode-REDを実行したら、ブラウザでエディタにアクセスすることができます。

Raspberry Piデスクトップでブラウザを利用している場合、以下のアドレスでエディタを開くことができます: <http://localhost:1880>

<div class="doc-callout">Raspberry Piの外部のブラウザを使ってRaspberry Piで実行されているNode-REDを指定することを推奨します。ビルトインのブラウザを使うこともできますが、その場合はEpiphanyでは<i>なく</i>、ChromiumまたはFirefox-ESRを推奨します。</div>

他のマシンからブラウジングする場合、Raspberry PiのIPアドレスを利用すべきです: `http://<ip-address>:1880`。
Raspberry Piで`hostname -I`を実行することでIPアドレスを確認できます。


### 次のステップ

- [エディタをセキュアにする方法を学習する](/docs/user-guide/runtime/securing-node-red)
- [はじめてのフローを作成する](/docs/tutorials/first-flow)
- [パレットにノードを追加する](/docs/user-guide/runtime/adding-nodes)
