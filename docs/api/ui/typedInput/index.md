---
layout: docs-api
toc: toc-api-ui.html
title: TypedInputウィジェット
slug:
  - url: "/docs/api/ui"
    label: "uiウィジェット"
  - 'typedinput'
---

標準的な`<input>`を文字列型、数値型、boolean型から
選んだ型の値のフィールドに置換します。

<div class="widget">
    <div class="col-4-12">
        <h3>オプション</h3>
        <table>
            <tr><td><a href="#options-default">default</a></td></tr>
            <tr><td><a href="#options-types">types</a></td></tr>
            <tr><td><a href="#options-typeField">typeField</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>メソッド</h3>
        <table>
            <tr><td><a href="#methods-disable">disable</a></td></tr>
            <tr><td><a href="#methods-disabled-get">disabled</a></td></tr>           
            <tr><td><a href="#methods-hide">hide</a></td></tr>
            <tr><td><a href="#methods-show">show</a></td></tr>
            <tr><td><a href="#methods-type">type</a></td></tr>
            <tr><td><a href="#methods-types">types</a></td></tr>
            <tr><td><a href="#methods-validate">validate</a></td></tr>
            <tr><td><a href="#methods-value">value</a></td></tr>
            <tr><td><a href="#methods-width">width</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
    <h3>イベント</h3>
    <table>
    <tr><td><a href="#events-change">change</a></td></tr>
    </table>
    <h3>型</h3>
    <table>
    <tr><td><a href="#types-typedefinition">TypeDefinition</a></td></tr>
    </table>
    </div>
</div>


### オプション

#### <a href="#options-default" name="options-default">default</a>

<span class="method-return">型: String</span>

この値が定義されている場合、
[`typeField`](#options-typeField)が定義されていなければデフォルトのinputフィールドの型を設定します。

```javascript
$(".input").typedInput({
    default: "msg"
});
```

#### <a href="#options-types" name="options-types">types</a>

<span class="method-return">型: Array</span>

この要素が提供する型の一覧を設定します。

このオプションの値は、
定義済みの型およびカスタムした型の[TypeDefinition](#types-typedefinition)オブジェクトの文字列識別子の配列です。

定義済みの型は以下のとおりです。:

識別子 | 説明
-----------|------------
`msg` | `msg.`プロパティ式
`flow` | `flow.`プロパティ式
`global` | `global.`プロパティ式
`str` | 文字列
`num` | 数値
`bool` | Boolean
`json` | 有効なJSON文字列
`bin` | Node.js Buffer
`re` | 正規表現
`jsonata` | Jsonata式
`date` | 現在のタイムスタンプ
`env` | 環境変数
`node` | `node.`プロパティ式
`cred` | セキュアクレデンシャル

```javascript
$(".input").typedInput({
    types: ["msg","str"]
});
```

#### <a href="#options-typeField" name="options-typeField">typeField</a>

<span class="method-return">型: CSSセレクタ</span>

特定の状況では、typedInputの型を保存するために`<input>`要素を既に持っていることが望ましいです。
このオプションでは存在している要素に型を設定しておくことができます。
typedInputの型が変更されたとき、
inputの型も変更されます。

```javascript
$(".input").typedInput({
    typeField: ".my-type-field"
});
```

### メソッド

<a name="methods-type"></a>

#### <a href="#methods-disable" name="methods-disable">disable()</a>

*Since Node-RED 1.2.7*

Disable the typedInput when it is currently enabled.

```javascript
$(".input").typedInput('disable');
```

#### <a href="#methods-disabled-get" name="methods-disabled-get">disabled()</a>

*Since Node-RED 1.2.7*

<span class="method-return">Returns: Boolean</span>

Gets whether the typedInput is currently disabled or not.

```javascript
$(".input").typedInput('disabled');
```

#### <a href="#methods-hide" name="methods-hide">hide()</a>

Hide the typedInput when it is currently visible.

```javascript
$(".input").typedInput('hide');
```

#### <a href="#methods-show" name="methods-show">show()</a>

Show the typedInput when it is currently hidden.

```javascript
$(".input").typedInput('show');
```

#### <a href="#methods-type-get" name="methods-type-get">type()</a>

<span class="method-return">戻り値: String</span>

選択しているtypedInputの型を取得します。

```javascript
var type = $(".input").typedInput('type');
```

#### <a href="#methods-type-set" name="methods-type-set">type( type )</a>

選択しているtypedInputの型を設定します。

```javascript
$(".input").typedInput('type','msg');
```

#### <a href="#methods-types" name="methods-types">types( types )</a>

typedInputが提供する型の一覧を設定します。詳細は[`types` option](#options-types)を参照してください。

```javascript
$(".input").typedInput('types',['str','num']);
```

#### <a href="#methods-validate" name="methods-validate">validate()</a>

<span class="method-return">戻り値: Boolean</span>

typedInputの型/値の再検証をおこなわせます。
再検証は型または値が変更されたときに自動的に実行されますが、このメソッドによって手動で実行することができます。

```javascript
var isValid = $(".input").typedInput('validate');
```

<a name="methods-value"></a>

#### <a href="#methods-value-get" name="methods-value-get">value()</a>

<span class="method-return">戻り値: String</span>

typedInputの値を取得します。

```javascript
var value = $(".input").typedInput('value');
```

#### <a href="#methods-value-set" name="methods-value-set">value( value )</a>

typedInputの値を設定します。

```javascript
$(".input").typedInput('value','payload');
```

#### <a href="#methods-width" name="methods-width">width( width )</a>

typedInputのwidthを設定します。
要素のリサイズが適切にするため、標準的な`jQuery.width()`の代わりにこのメソッドを利用してください。

```javascript
$(".input").typedInput('width', '200px');
```

### イベント

#### <a href="#events-change" name="events-change">change( type, value )</a>

inputの型または値が変更されたとき、トリガーされます。

```javascript
$(".input").on('change', function(type, value) {} );
```

### 型

#### <a href="#types-typedefinition" name="types-typedefinition">TypeDefinition</a>

`TypeDefinition`オブジェクトは、
typedInput要素で提供される型を記述します。

オブジェクトには以下のプロパティが設定できます。:

プロパティ | 型    | 必須 | 説明
---------|---------|----------|-------------
`value`  | string  | yes      | 型の識別子
`label`  | string  |          | 型メニューで表示されるラベル
`icon`   | string  |          | 型メニューで表示されるアイコン
`options`| array   |          | この型が固定値を持つ場合の値の文字列オプションの配列。例えば、boolean型の場合は`["true","false"]`となります。
`hasValue`|boolean |          | この型に関連付けられた値がない場合、`false`が設定されます。
`validate`|function|          | 型の値を検証するfunction

##### 例

数値型:

```javascript
{
    value:"num",
    label:"number",
    icon:"red/images/typedInput/09.png",
    validate:/^[+-]?[0-9]*\.?[0-9]*([eE][-+]?[0-9]+)?$/
}
```

Boolean型:

```javascript
{
    value:"bool",
    label:"boolean",
    icon:"red/images/typedInput/bool.png",
    options:["true","false"]
}
```

タイムスタンプ型:

```javascript
{
    value:"date",
    label:"timestamp",
    hasValue:false
}
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
