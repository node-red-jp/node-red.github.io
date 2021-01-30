---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: 編集ダイアログ
slug: edit dialog
---
<script src="js/jquery-ui.min.js"></script>
<script>
    var RED = {};
    RED.settings = {};
    RED.editor = { editJSON: function(){}}
</script>
<script src="js/utils.js"></script>
<script src="js/typedInput.js"></script>
<script src="js/popover.js"></script>
<link rel="stylesheet" href="/css/editor-style.min.css">

ノードの編集ダイアログの主な用途は、
ユーザーが望む動作をノードに設定することです。

ダイアログは直感的に利用でき、
そのデザインおよび外見が他のノードと一貫性がなければなりません。

編集ダイアログは[ノードのHTMLファイル](node-html)内の
`<script>`タグから生成されます。

```html
<script type="text/html" data-template-name="node-type">
    <!-- edit dialog content  -->
</script>
```

 - `<script>`タグの`type`は`text/html`にします - これにより、テキストエディタが適したテキストハイライトをおこないます。
   また、ノードがエディタに読み込まれた際、
   通常のHTMLコンテンツとなることからブラウザを保護します。
 - タグには編集ダイアログのためにノードの種類を示す`data-template-name`属性をセットします。
   特定のノードを編集するときに
   どのようなコンテンツを表示すべきかをエディタに伝えます。

編集ダイアログは一般的に行から構成されます。
それぞれの行には異なるプロパティに対するlabelとinputが含まれます。

```html
<div class="form-row">
    <label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
    <input type="text" id="node-input-name" placeholder="Name">
</div>
```

