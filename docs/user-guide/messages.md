---
layout: docs-user-guide
toc: toc-user-guide.html
title: メッセージを利用する
slug: メッセージ
---


ノード間でメッセージを受け渡すことによってNode-REDのフローは機能します。
メッセージは、プロパティセットを持つことができる単純なJavaScriptオブジェクトです。

<iframe width="560" height="315" src="https://www.youtube.com/embed/z-mwVUBhcL4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

メッセージは通常`payload`プロパティを持っています。 - 
これはほとんどのノードが利用するデフォルトのプロパティです。

Node-REDは`_msgid`と呼ばれるプロパティも追加します。- 
これはフローの進行状況を辿ることに利用できるメッセージの識別子です。

~~~~~json
{
    "_msgid": "12345",
    "payload": "..."
}
~~~~~

プロパティの値には次のようなJavaScriptの型が有効です。:

 - Boolean - `true`, `false`
 - Number - 例 `0`, `123.4`
 - String - `"hello"`
 - Array - `[1,2,3,4]`
 - Object - `{ "a": 1, "b": 2}`
 - Null

[JavaScriptの型に関する詳細情報](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Data_structures)



### メッセージの構造を理解する

メッセージの構造を理解する最も簡単な方法は、
Debugノードにメッセージを渡し、デバッグサイドバーでそれを確認することです。

デフォルトでは、Debugノードは`msg.payload`プロパティを表示しますが、
任意のプロパティまたはメッセージ全体を表示するように設定することができます。

配列またはオブジェクトを表示するとき、
サイドバーはメッセージの探索がしやすい構造化されたビューを提供します。

<img style="float: right; margin-left: 20px;" src="/docs/user-guide/images/messages_debug.png" width="388px">

 - 上部には渡されたプロパティ名が表示されます。
   ここでは、デフォルトの`msg.payload`が利用されています。
 - プロパティ名の次はプロパティの型です。 - 
   `Object`、`String`、`Array`などです。
 - そして、プロパティの内容が表示されています。
   配列とオブジェクトの場合、プロパティは1行にまとめられます。
   クリックすることで、プロパティは展開されて詳細を表示します。

<br style="clear: both;" />

要素にマウスを重ねると、右側にボタンの一覧が現れます。

<img style="float: right; margin-left: 20px;" src="/docs/user-guide/images/messages_debug_detail.png" width="388px">

- <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;" class="fa fa-terminal"></i> : 選択した要素へのパスをクリップボードにコピーします。
  この例では、`payload.Phone[2].type`をコピーします。
  これによってChangeノードまたはFunctionノード内で、
  プロパティへのアクセスする方法をすぐに特定することができます。

- <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;"  class="fa fa-clipboard"></i> : 要素の値をJSON文字列としてクリップボードへコピーします。
  サイドバーでは一定の長さを越えた配列およびバッファが切り捨てられていることに注意してください。
  このようなプロパティの値をコピーすると、
  切り捨てられた状態でコピーがおこなわれます。

- <i style="border-radius: 2px; display:inline-block;text-align:center; width: 30px; color: #777; border: 1px solid #777; padding: 6px;"  class="fa fa-map-pin"></i> : 選択された要素をピン留めし、いつでも参照できるようにします。
  同じDebugノードから他のメッセージを受信したとき、
  すべてのピン留めされた要素が自動的に展開されて表示されます。


#### JSONを利用する

