---
layout: docs-getting-started
toc: toc-user-guide.html
title: Windowsで実行する
slug: windows
redirect_from:
  - /docs/platforms/windows
---

このページでは、Microsoft Windows環境におけるNode-REDのセットアップについて具体的な手順を紹介しています。この手順はWindows 10固有ですが、Windows 7およびWindows Server 2008R2以降でも利用できるはずです。Windows 7またはWindows Server 2008R2以前のバージョンは現在サポートされていないため、推奨できません。

<div class="doc-callout">
<em>Note</em> : 以下の説明の中では、「コマンドプロンプト」についての説明があります。コマンドプロンプトと書かれている場合、Windows cmdまたはPowerShellターミナルシェルを指します。<a href="https://support.microsoft.com/en-us/help/4027690/windows-powershell-is-replacing-command-prompt">PowerShell</a>を使うことで、Windowsのすべての新しいバージョンでLinux/Macに似たコマンドやフォルダ名を利用できるため、PowerShellの利用を推奨します。
</div>

### クイックスタート

#### 1. Node.jsのインストール

Node.jsの最新版10.x LTSを[Node.js公式ホームページ](https://nodejs.org/ja/)からダウンロードします。このサイトはあなたのシステムに最適なバージョンを提供します。

ダウンロードしたMSIファイルを実行します。Node.jsのインストールにはローカル管理者権限が必要です。
つまり、ローカル管理者ではない場合、インストール時に管理者パスワードの入力を求められます。デフォルト設定でインストールをおこなってください。
インストールが完了したら、開いているコマンドプロンプトを一旦閉じ、再度開いて新しい環境変数が登録されていることを確認してください。

インストール後、Node.jsとnpmが正しくインストールされていることを確認するため、コマンドプロンプトを開き、以下のコマンドを実行してください。

PowerShellを利用する場合: `node --version; npm --version`

cmdを利用する場合: `node --version && npm --version`

以下のような出力が戻ってくるはずです。:

    v10.16.3
    6.11.3

#### 2. Node-REDのインストール

グローバルモジュールとしてNode-REDをインストールすると、システムパスに`node-red`コマンドが追加されます。コマンドプロンプトで以下のコマンドを実行します。:

    npm install -g --unsafe-perm node-red

#### 3. Node-REDの実行

インストールが完了すれば、[Node-REDを実行する](#Windowsで実行する)準備が整いました。

***

### Windowsでの別のインストール方法

このセクションでは、Node.js、npmおよびWindows環境でのNode-REDのためのNodeのインストールに必要なWindowsビルドツールの、他のインストール方法についての情報を提供します。

<div class="doc-callout">
<em>Note</em> : 具体的な指示がない限り、管理者として(別名「権限昇格」)コマンドプロンプトを利用<em>しない</em>でください。Node-REDおよびNode.jsについて学習する際にはコマンドプロンプトに非常に精通している必要があり、<a href="https://docs.microsoft.com/en-us/powershell/scripting/getting-started/fundamental/using-windows-powershell">MicrosoftによるPowerShellの記事</a>のいくつかを読むことは価値があります。<a href="http://powershelltutorial.net/">PowerShellチュートリアル</a>および<a href="https://www.red-gate.com/simple-talk/sysadmin/powershell/powershell-one-liners-help,-syntax,-display-and--files/">PowerShellワンライナー</a>といったサイトも役立つかもしれません。
</div>

WindowsのNode.jsの一般的なインストールにはローカル管理者権限が必要です。[Node.js公式ホームページ](https://nodejs.org/ja/)から適切なバージョンをダウンロードします。このサイトは適切なバージョンを提供してくれます。64ビット版Windowsでは32ビット版または64ビット版を利用できますが、64ビット版を利用することを推奨します。いくつかの理由で別のバージョンをインストールが必要になる場合、[ダウンロードページ](https://nodejs.org/ja/download/)を使うことができます。

MSIインストーラによってNode.jsをインストールするには2つの方法があります。

1. Chocolateyパッケージマネージャを利用する

   [Chocolatey](https://chocolatey.org/)は、LinuxのAPTまたはyum、もしくはMacでのbrewに似たWindowsのパッケージマネージャです。すでにChocolateyが使える場合、このツールをNode.jsのインストールに利用することができます（例えば、`nodejs-lts`パッケージを利用します）。ただし、多くのパッケージの管理が不確実であり、これらのパッケージは上述とは異なるフォルダ位置が利用されるかもしれません。

2. Node.jsバージョンマネージャを利用する

   [nvm-windows](https://github.com/coreybutler/nvm-windows)のようなNode.jsバージョンマネージャを利用することで、Node.js開発や異なるバージョンに対するテストが必要な場合に非常に便利です。利用するNode.jsのバージョンを切り替えたとき、グローバルパッケージを再インストールする必要があり、ローカルパッケージの再インストールが必要かもしれないことを覚えておいてください。

<div class="doc-callout">
<em>Note</em> : MicrosoftはV8の代わりにMicrosoft Chakra Core JavaScriptエンジンを利用したNode.jsのパラレルバージョンを保守しています。テストを実施していないため、これはNode-REDの利用環境に推奨できません。
</div>

#### Windowsでのnpm

Node.jsをインストールした場合、npmパッケージマネージャもインストールされます。Node.jsのリリースに含まれているnpmよりも新しいリリースのnpmをインストールすることを推奨する指示をウェブ上で見かけることがあります。後々、互換性のないバージョンになりやすいことから、これは推奨**できません**。Node.jsのリリースは非常に規則正しく、これはnpmのアップデートに追従するには充分です。

#### ユーザ間のNode-REDの共有

Node.jsは、予想どおりの`Program Files`フォルダにインストールされます。しかし、`npm -g`を利用してNode-REDのようにグローバル_パッケージ_をインストールした場合、**現在**のユーザにとっての`$env:APPDATA\npm`フォルダ（cmdを利用した`%APPDATA%\npm`）にインストールされます。複数ユーザがログインするPCまたはサーバにインストールし、Node-REDのようなNode.jsアプリケーションを実行するユーザのログインではなく管理者ログインを使用してインストールする場合、これはあまり役に立ちません。

<div class="doc-callout">
<em>Note</em> : <code>%APPDATA%</code>のようなフォルダ名が何に変更されたのかを確認するには、Windowsファイルエクスプローラのアドレスバーに入力するだけでわかります。PowerShellでは<code>cd $Env:APPDATA</code>（cmdでは<code>cd %APPDATA%</code>）というコマンドを入力します。
</div>

これを修正するためには、他のユーザにフォルダに関する権限を与え、ユーザ環境変数`path`にそのフォルダが含まれていることを確認します。

また、グローバルファイルを他のユーザからアクセスできる場所に変更します。これらの変更をおこなったNode-REDを実行するであろうユーザを利用して確認してください。例えば、`$env:ALLUSERSPROFILE\npmglobal`の位置を変更するためには、PowerShellで以下のようにします。:

    mkdir $env:ALLUSERSPROFILE\npmglobal
    npm config set prefix $env:ALLUSERSPROFILE\npmglobal

そしてnpmキャッシュフォルダも変更したいはずです。:

    mkdir $env:ALLUSERSPROFILE\npmglobal-cache
    npm config set cache $env:ALLUSERSPROFILE\npmglobal-cache --global

以上の変更を使用する場合、システム環境変数 _PATH_ に新しい _プレフィックス_ フォルダを追加することができ、ユーザ環境変数Pathから古いフォルダを削除することができます。環境変数PATHを変更するため、スタートメニューまたはCortanaに`環境`を入力し、 _環境変数を編集_ を選択します。

Node-REDを実行する各ユーザのため、他のユーザで上記の設定が正しいことを確認します。

#### WindowsビルドツールでNode.jsをインストールする

Node-REDまたはインストールされたノードで利用されるNode.jsモジュールの多くは、Windowsで動作する前にコンパイルが必要なバイナリコンポーネントを持っています。Windowsでnpmがバイナリコンポーネントをコンパイルできるようにするため、[管理者としてコマンドプロンプトを利用](https://technet.microsoft.com/en-gb/library/cc947813%28v=ws.10%29.aspx)を参考にしてWindowsビルドツールモジュールをインストールします。

    npm install --global --production windows-build-tools

組込みPython v2.7を利用するためにインストールしたい場合、次のコマンドを利用します。:

    npm install --global --production --add-python-to-path windows-build-tools

<div class="doc-callout">
<em>Notes</em>:
<ul>
<li>Windows環境下ではNode.jsモジュールのすべてが動作するわけではなく、インストール時の出力でエラーについて慎重に確認してください。</li>
<li>インストール中、<code>node-gyp</code>コマンドによっていくつかのエラーが報告されることがあります。
これらは典型的な<em>致命的ではない</em>エラーであり、オプションの依存関係が自身をビルドするために必要なコンパイラに関連しています。
<b>Node-REDはこれらのオプションの依存関係がなくても動作します</b>。
致命的なエラーが発生した場合、まずインストールした<code>windows-build-tools</code>モジュールを確認し、コマンドプロンプトのウィンドウを一旦閉じてから再び開いてください。</li>
</ul>
</div>

### Windowsで実行する

インストール後、Node-REDを実行する簡単な方法はコマンドプロンプトで`node-red`コマンドを利用することです。:
npmのグローバルパッケージとしてNode-REDをインストールした場合、node-redコマンドを利用することができます。:

    C:>node-red

この操作ではターミナルにNode-REDログが出力されます。Node-REDの実行状態を維持するため、ターミナルは開いたままにしなければなりません。

Node-REDを実行すると`%HOMEPATH%`フォルダ内に`.node-red`という新しいフォルダが作成されることに注意してください。これが`userDir`フォルダであり、現在のユーザのNode-RED設定のホームフォルダと考えてください。このフォルダはドキュメントでは`~/.node-red`としてしばしば参照されます。`~`はUnixのようなシステムでのユーザホームフォルダの省略形です。推奨にあるとおりコマンドラインとしてPowerShellを利用している場合、同じような参照を利用できます。古い`cmd`シェルを利用している場合、これは動作しません。

これで[はじめてのフロー](/docs/tutorials/first-flow)を作成することができます。

#### PM2を利用する

Node-REDのフローまたはノードを開発するためにWindowsを利用する場合、[PM2](http://pm2.keymetrics.io/)を利用してNode-REDを起動することは非常に役立ちます。これはファイルが変更されたときに自動的に再起動するように設定することができ、Node-REDの起動とログ出力の管理を常におこなうことができます。

#### 起動時にNode-REDを実行する

Node-REDのプロダクションプラットフォームとしてWindowsを利用したい場合、Windowsタスクスケジュールのジョブを設定しておくとよいでしょう。それには以下のようにします。:

1. スタートメニューで、「タスクスケジューラ」を入力し、一致する検索結果をクリックします。
1. 右側のメニューで「タスクの作成...」をクリックします。手順にしたがって新しいタスクを作成します。

セットアップをおこなったユーザでログインをおこない、Node-REDが起動時実行されていることを確認します。システム起動時にNode-REDを常に実行させるため、トリガーに「スタートアップ時」を利用することができます。操作には、`C:\Users\<user>\AppData\Roaming\npm\node-red.cmd`（`<user>`は自身のユーザ名に置換します）を詳細として設定した「プログラムの開始」を利用します。

ネットワークが利用可能な場合のみ起動するようにしたいこともあるでしょう。また、ジョブが失敗した場合、再実行したいこともあるでしょう。おそらく1分ごとに再起動しますが、それも3回までです。それまでに起動しない場合、エラーは致命的であり、何らかの操作が必要でしょう。イベントログを見ることで失敗について確認することができます。この方法での実行時にログにアクセスしたい場合、srdおよびファイル（更新時に上書きされないように別のスタートアップファイルを作成することを推奨します）に出力されるエラーへのリダイレクトのため、node-red.cmdを修正しなくはなりません。
