---
layout: docs-getting-started
title: Microsoft Azureで実行する
slug: azure
toc: toc-user-guide.html
redirect_from:
  - /docs/platforms/azure
---

このガイドでは、Azure 仮想マシンのインスタンスで
Node-REDを実行する手順を紹介します。

#### ベースの仮想マシンイメージを作成する

1. [Azure ポータル](https://portal.azure.com/) にログインします。

2. 「新規」をクリックします。

3. 仮想マシンのリストから、**Ubuntu Server**を選択し、「作成」をクリックします。（訳注: 「Marketplace を検索」欄で`Ubuntu Server`と検索すると候補が表示されます。）

4. 「基本」の手順で、利用したいマシン名とユーザー名を入力し、インスタンスへアクセスするための認証情報を入力します。
   （訳注: 後述の手順で仮想マシンサイズにAシリーズを利用する場合は、「VM ディスクの種類」オプションに「HDD」を指定してください。）

5. 「サイズ」の手順で、仮想マシンのサイズを選択します。 単純な Node-RED のインスタンスをたてる場合、
   node.js はシングルスレッドで動作するので、マルチコアのサイズを選択しても恩恵を得られないことにご留意ください。
   初めての場合は、「すべて表示」をクリックし、`A1 Basic`を選択すると良いでしょう。

6. 「設定」の手順で、「ネットワーク セキュリティ グループ」を新規作成し、以下の内容で、新しい「受信規則」を追加します。
   （訳注: このほか、適宜「Virtual Network」や「サブネット」を作成してください。）
     - 名前: node-red-editor
     - 優先度: 1010
     - プロトコル: TCP
     - ポート範囲: 1880

7. 「設定」の手順で、「OK」をクリックします。
   概要を確認したのち、「OK」をクリックして、新しいインスタンスをデプロイしましょう。

数分後、インスタンスが起動します。
インスタンスのIPアドレスは、ポータルから確認することができます。

#### Node-RED のセットアップ

次はインスタンスにログインし、node.jsとNode-REDをインストールします。

前のステップで指定した認証情報を使って、
インスタンスにログインしてください。

ログインしたら、node.jsとNode-REDをインストールする必要があります。

       curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
       sudo apt-get install -y nodejs build-essential
       sudo npm install -g --unsafe-perm node-red


この時点で`node-red`を起動してインスタンスをテストすることができます。
*Note*: シリアルノードに関するいくつかのエラーが発生する可能性があります。
これは予想されうるもので、無視することができます。

起動したら、`http://<your-instance-ip>:1880/`のエディタにアクセスできます。

インスタンスが再起動されるたびにNode-REDが自動的に起動するようにするには
pm2を利用できます。:

       sudo npm install -g --unsafe-perm pm2
       pm2 start `which node-red` -- -v
       pm2 save
       pm2 startup

*Note:* この最後のコマンドでさらにコマンドを実行するように促されるので、従って実行して下さい。
