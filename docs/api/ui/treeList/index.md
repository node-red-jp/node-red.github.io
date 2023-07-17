---
layout: docs-api
toc: toc-api-ui.html
title: TreeListウィジェット
slug:
  - url: "/docs/api/ui"
    label: "uiウィジェット"
  - 'treelist'
---

__0.20.0版から__

ツリー構造のデータを表示するためのリストです。これは0.20.0版で追加され、非常に最小限の機能を持っています。

- [Options](#options)
- [Methods](#methods)
- [Events](#events)

<div class="widget">
    <div style="clear:both">
        <div class="col-1-2">
            <h3>オプション</h3>
            <table>
                <tr><td><a href="#options-data">data</a></td></tr>
            </table>
        </div>
        <div class="col-1-2">
            <h3>メソッド</h3>
            <table>
                <tr><td><a href="#methods-data">data</a></td></tr>
                <tr><td><a href="#methods-empty">empty</a></td></tr>
                <tr><td><a href="#methods-show">show</a></td></tr>
            </table>
        </div>
    </div>
    <div style="clear:both">
        <div class="col-1-2">
            <h3>イベント</h3>
            <table>
                <tr><td><a href="#events-treelistselect">treelistselect</a></td></tr>
                <tr><td><a href="#events-treelistmouseout">treelistmouseout</a></td></tr>
                <tr><td><a href="#events-treelistmouseover">treelistmouseover</a></td></tr>
            </table>
        </div>
        <div class="col-1-2">
            <h3>型</h3>
        </div>
    </div>
</div>


### オプション

#### <a href="#options-data" name="options-data">data</a>

<span class="method-return">型: Array</span>

ツリーリストの初期データです。

このツリーは項目の配列として表示されます。
これらはツリー構造内で最上位項目となります。
各項目は`children`プロパティを持ち、項目の子要素を識別しています。

```javascript
[
    {
        label: 'Local',
        icon: 'fa fa-rocket',
        children: [
            { label: "child 1"},
            { label: "child 2"}
        ]
    }
]
```

各項目は以下のプロパティを持つことができます。:

プロパティ   | 説明
-----------|--------------------------
`label`    | 項目のラベル
`id`       | (オプション) 項目のユニークな識別子
`class`    | (オプション) 項目に適用するCSSのクラス
`icon`     | (オプション) アイコンとして適用するCSSのクラス、例としては`"fa fa-rocket"`
`checkbox` | (optional) If set, displays a checkbox next to the item.
`radio`    | (optional) *since 2.1* If set, and `checkbox` not set, displays a radio box next to the item. The value should be a string used to group the radio buttons.
`selected` | (オプション) 設定されている場合、項目の横にチェックボックスを表示します。その状態はこのプロパティのブール値が設定されます。
`children` | (オプション) この項目の子要素を特定します。子要素がすぐに分かる場合、配列として提供され、そうでない場合、非同期に子要素を取得できる関数として提供されます。詳細は以下を参照してください。
`expanded` | (オプション) この項目が子要素を持つ場合、子要素を表示するかどうかを設定します
`deferBuild` | (optional) Delay building any UI elements for the item's children until it is expanded for the first time. This can have a significant performance benefit for large data sets.
`element` | (optional) Custom DOM element to be used in place of the node's label. This is ignored if `label` is set.

`children`プロパティが関数として提供された場合、
この関数はコールバック関数の唯一の引数を受け取る必要があります。
このコールバック関数は子要素の配列によって呼び出される必要があります。
これにより、HTTPリクエストなどを利用して項目を非同期的に取得することができます。

```javascript
children: function(done) {
    $.getJSON('/some/url', function(result) {
        done(result);
    })
}
```

After the item has been added to the treeList, it is augmented with some additional properties
and functions:

Property      | Description
--------------|--------------------------
`item.parent` | The parent item in the tree
`item.depth`  | The depth in the tree, with `0` being the root of the tree
`item.treeList.container` | The DOM element containing the item
`item.treeList.label`     | The DOM element containing the label

Function         | Description
-----------------|---------------------------
`item.treeList.remove(detach)` | Remove the item from the tree. Set `detach` to `true` to preserve any event handlers on the item - required if the item is going to be readded elsewhere.
`item.treeList.makeLeaf(detachChildElements)` | Turns an element with children into a leaf node, removing the UI decoration. Set `detachChildElements` to `true` to preserve any child element event handlers.
`item.treeList.makeParent(children)` | Make the item a parent item, adding the child items
`item.treeList.insertChildAt(item, pos, select)` | Adds a new item at the desired position, optionally selecting it after doing so
`item.treeList.addChild(item, select)` | Appends a child item, optionally selecting it after doing so
`item.treeList.expand(done)` | Expand the item to show child items, with optional `done` callback that is called when complete
`item.treeList.collapse()` | Collapse the item to hide its children
`item.treeList.sortChildren(sortFunction)` | Sort the item's children using the provided sort function. The sort function should match the compareFunction used with [`Array.sort()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)
`item.treeList.replaceElement(element)` | Replace the item's custom DOM element

### メソッド

<a name="methods-data"></a>

#### <a href="#methods-data-get" name="methods-data">data()</a>

表示しているツリーリストのデータを返します。

項目に`selected`プロパティが設定されている場合、
その値は現在のチェックボックスの状態を反映します。

#### <a href="#methods-data-set" name="methods-data">data( items )</a>

リストに表示するデータを設定します。

`item`引数の詳細については[`data`オプション](#options-data)を参照してください。

```javascript
$(".input").treeList('data',[{label:"Colours"}]);
```

#### <a href="#methods-empty" name="methods-empty">empty()</a>

リストからすべての項目を削除します。

```javascript
$(".input").treeList('empty');
```

#### <a href="#methods-show" name="methods-show">show( itemId )</a>

リストに項目が表示されるようにします。
引数`itemId`はリスト内の項目の`id`プロパティと対応しなければなりません。

*Note:* 現在、これはリスト内の最上位の項目だけに作用します。
ツリーのトップレベル以下の項目を表示するために利用することはできません。

```javascript
$(".input").treeList('show','my-red-item');
```

### イベント

#### <a href="#events-treelistselect" name="events-treelistselect">treelistselect( event, item )</a>

項目がクリックされたとき、呼び出されます。
項目が`selected`プロパティがもともと設定されていた場合、その値は項目のチェックボックスの状態を反映するように更新されます。

```javascript
$(".input").on('treelistselect', function(event, item) {
    if (item.selected) {
        // The checkbox is checked
    } else {
        // The checkbox is not checked
    }
} );
```

#### <a href="#events-treelistmouseout" name="events-treelistmouseout">treelistmouseout( event, item )</a>

マウスが項目外に移動したとき、呼び出されます。

```javascript
$(".input").on('treelistmouseout', function(event, item) { });
```

#### <a href="#events-treelistmouseover" name="events-treelistmouseover">treelistmouseover( event, item )</a>

マウスが項目の上に移動したとき、呼び出されます。

```javascript
$(".input").on('treelistmouseover', function(event, item) { });
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
