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

- [Options](#options)
- [Methods](#methods)
- [Events](#events)
- [Types](#types)
- [Examples](#examples)
- [Runtime handling of typed values](#runtime-handling-of-typed-values)

<div class="widget">
    <div style="clear:both">
        <div class="col-1-2">
            <h3>オプション</h3>
            <table>
                <tr><td><a href="#options-default">default</a></td></tr>
                <tr><td><a href="#options-types">types</a></td></tr>
                <tr><td><a href="#options-typeField">typeField</a></td></tr>
            </table>
        </div>
        <div class="col-1-2">
            <h3>メソッド</h3>
            <table>
                <tr><td><a href="#methods-disable">disable</a></td></tr>
                <tr><td><a href="#methods-disabled-get">disabled</a></td></tr>           
                <tr><td><a href="#methods-enable">enable</a></td></tr>
                <tr><td><a href="#methods-hide">hide</a></td></tr>
                <tr><td><a href="#methods-show">show</a></td></tr>
                <tr><td><a href="#methods-type">type</a></td></tr>
                <tr><td><a href="#methods-types">types</a></td></tr>
                <tr><td><a href="#methods-validate">validate</a></td></tr>
                <tr><td><a href="#methods-value">value</a></td></tr>
                <tr><td><a href="#methods-width">width</a></td></tr>
            </table>
        </div>
    </div>
    <div style="clear:both">
        <div class="col-1-2">
            <h3>イベント</h3>
            <table>
                <tr><td><a href="#events-change">change</a></td></tr>
            </table>
        </div>
        <div class="col-1-2">
            <h3>型</h3>
            <table>
            <tr><td><a href="#types-typedefinition">TypeDefinition</a></td></tr>
            </table>
        </div>
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

When used in a Node-RED node, this value can be stored as a node property by adding
an entry for it in the node's `defaults` object. This ensures the type is saved
along with the value in the node configuration.

```html
<div class="form-row">
    <label>Example:</label>
    <input type="text" id="node-input-myField">
    <input type="hidden" id="node-input-myFieldType">
</div>
```
```javascript
RED.nodes.registerType('example', {
    defaults: {
        myField: { value: "" },
        myFieldType: { value: "str" }
    },
    ...
    oneditprepare: function () {
        $("#node-input-myField").typedInput({
            typeField: "#node-input-myFieldType"
        });
    }
})
```



### Methods

<a name="methods-type"></a>

#### <a href="#methods-disable" name="methods-disable">disable( state )</a>

*Since Node-RED 1.2.7*

Disable the typedInput when it is currently enabled.

The optional `state` parameter can be used to toggle the disabled/enabled state of the typedInput. If `state` is true, the element will be disabled, otherwise it will be enabled.

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

#### <a href="#methods-enable" name="methods-disable">enable()</a>

*Since Node-RED 1.3.3*

Enable the typedInput when it is currently disabled.

```javascript
$(".input").typedInput('enable');
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

```javascript
$(".input").typedInput('width', '200px');
```

### イベント

#### <a href="#events-change" name="events-change">change( event, type, value )</a>

inputの型または値が変更されたとき、トリガーされます。

```javascript
$(".input").on('change', function(event, type, value) {} );
```

*Note:* `value`プロパティはNode-RED 1.3で追加されました。

### 型

#### <a href="#types-typedefinition" name="types-typedefinition">TypeDefinition</a>

`TypeDefinition`オブジェクトは、
typedInput要素で提供される型を記述します。

オブジェクトには以下のプロパティが設定できます。:

プロパティ| 型      | 必須     | 説明
---------|---------|----------|-------------
`value`  | string  | yes      | 型の識別子
`label`  | string  |          | 型メニューで表示されるラベル
`icon`   | string  |          | 型メニューで表示されるアイコン
`options`| array   |          | この型が固定値を持つ場合の値の文字列オプションの配列。例えば、boolean型の場合は`["true","false"]`となります。
`multiple`|boolean |          | If `options` is set, this can enable multiple selection of them.
`hasValue`|boolean |          | この型に関連付けられた値がない場合、`false`が設定されます。
`validate`|function|          | 型の値を検証するfunction
`valueLabel` | function |     | A function that generates the label for a given value. The function takes two arguments: `container` - the DOM element the label should be constructed in, and `value`.
`autoComplete` | function |   | *Since 2.1.0.* If set, enable autoComplete on the input, using this function to get completion suggestions. See [autoComplete](../autoComplete) for details. This option cannot be used with `options`, `hasValue=false` or `valueLabel`


##### 例

#### Built-in String, Number, Boolean types

```html
<input type="text" id="node-input-example1">
```

```javascript
$("#node-input-example1").typedInput({
    type:'str',
    types:['str','num','bool']
})
```

<div class="red-ui-editor"><input type="text" id="node-input-example1"></div>

#### Message Properties

```html
<input type="text" id="node-input-example2">
```

```javascript
$("#node-input-example2").typedInput({
    type:'msg',
    types:['msg']
})
```

<div class="red-ui-editor"><input type="text" id="node-input-example2"></div>

#### Flow/Global Context Properties

```html
<input type="text" id="node-input-example3">
```

```javascript
$("#node-input-example3").typedInput({
    type:'flow',
    types:['flow','global']
})
```

<div class="red-ui-editor"><input type="text" id="node-input-example3"></div>


#### Select from a list of options

```html
<input type="text" id="node-input-example4">
```

```javascript
$("#node-input-example4").typedInput({type:"fruit", types:[{
    value: "fruit",
    options: [
        { value: "apple", label: "Apple"},
        { value: "banana", label: "Banana"},
        { value: "cherry", label: "Cherry"},
    ]
}]})
```

<div class="red-ui-editor"><input type="text" id="node-input-example4"></div>


#### Select multiple items from a list of options

```html
<input type="text" id="node-input-example5">
```

```javascript
$("#node-input-example5").typedInput({type:"fruit", types:[{
    value: "fruit",
    multiple: true,
    options: [
        { value: "apple", label: "Apple"},
        { value: "banana", label: "Banana"},
        { value: "cherry", label: "Cherry"},
    ]
}]})
```

<div class="red-ui-editor"><input type="text" id="node-input-example5"></div>


### Runtime handling of typed values

Due to the way the `typedInput` enhances a regular HTML `<input>`, its value is
stored as a string. For example, booleans are stored as `"true"` and `"false"`.

When stored as node properties, it is necessary for the runtime part of the node
to parse the string to get the typed value.

A utility function is provided to handle the built-in types provided by the TypedInput.

```javascript
RED.util.evaluateNodeProperty(value, type, node, msg, callback)
```

Property | Type    | Required | Description
---------|---------|----------|-------------
`value`  | string  | yes      | The property to evaluate
`type`   | string  | yes      | The type of the property
`node`   | Node    | yes, for certain types | The node evaluating the property
`msg`    | Message Object | yes, for certain types | A message object to evaluate against
`callback` | Callback | yes, for `flow`/`global` types | A callback to receive the result

For most types, the function can be used synchronously without providing a callback.

```javascript
const result = RED.util.evaluateNodeProperty(value, type, node)
```

For `msg` type, the message object should also be provided:

```javascript
const result = RED.util.evaluateNodeProperty(value, type, node, msg)
```

To handle `flow` and `global` context types, the node needs to be provided as well as
a callback function due to the asynchronous nature of context access:

```javascript
RED.util.evaluateNodeProperty(value, type, node, msg, (err, result) => {
    if (err) {
        // Something went wrong accessing context
    } else {
        // Do something with 'result'
    }
})
```


<script src="/js/jquery-ui.min.js"></script>
<script>
    var RED = {};
    RED.settings = {};
    RED.editor = { editJSON: function(){}}
</script>
<script src="/js/utils.js"></script>
<script src="/js/autoComplete.js"></script>
<script src="/js/typedInput.js"></script>
<script src="/js/popover.js"></script>
<link rel="stylesheet" href="/css/editor-style.min.css">
<style>
.red-ui-editor {
    border: 1px solid #564848;
    background: white;
    border-radius: 2px;
    padding: 40px 20px;
}
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

<script>
$(function() {
    $("#node-input-example1").typedInput({type:'str',types:['str','num','bool']})
    $("#node-input-example2").typedInput({type:'msg',types:['msg']})
    $("#node-input-example3").typedInput({type:'flow',types:['flow','global']})
    $("#node-input-example4").typedInput({type:"fruit", types:[{
        value: "fruit",
        options: [
            { value: "apple", label: "Apple"},
            { value: "banana", label: "Banana"},
            { value: "cherry", label: "Cherry"},
        ]
    }]})
    $("#node-input-example5").typedInput({type:"fruit", types:[{
        value: "fruit",
        multiple: true,
        options: [
            { value: "apple", label: "Apple"},
            { value: "banana", label: "Banana"},
            { value: "cherry", label: "Cherry"},
        ]
        }]})
});
</script>
