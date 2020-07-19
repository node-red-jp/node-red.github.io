---
layout: docs-api
toc: toc-api-ui.html
title: SearchBoxウィジェット
slug:
  - url: "/docs/api/ui"
    label: "uiウィジェット"
  - 'searchbox'
---

検索入力欄に一般的な機能を提供する拡張された`<input>`要素です。

<div class="widget">
    <div class="col-4-12">
        <h3>オプション</h3>
        <table>
            <tr><td><a href="#options-delay">delay</a></td></tr>
            <tr><td><a href="#options-minimumLength">minimumLength</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>メソッド</h3>
        <table>
            <tr><td><a href="#methods-change">change</a></td></tr>
            <tr><td><a href="#methods-count">count</a></td></tr>
            <tr><td><a href="#methods-value">value</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>イベント</h3>
        <h3>型</h3>
    </div>
</div>

### オプション

#### <a href="#options-delay" name="options-delay">delay</a>

<span class="method-return">型: number</span>

最後にキーを押してから`change`イベントが発火するまでの遅延時間をミリ秒で設定します。

#### <a href="#options-data" name="options-minimumLength">minimumLength</a>

<span class="method-return">型: number</span>

入力結果が`change`イベントを発生させるテキストの最小文字数を設定します。
入力を0文字にクリアすると、この設定に関係なく常に`change`イベントが発生します。

### メソッド

#### <a href="#methods-change" name="methods-change">change( )</a>

検索入力欄でchangeイベントを発生させます。

```javascript
$(".input").searchBox('change');
```

#### <a href="#methods-count" name="methods-count">count( value )</a>

検索ボックスにカウントラベルの値を設定します。
これは検索で現在一致している「モノ」の数をユーザにフィードバックするために利用できます。
このとき、`value`は文字列です。

従うべき標準的なパターンは次のとおりです。:

 - 検索ボックスが空の場合、利用可能なアイテム数を設定します。:  `"300"`
 - 検索ボックスが空ではない場合、
   一致しているアイテム数と利用可能なアイテム数を設定します。: `"120 / 300"`

`value`がnull、undefinedまたは空白の場合、カウントフィールドは非表示になります。

```javascript
$(".input").searchBox('count', '120 / 300');
```

<a name="methods-value"></a>

#### <a href="#methods-value-get" name="methods-value-get">value()</a>

<span class="method-return">戻り値: String</span>

検索入力欄の現在の値を取得します。

```javascript
var type = $(".input").searchBox('value');
```

#### <a href="#methods-value-set" name="methods-value-set">value( value )</a>

検索入力欄に値を設定します。

```javascript
$(".input").searchBox('value','hello');
```

<style>

.widget h3 {
    margin-left: 0;
    padding-bottom: 5px;
    border-bottom: 2px solid #B68181;
}
.widget:after {
    content:"";
    display:block;
    clear:both;
}
.method-return {
    float: right;
    font-style: italic;
    padding-left: 10px;
    border-left: 2px solid #B68181;
}
</style>
