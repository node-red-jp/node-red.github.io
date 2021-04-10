---
layout: docs-api
toc: toc-api-ui.html
title: EditableListウィジェット
slug:
  - url: "/docs/api/ui"
    label: "uiウィジェット"
  - 'editablelist'
---


複雑な要素になることができるような項目を`<ol>`要素に置換します。
`Switch`および`Change`といったコアノードで利用されています。

<div class="widget">
    <div class="col-4-12">
        <h3>オプション</h3>
        <table>
            <tr><td><a href="#options-addButton">addButton</a></td></tr>
            <tr><td><a href="#options-addItem">addItem</a></td></tr>
            <tr><td><a href="#options-buttons">buttons</a></td></tr>
            <tr><td><a href="#options-connectWith">connectWith</a></td></tr>
            <tr><td><a href="#options-header">header</a></td></tr>
            <tr><td><a href="#options-height">height</a></td></tr>
            <tr><td><a href="#options-filter">filter</a></td></tr>
            <tr><td><a href="#options-resize">resize</a></td></tr>
            <tr><td><a href="#options-resizeItem">resizeItem</a></td></tr>
            <tr><td><a href="#options-scrollOnAdd">scrollOnAdd</a></td></tr>
            <tr><td><a href="#options-sort">sort</a></td></tr>
            <tr><td><a href="#options-sortable">sortable</a></td></tr>
            <tr><td><a href="#options-sortItems">sortItems</a></td></tr>
            <tr><td><a href="#options-removable">removable</a></td></tr>
            <tr><td><a href="#options-removeItem">removeItem</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>メソッド</h3>
        <table>
            <tr><td><a href="#methods-addItem">addItem</a></td></tr>
            <tr><td><a href="#methods-addItems">addItems</a></td></tr>
            <tr><td><a href="#methods-removeItem">removeItem</a></td></tr>
            <tr><td><a href="#methods-width">width</a></td></tr>
            <tr><td><a href="#methods-height">height</a></td></tr>
            <tr><td><a href="#methods-items">items</a></td></tr>
            <tr><td><a href="#methods-empty">empty</a></td></tr>
            <tr><td><a href="#methods-filter">filter</a></td></tr>
            <tr><td><a href="#methods-show">show</a></td></tr>
            <tr><td><a href="#methods-sort">sort</a></td></tr>
            <tr><td><a href="#methods-length">length</a></td></tr>
        </table>
    </div>
    <div class="col-4-12">
        <h3>イベント</h3>
        <h3>型</h3>
    </div>
</div>


### オプション

#### <a href="#options-addButton" name="options-addButton">addButton</a>

<span class="method-return">型: Boolean|String</span>

クリックされた際、リストに新しい項目を追加するボタンを
リスト下部に表示するか否かを決定します。

設定されていない場合、または`true`（boolean）が設定された場合、「追加する」というテキスト付きのボタンが表示されます。

`false`（boolean）が設定された場合、ボタンは非表示になります。

空白以外の文字列が設定された場合、その値がテキストとして利用されたボタンが表示されます。

```javascript
$("ol.list").editableList({
    addButton: "pets"
});
```

#### <a href="#options-addItem" name="options-addItem">addItem( row, index, data )</a>

<span class="method-return">型: Function</span>

リストに新しい項目が追加されたとき、呼び出されるコールバック関数です。

 - `row` - 行内容を追加するjQuery DOM要素
 - `index` - 行のインデックス
 - `data` - 行のデータオブジェクト

