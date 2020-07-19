---
layout: docs-getting-started
toc: toc-user-guide.html
title: BeagleBone基板で実行する
slug: beaglebone
redirect_from:
  - /docs/hardware/beagleboneblack
---


### インストール

最新版のNode-RED 1.xを利用したい場合、アルファテスト版を利用する必要があります - 
<a href="https://beagleboard.org/latest-images" target="bbb">beagleboard.org</a>からDebian (10) Busterイメージを入手 - そしてｍ最新版に全てアップグレードします。

    sudo apt update && sudo apt full-upgrade

現在、Debian (10) BusterはSDカードイメージとしてのみ入手可能です。eMMCへイメージをフラッシュしたい場合、`/boot/uEnv.txt`ファイルを編集し、以下の行のコメントアウトを解除します。

    cmdline=init=/opt/scripts/tools/eMMC/init-eMMC-flasher-v3.sh

イメージはBeagleBoardウェブサイト上の他の「flasher」イメージと同様にeMMCへフラッシュすることができます。
この作業をおこなうため、BeagleBoneにSDカードを挿入して電源を切り、S2ボタンを押したまま電源を入れます。
LEDが点灯し始めたら、ボタンを離します。フラッシュには5から25分かかるはずです。
BeagleBoneはこの過程の最後に電源が落ち、SDカードを外すことができ、BeagleBoneはeMMCから起動します、

4GBイメージのBeagleBone基板はNode-REDがプリインストールされていて自動起動が設定されているため、
BeagleBoneを起動してブラウザでポート番号1880を指定することができます。

古いeMMCバージョンのBBBへのフラッシュに適した2GBコンソールバージョンは推奨されませんが、
以下の手動インストール手順にしたがってインストールすることができます。

### 実行

Node-REDのログを確認するには

    sudo journalctl -f -u node-red -o cat

Node-REDを停止するには

    sudo service node-red stop

Node-REDを起動するには

    sudo service node-red start

起動のたびにNode-REDを自動起動するように設定するには

    sudo systemctl enable node-red.service

同様に起動時の自動起動を停止するには

    sudo systemctl disable node-red.service


### アップグレード

最新のDebianイメージはNode-REDおよびNode.jsが既にインストールされています。 - 最も簡単なアップグレード方法はビルトインアップグレードツールを利用することです。:

    sudo apt update
    sudo apt upgrade nodejs bb-node-red-installer

また、Node-REDサービスを再起動する必要があり、開いているブラウザセッションをリフレッシュする必要があるでしょう。

2017 Debian 9.2版を利用している場合、まず`sudo apt full-upgrade`を実行する必要があるでしょう。

**Note**: Raspberry Pi / Debianアップグレードスクリプト（`update-nodejs-and-nodered`）を使わないでください。
異なる場所にNode.jsおよびNode-REDの両方を再インストールし、
競合が発生して既存のsystemd設定ファイルを破壊してしまうためです。

### 設定

デフォルトではBeagleboneはrootとしてNode-REDを起動するように設定されています。
そして設定ファイルは`/root/.node-red`ディレクトリに位置し、これらを編集するにはroot権限（sudo）が必要です。
例えば`settings.js`ファイルを編集するには、ここで設定をおこないます。

また、Beagleboneはsystemdサービス、`/lib/systemd/system/node-red.socket`を持っており、接続しようとしたときに自動的にNode-REDを起動します。
デフォルトではこれはポート番号1880です。 - しかし、これを変更する必要がある場合、
`settings.js`を同様に変更する必要があります。

### Beaglebone固有のノード

最も簡潔な方法でI/Oピンに直接アクセスできるようにするBeaglebone固有のノードがいくつかあります。
それらをインストールする最も簡単な方法はnpmから直接おこなうことです。

以下のコマンドを手動で実行してインストールします。:

    sudo npm install -g --unsafe-perm beaglebone-io johnny-five node-red-contrib-gpio

*Note*: BBB固有ノードセットも利用できます。
しかし、これらは既にサポートされていないライブラリ（octalbonescript）であり、将来的に利用することは推奨できませんが、
一般的なGPIOノード以上の追加機能を持っているために注目に値します。

    sudo npm install -g --unsafe-perm node-red-node-beaglebone
