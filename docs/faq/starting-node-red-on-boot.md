---
layout: docs-faq
toc: toc-user-guide.html
title: ブート時にNode-REDを起動する
slug: ブート時に起動
---

起動時にアプリケーションを実行、停止および監視する方法は数多くあります。
このガイドはこれを実行できるいくつかの方法を取り上げています。

### Raspberry Pi、Debian、Ubuntu

私たちが提供している[Raspberry Piインストールスクリプト](/docs/getting-started/raspberrypi)は
他のDebianのようなオペレーションシステムで利用することができます。

このスクリプトは[systemd](https://wiki.debian.org/systemd)サービスとしてNode-REDをインストールします。
さらなる情報は、
[Raspberry Piで実行する](/docs/getting-started/raspberrypi#起動時に自動起動する)というガイドを読んでください。

Raspbianを使用していない場合、
ローカルユーザのIDと環境に適したようにサービスファイルを編集する必要があるかもしれません。
編集方法の詳細は[こちら](/docs/faq/customising-systemd-on-pi)で入手することができます。

### RPMベースのLinux、RedHat、Fedora、CentOS

RPMベースのLinuxのためのインストールスクリプトを[こちらで入手できるように](https://github.com/node-red/linux-installers)提供しており、こちらもsystemdを設定します。

### その他Linux、OSX

以下のガイドは大多数のユーザにとって最もわかりやすいと考えているものを提示しています。
Windowsでは、PM2はサービスとして自動起動しません - 
以下の[NSSMを利用するという手段](#その他の手段)をお勧めします。

#### PM2を利用する

[PM2](https://github.com/Unitech/pm2)はNode.jsのプロセスマネージャです。
これは起動時にアプリケーションを実行することを簡単にし、必要であれば再起動することを保証します。

#### 1. PM2をインストールする

    sudo npm install -g pm2

<div class="doc-callout">
<em>Note</em> : Linux/OS X上でroot以外のユーザーとして実行している場合に<code>sudo</code>が必要です。
Windows上で実行している場合、
<code>sudo</code>コマンドなしで<a href="https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx">管理者としてコマンドシェルで実行</a>する必要があります。
</div>

<div class="doc-callout">
Windows上で実行している場合、
<a href="https://github.com/Unitech/PM2/blob/development/ADVANCED_README.md#windows">こちら</a>に記載されているように<code>tail.exe</code>がパス上に存在することを確認する必要があります。
</div>

#### 2. `node-red`コマンドの正しい位置を定義する。

Node-REDのグローバルインストールをおこなった場合、
Linux/OS Xにおいて`node-red`コマンドはおそらく以下のようになります: `/usr/bin/node-red`または`/usr/local/bin/node-red`。
コマンド`which node-red`は位置を確認するために利用できます。

ローカルインストールした場合、
`npm install`を実行した場所から相対的に`node_modules/node-red/bin/node-red`の位置になります。

#### 3. Node-REDを実行することをPM2に指示する

以下のコマンドはPM2にNode-REDを実行することを指示しており、
`/usr/bin/node-red`は`noode-red`コマンドの位置と考えてください。

引数`--`は必ずnode-redに渡したい他の引数よりも前に現れなければなりません。

    pm2 start /usr/bin/node-red -- -v

<div class="doc-callout">
<em>Note</em> : Raspberry PiやBeagleBone Blackのようなメモリ容量が制限されたデバイスで実行する場合、
追加引数を渡すべきです:

<pre>pm2 start /usr/bin/node-red --node-args="--max-old-space-size=128" -- -v</pre>
</div>

<div class="doc-callout">
<em>Note</em> : rootユーザとして実行したい場合、you must use the `--userDir`
Node-REDがデータを保管する場所を指定するために`--userDir`オプションを利用すべきです。
</div>

これによってNode-REDがバックグラウンドで起動します。
以下のコマンドを利用することでプロセスについての情報を確認し、ログ出力にアクセスすることができます。

    pm2 info node-red
    pm2 logs node-red

PM2によるプロセスを管理についてのさらなる情報は、[こちら](https://github.com/Unitech/pm2#process-management)で得ることができます。

#### 4. 起動時に実行することをPM2に指示する

PM2は実行されているプラットフォームに適したスタートアップスクリプトを作成し、
設定することができます。

これらのコマンドを実行し、表示される指示に従ってください:

    pm2 save
    pm2 startup

**systemd**を利用する新しいLinuxシステムでは以下のようにします

    pm2 startup systemd

<div class="doc-callout">
<em>一時的なNote:</em> GitHubのPM2では<a href="https://github.com/Unitech/PM2/issues/1321">オープンになっているissue</a>が存在し、
最近広められた課題を強調しています。
Linuxユーザは作成された`/etc/init.d/pm2-init.sh`ファイルを手動で編集し、以下の

<pre>export PM2_HOME="/root/.pm2"</pre>

を、以下のような正しいディレクトリを指すように置換する必要があります:

<pre>export PM2_HOME="/home/{youruser}/.pm2"</pre>
</div>

#### 5. 再起動

最後に、再起動して期待通りに全てが起動しているかを確認します。

### Windows

PM2はWindowsではサービスとして自動起動しません。
他の選択肢としてはNSMMを利用するという手段があります。NSSMの例は以下のコミュニティのリンクから確認できます。


### その他の手段

その他多くの手段があります。
以下のうちいくつかはコミュニティのメンバーによって作成されました。

 - [systemdスクリプト（Raspberry Piのプリインストールに利用されます）](https://raw.githubusercontent.com/node-red/linux-installers/master/resources/nodered.service) by @NodeRED (linux)
 - [systemdスクリプト](https://gist.github.com/Belphemur/3f6d3bf211b0e8a18d93) by Belphemur (linux)
 - [init.dスクリプト](https://gist.github.com/bigmonkeyboy/9962293)  by dceejay (linux)
 - [init.dスクリプト](https://gist.github.com/Belphemur/cf91100f81f2b37b3e94) by Belphemur (linux)
 - [Launchdスクリプト](https://gist.github.com/natcl/4688162920f368707613) by natcl (OS X)
 - [NSSMを利用してWindowsサービスとして実行する](https://gist.github.com/dceejay/576b4847f0a17dc066db) by dceejay
 - [Windows/OS Xサービスとして実行する](http://www.hardill.me.uk/wordpress/2014/05/30/running-node-red-as-a-windows-or-osx-service/)  by Ben Hardill
 - [rc.dスクリプト](https://gist.github.com/apearson/56a2cd137099dbeaf6683ef99aa43ce0) by apearson (freebsd)