「追加ボタン」のクリックをトリガーとして、`data`は`{}`になります。
それ以外の場合は、dataは[`addItem`](#methods-addItem)メソッドの引数として渡されるデータです。

```javascript
$("ol.list").editableList({
    addItem: function(row, index, data) {
        $(row).html("Item "+index);
    }
});
```

#### <a href="#options-buttons" name="options-buttons">buttons( array )</a>

<span class="method-return">型: Array</span>

ボタンオブジェクトの配列で、EditableListのボタンを追加する必要があります。
それぞれのボタンオブジェクトは以下のプロパティを持つことができます。

 - `label` - （オプション）ボタンのラベル
 - `icon` - （オプション）ボタンのアイコン
 - `title` - （オプション）ボタンのツールチップテキスト
 - `click` - ボタンがクリックされたときに実行されるコールバック関数

`addButton`が有効化されたとき、暗黙的にこの配列に対して「add button」が追加されることに注意してください。

```javascript
$("ol.list").editableList({
    addItem: function(row, index, data) {
        $(row).html("Item "+index);
    }
    buttons: [{
        label: "with icon",
        icon: "fa fa-star",
        title: "my custom button",
        click: function(evt) { 
            alert("button clicked");
        }
   }]
});
```

#### <a href="#options-connectWith" name="options-connectWith">connectWith</a>

<span class="method-return">型: CSS Selector</span>

リストが[ソート可能](#options-sortable)である場合、
このオプションはこのリストから他のjQueryの`sortable`なリスト、つまり他の`editableList`に項目をドラッグして移動できるようにします。

```javascript
$("ol.list").editableList({
    connectWith: ".my-other-list"
});
```

#### <a href="#options-header" name="options-header">header</a>

<span class="method-return">型: DOM/JQuery object</span>

リストのヘッダとしてDOM/jQueryオブジェクトに追加します。

```javascript
$("ol.list").editableList({
    header: $("<div>").append($.parseHTML("<div style='width:40%; display: inline-grid'>Name</div><div style='display: inline-grid'>Type</div>")),
});
```

#### <a href="#options-height" name="options-height">height</a>

<span class="method-return">型: String|Number</span>

可能であれば、追加ボタンを含めたリストの高さを設定します。heightに「auto」を設定すると、垂直方向のスクロールバーを除去し、コンテンツを収容するために必要な全高でリストを表示します。

```javascript
$("ol.list").editableList({
    height: 300
});
```

#### <a href="#options-filter" name="options-filter">filter( data )</a>

<span class="method-return">型: Function</span>

リストに表示される項目を絞り込むために呼び出されるコールバック関数。

 - `data` - 行のデータオブジェクト

項目が表示されるべきか否かを示すため、
この関数は`true`/`false`（boolean）を返却しなくてはいけません。

```javascript
$("ol.list").editableList({
    filter: function(data) {
        return data.index%2 === 0
    }
});
```


#### <a href="#options-resize" name="options-resize">resize()</a>

<span class="method-return">型: Function</span>

リストのサイズが変更されたときに呼び出される関数です。

```javascript
$("ol.list").editableList({
    resize: function() {
        console.log("I have changed in size")
    }
});
```

#### <a href="#options-resizeItem" name="options-resizeItem">resizeItem( row, index )</a>

<span class="method-return">型: Function</span>

リストのサイズが変更されたとき、
リストの各項目に対して呼び出される関数。

 - `row` - 行のjQuery DOM要素
 - `index` - 行のインデックス

項目の元のデータは`data`プロパティに保管されています。

このコールバック関数は、メインである[`resize`](#options-resize)コールバック関数が呼び出された後に呼び出されます。

```javascript
$("ol.list").editableList({
    resizeItem: function(row,index) {
        var originalData = $(row).data('data');
        console.log("Resize the row for item:", originalData)
    }
});
```

#### <a href="#options-scrollOnAdd" name="options-scrollOnAdd">scrollOnAdd</a>

<span class="method-return">型: Boolean</span>

新しい項目が追加されるたび、
リストの最後尾まで自動的にスクロールされるか否かを決定します。

設定されていない場合、または`true`（boolean）の場合、
新しく追加された項目にリストがスクロールされます。

`false`（boolean）が設定された場合、リストはスクロールされません。

```javascript
$("ol.list").editableList({
    scrollOnAdd: false
});
```

#### <a href="#options-sort" name="options-sort">sort( itemDataA, itemDataB )</a>

<span class="method-return">型: Function</span>

リストの2つの項目を比較し、
項目の順序を決定するために呼び出されるコールバック関数。

 - `itemDataA` - データ項目
 - `itemDataB` - データ項目

この関数が0より小さい値を返した場合、`itemDataA`は`itemDataB`の前になります。

この関数が0を返した場合、項目の並びは変わりません。

この関数が0より大きい値を返した場合、`itemDataA`は`itemDataB`の後になります。

```javascript
$("ol.list").editableList({
    sort: function(dataA, dataB) {
        return dataA.index-dataB.index;
    }
});
```

#### <a href="#options-sortable" name="options-sortable">sortable</a>

<span class="method-return">型: Boolean|CSS Selector</span>

リストの項目をドラッグして並び替えることができるか否かを決定します。

`true`（boolean）が設定された場合、デフォルトのドラッグハンドルが項目の横に表示されます。

CSSセレクタが設定された場合、
そのセレクタは項目のコンテンツ要素内のドラッグハンドルとして使われる要素を特定するために利用されます。

```javascript
$("ol.list").editableList({
    sortable: true
});
```

#### <a href="#options-sortItems" name="options-sortItems">sortItems( items )</a>

<span class="method-return">型: Function</span>

リスト内の項目が移動させられたあとに呼び出される関数。

 - `items` - 各行のjQuery DOM要素の配列

各行の要素は、項目の元のデータを`data`プロパティに保管しています。

```javascript
$("ol.list").editableList({
    sortItems: function(items) {
        console.log("The items have changed order")
    }
});
```


#### <a href="#options-removable" name="options-removable">removable</a>

<span class="method-return">型: Boolean</span>

`true`が設定された場合、各行は右側に削除ボタンを含んで表示されます。
このボタンをクリックするとリストから行が削除され、
もし設定されていれば[`removeItem`](#options-removeItem)コールバック関数を呼び出します。

```javascript
$("ol.list").editableList({
    removable: true
});
```

#### <a href="#options-removeItem" name="options-removeItem">removeItem( data )</a>

<span class="method-return">型: Function</span>

リストから項目が削除されたときに呼び出される関数。

 - `data` - 項目の元のデータ

削除は、項目の[削除ボタン](#options-removable)がクリックされたとき、
または[`removeItem`](#methods-removeItem)メソッドが呼び出されたときに実施されます。


```javascript
$("ol.list").editableList({
    removeItem: function(data) {
        console.log("An item has been removed")
    }
});
```


### メソッド

#### <a href="#methods-addItem" name="methods-addItem">addItem( itemData )</a>

リストの最後尾に項目を追加します。
`itemData`はリストの項目になるオブジェクトです。

```javascript
$("ol.list").editableList('addItem',{fruit:"banana"});
```

#### <a href="#methods-addItems" name="methods-addItems">addItems( itemData )</a>

配列に含まれている項目をリストの最後尾に追加します。
`itemData`はリストの項目になるオブジェクトの配列です。

```javascript
$("ol.list").editableList('addItems',[{fruit:"banana"},{fruit:"apple"},{fruit:"pear"}]);
```

#### <a href="#methods-removeItem" name="methods-removeItem">removeItem( itemData )</a>

リストから項目を削除します。
`itemData`は削除する項目を特定するオブジェクトです。

```javascript
$("ol.list").editableList('removeItem',{fruit:"banana"});
```

#### <a href="#methods-width" name="methods-width">width( width )</a>

editableListの幅を設定します。
コンポーネントのリサイズが適切に実施されるようにするため、一般的な`jQuery.width()`関数の代わりにこの関数を使用する必要があります。

```javascript
$("ol.input").editableList('width', '200px');
```

#### <a href="#methods-height" name="methods-height">height( height )</a>

editableListの高さを設定します。
コンポーネントのりサイズが適切におこなわれるため、一般的な`jQuery.height()`関数の代わりにこの関数を使用する必要があります。

```javascript
$("ol.input").editableList('height', '200px');
```

#### <a href="#methods-items" name="methods-items">items()</a>

<span class="method-return">型: Array</span>

リストの全項目の配列を取得します。各要素は、項目のjQuery DOM要素です。

各要素は、項目の元のデータを`data`プロパティに保管しています。

```javascript
var items = $("ol.list").editableList('items');
```

#### <a href="#methods-empty" name="methods-empty">empty()</a>

リストの全項目を削除します。この関数は他のコールバック関数を呼び出しません。

```javascript
$("ol.list").editableList('empty');
```

#### <a href="#methods-filter" name="methods-filter">filter( filter )</a>

<span class="method-return">型: Number</span>

利用可能なフィルター関数にもとづいてリスト内の項目の表示/非表示を仕分けし、
表示する項目の数を返します。

フィルター関数の詳細は、
<code><a href="#options-filter">filter</a></code>を参照してください。

`filter`が設定されていない場合、
リストは現在利用可能なフィルター関数を使って仕分けをおこないます。

`filter`が`null`の場合、フィルターは削除されます。

```javascript
var filteredCount = $("ol.list").editableList('filter',function(data) {
    return data.index%2 === 0
});
```

#### <a href="#methods-show" name="methods-show">show( item )</a>

*0.20.0から*

特定の項目が表示されるようにするため、リストをスクロールします。

```javascript
$("ol.list").editableList('show', item);
```

#### <a href="#methods-sort" name="methods-sort">sort( sort )</a>

利用可能なソート関数を用いてリストを並べ替えます。

sortは2つの項目を比較し、
リスト内の項目の順序を決定するために呼び出されるコールバック関数です。

 - `itemDataA` - データ項目
 - `itemDataB` - データ項目

ソート関数の詳細は、
<code><a href="#options-sort">sort</a></code>を参照してください。

`sort`が設定されていない場合、
リストは現在利用可能なソート関数によって並び替えられます。

```javascript
$("ol.list").editableList('sort', function(dataA, dataB) {
    return dataA.index-dataB.index;
});
```

#### <a href="#methods-length" name="methods-length">length()</a>

<span class="method-return">型: Number</span>

リストの項目数を取得します。

```javascript
var length = $("ol.list").editableList('length');
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
