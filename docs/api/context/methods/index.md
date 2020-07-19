---
layout: docs-api
toc: toc-api-context.html
title: Context Store API
slug:
  - url: "/docs/api/context"
    label: "コンテキスト"
  - 'api'
---

**バージョン0.19の新機能**

コンテキストストアプラグインはNode.jsのモジュールであり、
プラグインの新しいインスタンスを生成できる関数を `module.exports` で公開しています。
関数によって返されるオブジェクトは、以下の関数を持っていなければなりません:

関数                                                           | 説明
---------------------------------------------------------------|-------------------------
[ContextStore.open()](#contextstoreopen)                       | 使用可能なストレージをオープン
[ContextStore.close()](#contextstoreclose)                     | ストレージをクローズ
[ContextStore.get(scope, key, callback)](#contextstoregetscope-key-callback) | ストアから値を取得
[ContextStore.set(scope, key, value, callback)](#contextstoresetscope-key-value-callback) | ストアに値を格納
[ContextStore.keys(scope, calback)](#contextstorekeysscope-callback) | ストア内のすべてのキーのリストを取得
[ContextStore.delete(scope)](#contextstoredeletescope)               | 指定されたスコープ内のすべてのキーを削除
[ContextStore.clean(activeNodes)](#contextstorecleanactivenodes)     | コンテキストストアをクリーン

### ContextStore.open()

使用可能なストレージを開きます。これは他の値にアクセスする前に呼び出します。

ストアがアクセス可能になった時にresolveされる `Promise` を返します。

### ContextStore.close()

ランタイムが停止した時に呼び出され、それ以上はキー値にアクセスされません。

ストアががクローズされた時にresolveされる `Promise` を返します。

### ContextStore.get(scope, key, [callback])

引数     | 説明
---------|------------------------------
scope    | キーのスコープ
key      | 値を返すためのキーまたは配列のキー
callback | *オプション* キー値を取得するためのコールバック関数

`key` 引数は値を取得するための、単一のキーを識別するStringか、
または複数のキーを特定するStringの配列です。

オプションの `callback` 引数が指定されている場合は、2つ以上の引数を持つ関数でなければなりません:

```
function callback(error, value1, value2, ... ) {

}
```

コールバック関数が指定されておらず、ストアが同期的なアクセスを行う場合、
`get` 関数は別々の値を返さなければならないか、もしくはキーの値配列を返します。
ストアが同期的アクセスをサポートしていない場合、エラーをthrowします。

### ContextStore.set(scope, key, value, [callback])

引数     | 説明
---------|------------------------------
scope    | キーのスコープ
key      | 値をセットするためのキーまたは配列のキー
value    | 値または値配列
callback | *オプション* 値がセットされた際に呼び出されるコールバック関数

`key` 引数は値をセットするための単一のキーを識別するStringか、
または複数のキーを特定するStringの配列です。

`key`        | `value`        | 動作
-------------|----------------|----------------
String       | 任意           | `key` 配下の `value` を格納
Array        | Array          | `key` に対応する `value` の値をセット。`value` の要素数が `key` より少ない場合、不足している値には `null` がセットされる。
Array        | Array以外      | `value` 指定値が最初のキーに格納され、残りは `null` となります。

オプションの `callback` 引数が指定されている場合、それは値が格納された時に呼び出されます。
関数の引数は `error` 1つであり、値格納のあいだに起きたエラーが渡されます。

```
function callback(error) {

}
```

コールバック関数が指定されておらず、ストアが同期的なアクセスを行う場合、
`set` 関数は格納された値を戻します。
別々の値を返さなければならないか、もしくはキーの値配列を返します。

### ContextStore.keys(scope, [callback])

引数        | 説明
------------|------------------------
scope       | 返されるキーのスコープ
callback    | *オプション* キーのリストに対してのコールバック関数

指定されたスコープ内のキーのリストを返します。

`callback` 引数が指定されている場合は、2つ以上の引数を持つ関数でなければなりません:

```
function callback(error, keys) {

}
```

コールバック関数が指定されておらず、ストアが同期的なアクセスを行う場合、
`key` 関数はキーの配列を返さなければなりません。
ストアが同期的アクセスをサポートしていない場合、エラーをthrowします。

### ContextStore.delete(scope)

引数        | 説明
------------|------------------------
scope       | 削除するスコープ

### ContextStore.clean(activeNodes)

引数        | 説明
------------|------------------------
activeNodes | まだアクティブであるすべてのノードとフローのidリスト

ストアが不要になったコンテキストスコープを削除した時にresolveされる `Promise` を返します。
`activeNodes` リストはどのノードやフローがまだアクティブであるかどうか識別するために使用されます。
