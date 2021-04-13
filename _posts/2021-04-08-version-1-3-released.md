---
layout: blog
title: バージョン1.3がリリースされました
author: nick
---

Node-RED 1.3が[インストール](https://npmjs.org/package/node-red)できるようになりました。もし、アップデートをしたい場合は、[アップグレード手順](http://nodered.jp/docs/getting-started/upgrading.html)を参照してください。

[Change Log](https://github.com/node-red/node-red/blob/28bfa8e4186e63c60894d8f34a1ff9a5838fa917/CHANGELOG.md)には、本リリースの全ての変更内容が掲載されています。ここでは、概要を紹介します。


**このリリースは、Node 8や10で実行できる最後のリリースであることにご注意ください**

これらのバージョンのNodeはEnd-of-lifeになるため、これらをサポート外とするNode-RED 2.0を来月にリリースする予定です。

---

*リリースに関する動画は近々公開します - 見逃さないよう、[チャンネル登録をしてください。](https://www.youtube.com/channel/UCQaB8NXBEPod7Ab8PPCLLAA)

---
- [注目機能](#headline-features)
  - [Functionノードにおけるnpmモジュールの利用](#function-node-use-of-npm-modules)
  - [Referencing msg properties in Change/Switch nodes](#referencing-msg-properties-in-change-switch-nodes)
  - [Node-REDプラグインフレームワーク](#node-red-plugins-framework)
    - [Adding extra resources](#adding-extra-resources)
  - [npm packaged subflows](#npm-packaged-subflows)
- [エディタの機能](#editor-features)
  - [Export preview](#export-preview)
  - [Selecting nodes](#selecting-nodes)
  - [Opening a subflow](#opening-a-subflow)
  - [Navigating around the workspace](#navigating-around-the-workspace)
  - [Keyboard shortcuts](#keyboard-shortcuts)
  - [Other Editor updates](#other-editor-updates)
- [Runtime Features](#runtime-features)
  - [New `externalModules` setting](#new-externalmodules-setting)
  - [Other Runtime updates](#other-runtime-updates)
- [Node Features](#node-features)



## 注目機能

### Functionノードにおけるnpmモジュールの利用

Functionノードにおいて、外部のnpmモジュールをより簡単に利用できるようになりました。

settingsファイルで `functionExternalModules` を `true` に変更することで、functionノードにおいて、利用したい追加モジュールをリストとして設定できるようになります。フローをデプロイした際に、ランタイムは自動的にこれらのモジュールのインストールを試みるようになります。

functionノードでモジュールを使用する前に、グローバルコンテキストからモジュールを取得する必要がある `functionGlobalContext` のアプローチとは異なり、本新機能では読み込むモジュールはコードに定義し、自動的に取得されます。

エディタダイアログには新たに `設定` タブが追加され、ノードの出力数やノードで用いるモジュールのリストを設定できるようになっています(もし `functionExternalModules` の設定を有効にしていない場合は、出力数のフィールドのみが表示されます)。

他のタブにおいては、各タブ内のコードがいつ実行されるか分かりやすくなるように、名前が付け替えられています。

![](/blog/content/images/2021/04/function-modules.png)


[詳細](https://github.com/node-red/node-red/pull/2873)


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


### Node-REDプラグインフレームワーク

Node-REDのカスタマイズや新機能追加を容易にするため、プラグインフレームワークを新たに導入しました。この機能は初期段階ですが、将来的には、沢山の新しいものをへ追加するための基礎をとなります。追加機能を本体のコードではなくプラグインとして提供することで、本体を小さく保ち、Node-REDを組み込んだアプリケーションが、より簡単に「追加」機能を選択できるようになります。

[詳細](https://github.com/node-red/node-red/pull/2779)

この新しいフレームワークを用いた、2つの種類のプラグインが今日利用できます:

 - **エディタテーマ** プラグイン　新しいテーマのインストールや、settingsファイルでの有効化を簡単にします。 [詳細](https://github.com/node-red/node-red/pull/2836).

    コントリビューションテーマの良いコレクションが [ここ](https://github.com/node-red-contrib-themes/)にあります。これらテーマは更新されており、プラグインのバージョンに注意してください。

 - **ライブラリソース** プラグイン　エディタ内の読み込み/書き出しダイアログに表示される追加ライブラリを構成できます。最初の例として、ローカルファイルシステムプラグイン ([@node-red/library-file-store](https://www.npmjs.com/package/@node-red/library-file-store)) を公開しています。 [詳細](https://github.com/node-red/node-red/pull/2785)

#### リソースを追加

プラグインとノードには、エディタに追加のリソースを読み込めるようにするという共通の要件があります。
これは、ヘルプのテキストに画像やJavaScriptライブラリを追加するものです。

以前は、ノードでリソースを読み込めるようにするために、沢山の追加作業が必要でした。

プラグインフレームワークでは、これを簡単に実現できます。ノードにおいても同様に適用できるようになっています。

現在、モジュールが一番上の階層に `resources` というフォルダを持つ場合は、ランタイムは自動的にその中のコンテンツをAdmin HTTP APIを介して読み込めるようにします。

ノード/プラグインは、エディタでコンテンツをロードすることは必要ですが、ランタイムにおいてコンテンツを提供するルートを作成する必要はありません。

ノードの開発に関するドキュメントは、[さらに詳細を追加して更新されています](https://nodered.jp/docs/creating-nodes/resources)。


### npmパッケージ化されたサブフロー

現在、サブフローをモジュールとしてパッケージ化してnpmに公開し、他のノードと同じようにパレットにインストールできるようになっています。

この一環として、サブフローのプロパティ編集ダイアログは、新しい 'モジュールプロパティ' タブを持っています。ここに、npmモジュールを生成する際に使われるサブフローに関する任意のメタデータを設定することができます。

モジュールを生成する手順は、現在は完全に手作業です。手順の詳細は、[ノードの開発ガイドのセクション](https://nodered.org/docs/creating-nodes/subflow-modules)に追加されています。

[詳細](https://github.com/node-red/node-red/pull/2690)


## エディタの機能

### 書き出しプレビュー

書き出しダイアログは、現在書き出そうとしているものを表示する構造化された一覧を表示します。素のJSONは、タブ内の2つ目に引き続き表示されます。これは、ユーザが何を書き出そうとしているか理解するために役立ちます。

![](/blog/content/images/2021/04/export-preview.png)

### ノードの選択

シフトキーを押しながらノードをクリックすると、フロー内の全てのノードが自動的に選択される機能は以前から実現されています。

このリリースでは、シフトキーを押しながらノードの右側をクリックすると、フローの前側の全てのノードが選択されます。
もし、シフトキーを押しながらノードの右側をクリックすると、フローの後ろ側の全てのノードが選択されます。
シフトキーを押しながらノードの中心をクリックした場合は、以前と同様にフロー全体を選択します。

これらに対応するデフォルトのキーボードショートカットが追加されています:

 - `core:select-connected-nodes` - `alt-s c` - 現在選択されているノードに接続されている全てのノードを選択
 - `core:select-upstream-nodes`- `alt-s u` - 現在選択されているノードの入力から到達可能な全てのノードを選択
 - `core:select-downstream-nodes` - `alt-s d` - 現在選択されているノードの全ての出力から到達できる全てのノードを選択

[詳細]https://github.com/node-red/node-red/pull/2877)

### サブフローの開き方

以前は、サブフローを開くために、最初にワークスベース上のインスタンスをダブルクリックする必要がありました。その後、編集ダイアログにある「サブフローを編集」ボタンをクリックしていました。

With this release, if you press Ctrl (or Cmd on Mac) when you double-click on the node, it will take you straight to the subflow template tab. Similarly, if the subflow instance is selected, holding Ctrl (or Cmd) when you press the Enter key will do the same thing.

### Navigating around the workspace.

We've added some keyboard shortcuts to help navigating around the workspace.

 - You can use the cursor keys to change what node is selected in the workspace.
 - You can switch between tabs using `Ctrl/Cmd-[` and `Ctrl/Cmd-]`
 - When you jump between tabs, such as using `Ctrl-Enter` to go to a subflow template tab, you can use `Ctrl/Cmd-Shift-ArrowLeft` to go back to the last tab you were on. If you do use that to go back, you can then use `Ctrl/Cmd-Shift-ArrowRight` to go forwards in the tab history.


### Keyboard shortcuts

It is now possible to set custom keyboard shortcuts via the `editorTheme` option in the settings file. This means you can more easily copy your customisations between instances. [More details](https://github.com/node-red/node-red/pull/2843)

### Other Editor updates

 - If you reorder the sidebar tabs, we now ensure the first tab is always the one shown when you reload the editor.
 - Add confirm dialog when deleting subflows with instances in use
 - The Outline view in the info sidebar now shows how many instances of each subflow there are. Clicking on the number will open up the search dialog listing them all.
 - You can toggle the enable/disabled state of a groups contents with a single click in the Outline view


## Runtime Features

### New `externalModules` setting

There is a new setting available that governs what can be installed into Node-RED - `externalModules`.

This covers two separate things - what new nodes can be installed via the palette manager, and what modules can be loaded by the Function node.

Under this setting, you can provide `allow` and `deny` lists that are used to determine what modules can be loaded by the runtime. These lists are also used by the editor to filter the list of nodes the palette manager shows.

This new setting replaces some existing settings which are now deprecated.

 - `editorTheme.palette.editable` for `externalModules.palette.allowInstall`
 - `autoInstallModules` for `externalModules.palette.allowInstall = true` and `externalModules.autoInstall = true`
 - `autoInstallModulesRetry` for `externalModules.autoInstallRetry`
 - `editorTheme.palette.upload` for `externalModules.palette.allowUpload`


[詳細](https://github.com/node-red/node-red/pull/2797)

### Other Runtime updates

 - You can now explicitly set what language you want the runtime to use via the `lang` option in the settings file. [More details](https://github.com/node-red/node-red/pull/2796)
 - When stopping flows, configuration nodes are now stopped last so that flow nodes can rely on them still existing whilst trying to stop themselves. [More details](https://github.com/node-red/node-red/pull/2880)
 - You can now default to the simplified git workflow via your settings file with the `editorTheme.projects.workflow` option. [More details](https://github.com/node-red/node-red/pull/2763)
 - `httpAdminMiddleware` and `httpNodeMiddleware` can now be an array of middleware to apply, rather than just a single function. [More details](https://github.com/node-red/node-red/pull/2788)


## Node Features

 - The MQTT nodes now support MQTTv5 and the vast majority of the new features v5 introduces.
 - A number of the core nodes have been updated to support triggering the Complete node - Batch, Delay, Split, Join, Trigger
 - The Exec node no longer appends `msg.payload` by default - this routinely caught users out. This only applies to *newly added* nodes - existing nodes won't be affected.
   We've also updated the Exec node so you chose to append a message property other than `msg.payload`.
 - The Inject and Change nodes will now highlight any errors in their configuration when the edit dialog is closed.
 - The Function node now exposes `node.outputCount` so your code can know how many outputs the node has been configured with.
