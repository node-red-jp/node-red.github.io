---
layout: blog
title: バージョン1.3がリリースされました
author: nick
---

Node-RED 1.3が[インストール](https://npmjs.org/package/node-red)できるようになりました。もし、アップデートをしたい場合は、[アップグレード手順](http://nodered.jp/docs/getting-started/upgrading.html)を参照してください。

[Change Log](https://github.com/node-red/node-red/blob/28bfa8e4186e63c60894d8f34a1ff9a5838fa917/CHANGELOG.md)には、本リリースの全ての変更内容が掲載されています。ここでは、概要を紹介します。

**このリリースは、Node.js 8と10で実行できる最後のリリースであることにご注意ください。**

これらのバージョンのNode.jsはEnd-of-lifeになるため、来月にリリースするNode-RED 2.0では、これらをサポート外とする予定です。

---

*リリースに関する動画は近々公開します - 見逃さないよう、[チャンネル登録をしてください。](https://www.youtube.com/channel/UCQaB8NXBEPod7Ab8PPCLLAA)

---
- [注目機能](#headline-features)
  - [Functionノードにおけるnpmモジュールの利用](#function-node-use-of-npm-modules)
  - [Change/Switchノードでのmsgプロパティの参照](#referencing-msg-properties-in-change-switch-nodes)
  - [Node-REDプラグインフレームワーク](#node-red-plugins-framework)
    - [リソースの追加](#adding-extra-resources)
  - [npmパッケージ化されたサブフロー](#npm-packaged-subflows)
- [エディタの機能](#editor-features)
  - [書き出しのプレビュー](#export-preview)
  - [ノードの選択](#selecting-nodes)
  - [サブフローの開き方](#opening-a-subflow)
  - [ワークスペースのナビゲート](#navigating-around-the-workspace)
  - [キーボードショートカット](#keyboard-shortcuts)
  - [その他のエディタの更新](#other-editor-updates)
- [ランタイムの機能](#runtime-features)
  - [新しい`externalModules`設定](#new-externalmodules-setting)
  - [その他のランタイムの更新](#other-runtime-updates)
- [ノードの機能](#node-features)

<a name="headline-features"></a>
## 注目機能
<a name="function-node-use-of-npm-modules"></a>
### Functionノードにおけるnpmモジュールの利用

Functionノードにおいて、外部のnpmモジュールをより簡単に利用できるようになりました。

settingsファイルで `functionExternalModules` を `true` に変更することで、functionノードにおいて、利用したい追加モジュールを設定できるようになります。フローをデプロイした際に、ランタイムは自動的にこれらのモジュールのインストールを試みるようになります。

functionノードでモジュールを使用する前に、グローバルコンテキストからモジュールを取得する必要がある `functionGlobalContext` のアプローチとは異なり、本新機能では読み込むモジュールはコードに定義され、自動的に取得されます。

編集ダイアログには新たに `設定` タブが追加され、ノードの出力数やノードで用いるモジュールを設定できるようになっています(もし `functionExternalModules` の設定を有効にしていない場合は、出力数のフィールドのみが表示されます)。

他のタブにおいては、各タブ内のコードがいつ実行されるか分かりやすくなるように、名前が付け替えられています。

![](/blog/content/images/2021/04/function-modules.png)


[詳細](https://github.com/node-red/node-red/pull/2873)

<a name="referencing-msg-properties-in-change-switch-nodes"></a>
### Change/Switchノードでのmsgプロパティの参照

ChangeノードとSwitchノードにおいて、メッセージのプロパティのネストした参照ができるようになりました。

例えば、複数のセンサーから温度を取得する場合です。
各メッセージは、センサーが設置された部屋が設定された `msg.topic` と、値である `msg.payload` を持っています。
例えば `flow.rooms.kitchen` や `flow.rooms.garage` のような `flow.rooms` のコンテキストに、各部屋の現在の温度を保存したいとします。

これを以前のバージョンのNode-REDのChangeノードで行うには、JSONataを使用する必要がありました。例えば:

 - `flow.rooms` に、式 `$merge([$flowContext('rooms'),{$.topic:$.payload}])` を代入

多くの場合、ユーザはfunctionノードでの実装に陥りますが、これは避けた方が良いでしょう。

1.3では、次のようにChangeノードで設定できるようになりました:

 - `flow.rooms[msg.topic]` に `msg.payload` の値を代入

実際には `RED.util.getMessageProperty(...)` ユーティリティを用いる全てのノードが、この機能を持っています。

[詳細](https://github.com/node-red/node-red/pull/2822)

<a name="node-red-plugins-framework"></a>
### Node-REDプラグインフレームワーク

Node-REDのカスタマイズや新機能追加を容易にするため、プラグインフレームワークを新たに導入しました。この機能は初期段階ですが、将来的には、沢山の新しいもの追加するための基礎となります。追加機能を本体のコードではなくプラグインとして提供することで、本体を小さく保ち、Node-REDを組み込んだアプリケーションが、より簡単に「追加」機能を選択できるようになります。

[詳細](https://github.com/node-red/node-red/pull/2779)

この新しいフレームワークを用いた、2つの種類のプラグインが今日利用できます:

 - **エディタテーマ** プラグイン　新しいテーマのインストールや、settingsファイルでの有効化を簡単にします。 [詳細](https://github.com/node-red/node-red/pull/2836).

    コントリビューションされたテーマの良いコレクションが [ここ](https://github.com/node-red-contrib-themes/)にあります。これらテーマは更新されるため、プラグインのバージョンに注意してください。

 - **ライブラリソース** プラグイン　エディタ内の読み込み/書き出しダイアログに表示される追加ライブラリを構成できます。最初の例として、ローカルファイルシステムプラグイン ([@node-red/library-file-store](https://www.npmjs.com/package/@node-red/library-file-store)) を公開しています。 [詳細](https://github.com/node-red/node-red/pull/2785)

<a name="adding-extra-resources"></a>
#### リソースの追加

プラグインとノードには、エディタに追加のリソースを読み込めるようにするという共通の要件があります。
これは、ヘルプのテキストに画像やJavaScriptライブラリを追加するものです。

以前は、ノードでリソースを読み込めるようにするために、沢山の追加作業が必要でした。

プラグインフレームワークでは、これを簡単に実現できます。ノードにおいても同様に適用できるようになっています。

現在、モジュールが一番上の階層に `resources` というフォルダを持つ場合は、ランタイムは自動的にその中のコンテンツをAdmin HTTP APIを介して読み込めるようになっています。

エディタでコンテンツをロードすることは必要ですが、ノード/プラグインはランタイムにおいてコンテンツを提供するルートを作成する必要はありません。

ノードの開発に関するドキュメントは、[さらに詳細が追加され更新されています](https://nodered.jp/docs/creating-nodes/resources)。

<a name="npm-packaged-subflows"></a>
### npmパッケージ化されたサブフロー

現在、サブフローをモジュールとしてパッケージ化してnpmに公開し、他のノードと同じようにパレットにインストールできるようになっています。

この一環として、サブフローのプロパティ編集ダイアログは、新しい 'モジュールプロパティ' タブを持っています。ここに、npmモジュールを生成する際に使われるサブフローに関する任意のメタデータを設定することができます。

モジュールを生成する手順は、現在は完全に手作業です。手順の詳細は、[ノードの開発ガイドのセクション](https://nodered.jp/docs/creating-nodes/subflow-modules)に追加されています。

[詳細](https://github.com/node-red/node-red/pull/2690)

<a name="editor-features"></a>
## エディタの機能
<a name="export-preview"></a>
### 書き出しのプレビュー

書き出しダイアログは、現在書き出そうとしているものを表示する構造化された一覧を表示します。素のJSONは、タブ内の2つ目に引き続き表示されます。これは、ユーザが何を書き出そうとしているか理解するために役立ちます。

![](/blog/content/images/2021/04/export-preview.png)

<a name="selecting-nodes"></a>
### ノードの選択

シフトキーを押しながらノードをクリックすると、フロー内の全てのノードが自動的に選択される機能は以前から実現されています。

このリリースでは、シフトキーを押しながらノードの右側をクリックすると、フローの前側の全てのノードが選択されます。
一方、シフトキーを押しながらノードの右側をクリックすると、フローの後ろ側の全てのノードが選択されます。
シフトキーを押しながらノードの中心をクリックした場合は、以前と同様にフロー全体を選択します。

これらに対応するデフォルトのキーボードショートカットが追加されています:

 - `core:select-connected-nodes` - `alt-s c` - 現在選択されているノードに接続されている全てのノードを選択
 - `core:select-upstream-nodes`- `alt-s u` - 現在選択されているノードの入力から到達可能な全てのノードを選択
 - `core:select-downstream-nodes` - `alt-s d` - 現在選択されているノードの全ての出力から到達できる全てのノードを選択

[詳細](https://github.com/node-red/node-red/pull/2877)

<a name="opening-a-subflow"></a>
### サブフローの開き方

以前は、サブフローを開くために、最初にワークスペース上のインスタンスをダブルクリックする必要がありました。その後、編集ダイアログにある「サブフローを編集」ボタンをクリックしていました。

このリリースでは、ノードをダブルクリックする時に、Ctrlキー(MacではCmdキー)を押していると、直接サブフローのテンプレートタブに移動できます。同じように、サブフローのインスタンスが選択された状態で、Ctrlキー(Cmdキー)を押しながらエンターキーを押すと、同様の動作となります。

<a name="navigating-around-the-workspace"></a>
### ワークスペースのナビゲート

ワークスペース内を移動するのを助けるキーボードショートカットがいくつか追加されています。

 - ワークスペースで選択されているノードを矢印キーで切り替え。
 - `Ctrl/Cmd-[` や `Ctrl/Cmd-]` を用いてタブ間を切り替え。
 - `Ctrl-Enter` を用いてサブフローのテンプレートタブへ移動、`Ctrl/Cmd-Shift-左矢印キー` を用いて最後に開いていたタブへ移動。元のタブに戻った場合は、`Ctrl/Cmd-Shift-右矢印キー` を用いて、タブの履歴上で前に戻ることもできます。

<a name="keyboard-shortcuts"></a>
### キーボードショートカット

settingsファイルの `editorTheme` オプションを介して、カスタムのキーボードショートカットを設定できるようになりました。
これによって、複数のインスタンス間でカスタマイズをより簡単に反映できるようになりました。 [詳細](https://github.com/node-red/node-red/pull/2843)

<a name="other-editor-updates"></a>
### その他のエディタの更新

 - エディタをリロードした時に、常に直近使ったタブを表示するようになりました。
 - サブフローを削除する時に、使用中のインスタンスがある場合、確認ダイアログを表示します。
 - 情報サイドバーにあるアウトラインビューに、各サブフローが使用されているインスタンスの数を表示するようになりました。この数値をクリックすると、それらを一覧表示する検索ダイアログが表示されます。
 - アウトラインビューでクリックするのみで、グループ内のコンテンツに対して、状態の有効/無効の切り替えができます。
 
<a name="runtime-features"></a>
## ランタイムの機能
<a name="new-externalmodules-setting"></a>
### 新しい`externalModules`設定

Node-REDにインストールできるものを管理するための新しい設定、`externalModules` を利用できるようになりました。

この設定は、2つの別々のものをカバーしています。1つ目は、パレットマネージャを介してインストールできる新しいノードです。2つ目は、functionノードによって読み込むことのできるモジュールです。

この設定で、ランタイムによって読み込むことのできるモジュールを決定するために使われる `allow` と `deny` リストを提供できます。これらは、パレットマネージャーに表示されるノードの一覧を絞り込むために、エディタにおいても利用されます。

この新しい設定は、現在非推奨となっているいくつかの既存設定を置き換えるものです。

 - `editorTheme.palette.editable` は `externalModules.palette.allowInstall`　に置き換え
 - `autoInstallModules` は、 `externalModules.palette.allowInstall = true` と `externalModules.autoInstall = true` に置き換え
 - `autoInstallModulesRetry` は `externalModules.autoInstallRetry` に置き換え
 - `editorTheme.palette.upload` は `externalModules.palette.allowUpload` に置き換え


[詳細](https://github.com/node-red/node-red/pull/2797)

<a name="other-runtime-updates"></a>
### その他のランタイムの更新

 - settingsファイルの `lang` オプションを介して、ランタイムが使用する言語を明示的に設定できるようになりました。 [詳細](https://github.com/node-red/node-red/pull/2796)
 - フローが停止される時に、設定ノードは最後に停止されるようになりました。これによってフローのノードは停止される時に、設定ノードに頼る処理を行えます。 [詳細](https://github.com/node-red/node-red/pull/2880)
 - settingsファイルの `editorTheme.projects.workflow` オプションを介して、簡素化されたgitワークフローをデフォルトに設定できます。 [詳細](https://github.com/node-red/node-red/pull/2763)
 - `httpAdminMiddleware` と `httpNodeMiddleware` は、1つの関数のみしか使えませんでしたが、現在は配列として複数のミドルウエアを設定できるようになりました。 [詳細](https://github.com/node-red/node-red/pull/2788)

<a name="node-features"></a>
## ノードの機能

 - MQTTノードはMQTTv5をサポートし、v5で提供されている新機能の大部分を使えるようになりました。
 - Batch、Delay、Split、Join、Triggerなど、多くのコアノードがCompleteノードへトリガできるよう更新が入りました。
 - Execノードは、コマンド引数に `msg.payload` をデフォルトで追加しなくなりました。これは、ユーザによってよく除かれているためです。これは *新しく追加された* ノードにおいてのみ適用され、既存のノードについては影響を受けません。また、`msg.payload` だけではなく、任意のメッセージプロパティを追加できるようExecノードが更新されました。
 - InjectやChangeノードは、編集ダイアログを閉じた時に、設定のエラーをハイライト表示するようになりました。
 - Functionノードでは、設定されたポートの出力数をコードから参照できるように `node.outputCount` が利用できるようになりました。
 