- 各行は`form-row`クラスをもつ`<div>`から生成されます。
- 一般的な行はアイコンと`<input>`と一致するプロパティの名称を含んだ`<label>`を持ちます。
  アイコンは`<i>`要素を利用して生成され、
  [Font Awesome 4.7](https://fontawesome.com/v4.7.0/icons/)から利用可能なクラスを持ちます。
- プロパティを含むフォーム要素は`node-input-<propertyname>`というid属性が必須です。
  設定ノードの場合、id属性は`node-config-input-<property-name>`となります。
- `<input>`のtype属性は、
  stringおよびnumberのプロパティには`text`、booleanのプロパティには`checkbox`とします。
  また、選択肢が制限されている場合には`<select>`要素を使うことができます。


Node-REDはいくつかの標準UIウィジェットを提供しており、
よりリッチで一貫性のあるユーザーエクスペリエンスを作り出すことができます。

### ボタン

編集ダイアログにボタンを追加するには、
一般的な`<button>`HTML要素を利用し、`red-ui-button`クラスを付与します。

<table class="ui-examples">
<tr>
<td>
    <h5>プレーンボタン</h5>
    <button type="button" class="red-ui-button">Button</button>
</td>
<td>
<pre>&lt;button type="button" class="red-ui-button"&gt;Button&lt;/button&gt;</pre>
</td>
</tr>
<tr>
<td>
    <h5>スモールボタン</h5>
    <button type="button" class="red-ui-button red-ui-button-small">Button</button>
</td>
<td>
<pre>&lt;button type="button" class="red-ui-button red-ui-button-small"&gt;Button&lt;/button&gt;</pre>
</td>
</tr>
<tr>
<td>
<h5>トグルボタングループ</h5>
<span class="button-group">
<button type="button" class="red-ui-button toggle my-button-group selected">b1</button><button type="button" class="red-ui-button toggle my-button-group">b2</button><button type="button" class="red-ui-button toggle my-button-group">b3</button>
</span>
</td>
<td>
<div class="figure">
<pre>&lt;span class="button-group"&gt;
&lt;button type="button" class="red-ui-button toggle selected my-button-group"&gt;b1&lt;/button&gt;&lt;button type="button" class="red-ui-button toggle my-button-group"&gt;b2&lt;/button&gt;&lt;button type="button" class="red-ui-button toggle my-button-group"&gt;b3&lt;/button&gt;
&lt;/span&gt;
</pre>
<p class="caption">HTML</p>
</div>
<div class="figure">
<pre>$(".my-button-group").on("click", function() {
    $(".my-button-group").removeClass("selected");
    $(this).addClass("selected");
})</pre>
<p class="caption">oneditprepare</p>
</div>
<p>活性化しているボタンに<code>selected</code>クラスをトグルさせるため、you will need to add code to
イベントを制御する<code>oneditprepare</code>関数をコードに追加する必要があります。</p>
<p><i>注意:</i> <code>button-group</code>とする<code>&lt;button&gt;</code>要素同士のあいだに空白を避けるため、現時点ではspan要素は空白を適切に省略していません。これは将来的に対応します。</p>
</td>
</tr>


</table>



### 入力

シンプルなテキスト入力には、標準的な`<input>`要素を利用することができます。

場合によっては、Node-REDは代替として`TypedInput`ウィジェットを提供しています。
これによってユーザーはプロパティとその値の型を指定することができます。

例えば、プロパティをString、Number、booleanに指定できます。
また、メッセージプロパティ、フローまたはグローバルコンテキストプロパティを指定するように利用できます。

このjQueryウィジェットを編集ダイアログページに追加するためには、
ノードの`oneditprepare`関数にコードを追加する必要があります。

`TypedInput`ウィジェットの全APIドキュメントは、
利用可能なビルトインされている型一覧も含めて[こちら](/docs/api/ui/typedInput/)で入手できます。

<i>`TypedInput`に含まれているドロップダウンメニューが
このページにうまく組み込めていないことを認識しています。 - クリックされたときにページが移動してしまいます。
これは修正される予定です。</i>


<table class="ui-examples">
<tr>
    <td>
        <h5>プレーンなHTML Input</h5>
        <span class="red-ui-editor"><input type="text" id="node-input-name"></span>
    </td>
    <td>
    <pre>&lt;input type="text" id="node-input-name"&gt;</pre>
    </td>
</tr>
<tr>
    <td>
        <h5>TypedInput<br>String/Number/Boolean</h5>
        <span class="red-ui-editor"><input type="text" id="node-input-example1"></span>
    </td>
    <td>
        <div class="figure">
            <pre>&lt;input type="text" id="node-input-example1"&gt;
&lt;input type="hidden" id="node-input-example1-type"&gt;
</pre>
            <p class="caption">HTML</p>
        </div>
        <div class="figure">
            <pre>$("#node-input-example1").typedInput({
    type:"str",
    types:["str","num","bool"],
    typeField: "#node-input-example1-type"
})</pre>
            <p class="caption">oneditprepare</p>

            TypedInputに複数の型をセットするとき、
            型に関する情報をストアするための追加プロパティが必要となります。
            これはhidden属性をもつ<code>&lt;input&gt;</code>として編集ダイアログに追加されます。
         </div>
    </td>
</tr>

<tr>
    <td>
        <h5>TypedInput<br>JSON</h5>
        <span class="red-ui-editor"><input type="text" id="node-input-example2" value="{&quot;a&quot;: 123}"></span>
    </td>
    <td>
        <div class="figure">
            <pre>&lt;input type="text" id="node-input-example2"&gt;</pre>
            <p class="caption">HTML</p>
        </div>
        <div class="figure">
            <pre>$("#node-input-example2").typedInput({
    type:"json",
    types:["json"]
})</pre>
            <p class="caption">oneditprepare</p>
        JSON型には専用のJSON編集ダイアログを開くボタンが含まれます
        （このデモでは無効化されています）。
         </div>
    </td>
</tr>
<tr>
    <td>
        <h5>TypedInput<br>msg/flow/global</h5>
        <span class="red-ui-editor"><input type="text" id="node-input-example3" value="payload"></span>
    </td>
    <td>
        <div class="figure">
            <pre>&lt;input type="text" id="node-input-example3"&gt;
&lt;input type="hidden" id="node-input-example3-type"&gt;</pre>
            <p class="caption">HTML</p>
        </div>
        <div class="figure">
            <pre>$("#node-input-example3").typedInput({
    type:"msg",
    types:["msg", "flow","global"],
    typeField: "#node-input-example3-type"
})</pre>
            <p class="caption">oneditprepare</p>
         </div>
    </td>
</tr>
</table>
<script>
$(function() {
    $("#node-input-example1").typedInput({type:'str',types:['str','num','bool']})
    $("#node-input-example2").typedInput({type:'json',types:['json']})
    $("#node-input-example3").typedInput({type:"msg", types:["msg", "flow","global"]})

    $(".my-button-group").on("click", function() {
        $(".my-button-group").removeClass("selected");
        $(this).addClass("selected");
    })
})
</script>

### 複数行テキストエディタ

Node-REDは[Aceコードエディタ](https://ace.c9.io/)を元にした複数行テキストエディタを持っています。

<div style="width: 467px" class="figure align-centre">
  <img src="images/ace-editor.png" alt="Multi-line Text Editor">
  <p class="caption">複数行テキストエディタ</p>
</div>

以下の例では、編集するノードのプロパティを`exampleText`と呼びます。

HTMLに、エディタのための`<div>`プレースホルダーを追加します。
この要素にはCSSクラスの`node-text-editor`が必須です。また、要素に`height`を設定する必要があります。

```html
<div style="height: 250px; min-height:150px;" class="node-text-editor" id="node-input-example-editor"></div>
```

ノードの`oneditprepare`関数において、
`RED.editor.createEditor`関数を使ってテキストエディタのイニシャライズをおこないます:

```javascript
this.editor = RED.editor.createEditor({
   id: 'node-input-example-editor',
   mode: 'ace/mode/text',
   value: this.exampleText
});
```

ダイアログを閉じる際にエディタから値を取得するため、
ページからエディタを適切に消すために
`oneditsave`および`oneditcancel`関数も設定する必要があります。

```javascript
oneditsave: function() {
    this.exampleText = this.editor.getValue();
    this.editor.destroy();
    delete this.editor;
},
oneditcancel: function() {
    this.editor.destroy();
    delete this.editor;
},
```



<style>
 table.ui-examples h5 { margin: 3px 0 15px }
 table.ui-examples td:first-child {
     vertical-align: top;
 }
 table.ui-examples td:last-child {
     padding-top: 35px;

 }
 </style>