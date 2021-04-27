---
layout: docs-getting-started
title: Androidで実行する
toc: toc-user-guide.html
slug: android
redirect_from:
  - /docs/platforms/android
---

アプリストアの[Termux](https://termux.com)アプリを利用することで、簡単にAndoroidデバイス上でNode-REDを実行することができます。
このアプリは[Playストア](https://play.google.com/store/apps/details?id=com.termux&amp;hl=en_GB)から入手できます。

<div class="doc-callout"><em>Note</em> : Node-REDチームはTermuxアプリケーションおよびその開発に何の関わりも持っていません。
現時点では動作していると言う以外に
サポートを提供することはできません。</div>

### インストール

アプリをインストールし、起動します。そしてプロンプトに以下のように入力します。

    apt update
    apt upgrade
    apt install coreutils nano nodejs
    npm i -g --unsafe-perm node-red
    node-red

そしてブラウザで`http://localhost:1880`を指定します。

### 注意

 - 一般的な方法によって、`node-red-dashboard`のようなNode-REDの他のノードをnpm installすることもできます。:

       cd ~/.node-red
       npm i node-red-dashboard

 - `volume-down`キーはctrlキーです。 - そのため、`vol-down-c`によって実行中のアプリを「終了」することができます。
 - 上述の手順で`nano`エディタもインストールされ、これはファイルの編集に役立ちます。

### 自動起動

Termux内でアプリを起動する推奨の方法は、[Termux:Bootアプリ](https://github.com/termux/termux-boot)を使用することです。
([F-droid](https://f-droid.org/en/packages/com.termux.boot/) または [Play Store](https://play.google.com/store/apps/details?id=com.termux.boot) にあります)

起動時のTermux自動起動に役立つアプリがあります。 - <a href="https://play.google.com/store/apps/details?id=com.autostart&amp;hl=en_GB">Autostart - No Root</a>

### デバイスアクセス

追加のTermuxデバイスプラグインを利用することで様々なハードウェアに直接アクセスすることもできます。
- 勿論、これは`exec`コマンドを利用して
`Node-RED`を介してアクセスすることもできます。

**Note**: TermuxにアドオンアプリとアドオンAPIの両方をインストールする必要があります。

Playストアからアドオンアプリ - <a href="https://play.google.com/store/apps/details?id=com.termux.api&amp;hl=en">Termux:API</a>をインストールします。

Termuxにアドオンアクセスをインストールします。

    apt install termux-api

### 有益なリンク

 - [Termux APIの使い方](https://wiki.termux.com/wiki/Termux:API)
