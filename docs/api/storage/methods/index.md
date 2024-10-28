---
layout: docs-api
toc: toc-api-storage.html
title: Storage API
slug:
  - url: "/docs/api/storage"
    label: "storage"
  - 'メソッド'
---

ストレージプラグインは下記の機能を
`module.exports` で公開するNode.jsのモジュールです。

 機能                                                      | 詳細
---------------------------------------------------------------|-------------------------
[Storage.init(settings)](#storageinitsettings)                 | ストレージシステムを初期化
[Storage.getFlows()](#storagegetflows)                         | フロー設定を取得
[Storage.saveFlows(flows)](#storagesaveflowsflows)             | フロー設定を保存
[Storage.getCredentials()](#storagegetcredentials)             | フロークレデンシャルを取得
[Storage.saveCredentials(credentials)](#storagesavecredentialscredentials) | フロークレデンシャルを保存
[Storage.getSettings()](#storagegetsettings)                   | ユーザ設定を取得
[Storage.saveSettings(settings)](#storagesavesettingssettings) | ユーザ設定を保存
[Storage.getSessions()](#storagegetsessions)                   | ユーザセッションを取得
[Storage.saveSessions(sessions)](#storagesavesessionssessions) | ユーザセッションを保存
[Storage.getLibraryEntry(type,name)](#storagegetlibraryentrytypename) | 型指定でのライブラリエントリを取得
[Storage.saveLibraryEntry(type,name,meta,body)](#storagesavelibraryentrytypenamemetabody) | 型指定でのライブラリエントリを保存

### Storage.init(settings)

ストレージシステムを初期化します。

引数     | 説明
---------|----------------------
settings | ランタイム設定

ストレージシステムが初期化された時にresolveされるPromiseオブジェクトを返します。

### Storage.getFlows()

ランタイムのフロー設定でresolveされるPromiseオブジェクトを返します。

### Storage.saveFlows(flows)

引数     | 説明
---------|------------------------------
flows    | JSONでシリアライズされたフロー設定オブジェクト

フロー設定が保存された時にresolveされるPromiseオブジェクトを返します。

### Storage.getCredentials()

ランタイムのフロークレデンシャルでresolveされるPromiseオブジェクトを返します。

### Storage.saveCredentials(credentials)

引数        | 説明
------------|------------------------
credentials | JSONでシリアライズされたクレデンシャルオブジェクト

フローのクレデンシャルが保存された時にresolveされるPromiseオブジェクトを返します。

### Storage.getSettings()

ユーザー設定でresolveされるPromiseオブジェクトを返します。

### Storage.saveSettings(settings)

引数     | 説明
---------|------------------------
settings | JSONでシリアライズされた設定オブジェクト

設定が保存された時にresolveされるPromiseオブジェクトを返します。

### Storage.getSessions()

セッションオブジェクトでresolveされるPromiseオブジェクトを返します。

### Storage.saveSessions(sessions)

引数     | 説明
---------|------------------------
sessions | JSONでシリアライズされたセッションオブジェクト

セッションが保存された時にresolveされるPromiseオブジェクトを返します。

## ライブラリ関数

ライブラリタイプへ登録するノードは、
ユーザーからローカルライブラリ内でのコンテンツの保存や取得ができます。
ストレージモジュールの下記の関数はこのコンテンツへアクセスするために使用されます。

エントリはそれらに関するメタデータを保持します。
たとえば `function` エントリは、関数がいくつの出力を持つか特定するためのメタデータを含みます。

### Storage.getLibraryEntry(type,name)

引数     | 説明
---------|----------------------------------------------------------------
type     | ライブラリエントリのタイプ。たとえば `flows` や `functions` や `templates`
name     | エントリのパス名

結果でresolveされるPromiseオブジェクトを返します。

もし `name` が単一のエントリである場合、
たとえば関数のコードであるような、エントリのコンテンツが結果になります。

`name` が論理的ディレクトリを示している場合、結果はディレクトリのリストの配列となります。
配列の各要素はそれぞれ、文字列(参照可能なサブディレクトリ)または、
エントリのファイル名を示す `fn` プロパティを持つオブジェクトです。
エントリに関する他のメタデータも同様です。

{% highlight javascript %}
[ 'directory1',
  'directory2',
  { fn: 'File-1.js', outputs: 3 },
  { fn: 'File-2.js', outputs: 1 },
  { fn: 'File-3.js', outputs: 2 }
]
{% endhighlight %}

### Storage.saveLibraryEntry(type,name,meta,body)

引数     | 説明
---------|----------------------------------------------------------------
type     | ライブラリエントリのタイプ。たとえば `flows` や `functions` や `templates`
name     | エントリのパス名
meta     | エントリに付随して保存する追加のメタデータを含むオブジェクト
body     | エントリのボディ

エントリが保存された時にresolveされるPromiseオブジェクトを返します。


## 非推奨のライブラリ関数

バージョン0.10.7以前は、下記の関数はストレージモジュールで使用されていました。

このインターフェイスの新しい実装はこれらの関数を _実装するべきではありません。_

ランタイムは後方互換のためであればこれらを使用しますが、
そうでなければ`flows` に設定された
`type` 引数の `getLibraryEntry/saveLibraryEntry` を使用します。

#### Storage.getAllFlows()

ライブラリ内のすべてのフローの完全なリスト取得で
resolveされるPromiseオブジェクトを返します。

#### Storage.getFlow(name)

フローのコンテンツでresolveされるPromiseオブジェクトを返します。

#### Storage.saveFlow(name,flow)

フローがライブラリへ保存された時にresolveされるPromiseオブジェクトを返します。