JSON（[JavaScript Object Notation](http://json.org)）は
JavaScriptオブジェクトを文字列で表現する標準的な手法です。
これはWeb APIでデータを返すために一般的に利用されています。

メッセージプロパティがJSON文字列を含む場合、
メッセージプロパティが持つプロパティにアクセスする前に、まず同値のJavaScriptオブジェクトにパースしなければなりません。
プロパティに文字列とオブジェクトのどちらが含まれるかを判定するには、
Debugノードを利用することができます。

Node-REDは、この変換をおこなうために`JSON`ノードを提供しています。

### メッセージプロパティを変更する

フローの一般的なタスクは、メッセージをノード間で受け渡す際にメッセージのプロパティを変更することです。
例えば、`HTTP Request`の結果は多くのプロパティをもつオブジェクトですが、
そのうちのいくつかだけが必要です。

メッセージの変更には主に2つのノード、
FunctionノードおよびChangeノードがあります。

<iframe width="560" height="315" src="https://www.youtube.com/embed/zaBmfhxEOH8" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

Functionノードはメッセージに対して任意のJavaScriptコードを実行できるようにします。
このノードによって、メッセージの処理に関して完全な柔軟性が得られますが、
JavaScriptに精通している必要があり、多くの単純な処理の場合には不必要です。
Functionノードの書き方について、さらに多くの情報は[こちら](../writing-functions)で確認できます。

ChangeノードはJavaScriptコードを書く必要なく、多くの機能を提供します。
メッセージプロパティを変更できるだけでなく、
フローコンテキストまたはグローバルコンテキストにアクセスすることも可能です。

このノードは4つの基本的な操作を提供します。:

 - プロパティへの`値の代入`
 - 検索と置換による文字列型のプロパティの`値の置換`
 - `値の削除`
 - `値の移動`


 <img style="float: right; margin-left: 20px;" src="/docs/user-guide/images/messages_change.png" width="420px">

`値の代入`操作では、まず設定したいプロパティがどれなのかを決定し、そして保持させたい値を決定します。
この値は文字列や数値のようなハードコーディングされた値、
または他のメッセージまたはフロー/グローバルコンテキストのプロパティを利用することも可能です。
さらに、
新しい値を算出するために[JSONata](http://jsonata.org)式言語の利用もサポートされています。

例えば、Debugノードの機能を利用してメッセージプロパティのパスを特定し、
このパスを「対象の値（to）」フィールドに、リストから選択した`msg.`のあとに続くようにそのまま貼り付けることができます。
これによって、`msg.payload.Phone[2].type`の値が`msg.payload`に代入されます。

<br style="clear: both;" />

他の例としては、[JSONata](http://jsonata.org)式を利用し、
`msg.payload.temperature`に保持されている気温を華氏から摂氏に変換し、
その結果を`msg.payload.temperature_c`という新しいメッセージプロパティに保管することができます。

<img src="/docs/user-guide/images/messages_expr.png" style="float: left; margin-right: 20px; margin-top: 20px;" width="420px">

`````json
{
    "payload": {
        "temperature": 90,
        "temperature_c": 32.22222
    }
}
`````
{:style="display: inline-block;"}
<br style="clear: both;" />
*JSONata式は非常にJavaScriptと似通っていますが、いくつか重要な違いがあることに注意してください。
詳細については[jsonata.org](http://jsonata.org)サイトを参照してください。*

### メッセージシーケンス

メッセージシーケンスは、何らかの方法で関連している順序付けられた一連のメッセージです。
例えば、
Splitノードは`payload`が配列となっている単一のメッセージを、
各メッセージが配列の要素の1つに対応した`payload`を持つようなメッセージシーケンスに変換します。

<iframe width="560" height="315" src="https://www.youtube.com/embed/c6qXLko0n48" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### `msg.parts`を理解する

メッセージシーケンスの各メッセージは`msg.parts`と呼ばれるプロパティを持っています。
これは、メッセージがどのようにシーケンスに収まっているかという情報を含むオブジェクトです。
次のようなプロパティがあります。:

<dl>
<dt><code>msg.parts.id</code></dt><dd>シーケンスの一意な識別子</dd>
<dt><code>msg.parts.index</code></dt><dd>シーケンス内のメッセージの位置</dd>
<dt><code>msg.parts.count</code></dt><dd>わかっている場合、シーケンス内のメッセージの総数</dd>
</dl>

*Note:* このparts配列にはシーケンスに関する追加のメタデータが含まれている可能性があります。
例えば、`Split`ノードでは`Join`ノードによってシーケンスを再構成するために利用できる情報も追加します。
詳しくは`Split`ノードのドキュメントを参照してください。
{:.doc-callout}

#### シーケンスを利用する

Coreノードの多くでメッセージシーケンスを利用することができます。

##### Split

単一のメッセージをメッセージのシーケンスに変換します。

ノードの正確な挙動は、`msg.payload`に含まれる型に依存します。:

<dl>
<dt>String/Buffer</dt><dd>特定の文字（デフォルト: `\n`）、バッファシーケンスまたは固定長によって
メッセージを切り分けます。</dd>
<dt>Array</dt><dd>メッセージを個々の配列要素または固定長の配列に切り分けます。</dd>
<dt>Object</dt><dd>メッセージはオブジェクトの各キー/バリューのペアとして送出されます。</dd>
</dl>

##### Join

メッセージのシーケンスを単一のメッセージ変換します。

このノードは3種類の操作を提供します。:
<dl>
<dt>自動</dt><dd>前の<code>Split</code>ノードの操作を元に戻そうとします。</dd>
<dt>手動</dt><dd>どのようにシーケンスを結合するか細かく操作できるようになります。</dd>
<dt>列の集約</dt><dd><i>0.18版で追加</i> - シーケンスの各メッセージに対してJSONata式を実行し、
単一のメッセージを生成するように集約された結果を得ることができます。</dd>
</dl>

##### Sort

*0.18版で追加*

プロパティの値またはJSONata式の結果に基づいてシーケンスを並べ替えます。

##### Batch

*0.18版で追加*

受信したメッセージから新しいメッセージシーケンスを作成します。

このノードは3種類の操作を提供します。:
<dl>
<dt>メッセージ数でグループ化</dt><dd>指定した長さのシーケンスにメッセージをグループ化します。
オーバーラップオプションは、シーケンスの終わりのメッセージが
次のシーケンスの始めにいくつ繰り返されるかを指定します。
</dd>
<dt>時間間隔でグループ化</dt><dd>指定した時間間隔内に届いたメッセージをグループ化します。
時間間隔以内にメッセージが1つも到着しなかった場合、
ノードはオプションで空のメッセージを送出することができます。</dd>
<dt>列の結合</dt><dd>入力シーケンスを連結してメッセージシーケンスを生成します。
各シーケンスには、識別するための<code>msg.topic</code>プロパティが必要です。
このノードは連結されている順序付けシーケンスを特定するため、
topicの値のリストが設定されています。</dd>
</dl>
