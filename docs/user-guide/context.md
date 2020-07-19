---
layout: docs-user-guide
toc: toc-user-guide.html
title: コンテキストを利用する
slug: コンテキスト
---

<iframe width="560" height="315" src="https://www.youtube.com/embed/jLI0DcXMQOs" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>


### コンテキストとは？

Node-REDは、フローで受け渡すメッセージを利用せずに異なるノード間で共有する情報を保管する方法を提供しています。
これは「コンテキスト」と呼ばれます。

### コンテキストスコープ

特定のコンテキスト値の「スコープ」によって、誰と共有されるかが決定されます。
コンテキストスコープには3つのレベルが存在します。:

 - ノード - 値を設定したノードのみアクセスできます
 - フロー - 同じフロー（またはエディタのタブ）のすべてのノードがアクセスできます
 - グローバル - すべてのノードがアクセスできます

特定の値のスコープの選択は、その値がどのように利用されるかに依ります。

もし値が単一のノードからのアクセスだけで足りる場合、例えばFunctionノードなどの場合、
ノードコンテキストで充分です。

しばしば、コンテキストはある種の状態を複数のノード間で共有できるようにします。
例えば、センサーは定期的に1つのフローに値を送出しており、
最新の値を返却するために別のHTTPトリガーフローを作成したいかもしれません。
センサーの測定値をコンテキストに格納することで、HTTPフローが値を返却できるようになります。

設定ファイルの`functionGlobalContext`プロパティを利用することで、
グローバルコンテキストに事前に値を設定することができます。

<div class="doc-callout"><em>Note</em> : サブフロー内のノードにおいて<code>flow</code>コンテキストはこれらのノードで共有されますが、サブフローが存在するフローとは共有されません。
Node-RED 0.20版から、サブフロー内のノードはコンテキストキーの先頭に<code>$parent.</code>をつけることで、
親フローのコンテキストにアクセスすることができます。
例えば:
<pre>var colour = flow.get("$parent.colour");</pre></div>


### コンテキストに保管する

デフォルトでは、コンテキストはメモリのみに保存されます。
つまり、Node-REDを再起動するたびにコンテキストの内容はクリアされます。
0.19版リリースによって、コンテキストデータを保存するようにNode-REDを設定することが可能になり、再起動後も利用できるようになりました。

`setting.js`の`contextStorage`プロパティは、
コンテキストデータがどのように保管されるかを設定するために利用できます。

これについて、Node-REDは2つのビルトインモジュールを提供します: `memory`および`localfilesystem`。
また、他の場所にデータを保存するためのカスタムストアプラグインを作成することも可能です。

#### ファイルシステムにコンテキストデータを保存する

ファイルベースのストレージを使えるようにするため、以下のオプションを利用できます。:

```javascript
contextStorage: {
   default: {
       module: "localfilesystem"
   }
}
```

これによって、デフォルトのコンテキストストアが`localfilesystem`プラグインのインスタンスになり、すべての設定がデフォルトに設定されます。
つまり、:

 - `~/.node-red/context/`下のファイルにコンテキストデータを保管します。
 - 値をメモリにキャッシュし、
   30秒ごとにファイルシステムに値を書き出すだけです。

<div class="doc-callout"><em>Note</em> : Node-REDをインストールした時期によっては、
<code>settings.js</code>ファイルに<code>contextStorage</code>へのエントリ例が存在しないかもしれません。
この場合、上述の例をコピーして自身のファイルに追加してください。</div>

#### 複数のコンテキストストアを利用する

1つ以上のストアを設定することができ、
ある値はローカルファイルシステムに保存し、ある値はメモリに保存するだけとすることができます。

例えば、デフォルトのストアは内蔵メモリのみに、2つめのストアはファイルシステムに設定するには、
以下のオプションを利用することができます。:

```javascript
contextStorage: {
   default: "memoryOnly",
   memoryOnly: { module: 'memory' },
   file: { module: 'localfilesystem' }
}
```

この例において`default`プロパティは、
コンテキストにアクセスするリクエストがストアを指定しなかった場合にNode-REDがどのストアを利用するかを伝えています。

<div class="doc-callout"><em>Note</em> : 複数の<code>localfilesystem</code>ストアを設定することを選んだ場合、
データを保管する異なるディレクトリを使用するため、
それらの<code>dir</code>オプションを設定<em>しなくてはなりません</em>。
ストアの設定方法の詳細は<a href="/docs/api/context/store/localfilesystem#options">こちら</a>で確認することができます。</div>

どのような設定オプションが提供され、どのようにカスタムモジュールを作成するのかといったビルトインモジュールについてのすべての情報は、
[APIのページ](../api/context/)で確認することができます。

### フローでコンテキストを利用する

コンテキストに値を設定する最も簡単な方法は、Changeノードを使用することです。
例えば、以下のようなChangeノードのルールによって、
`msg.payload`の値を`flow`コンテキストに`myData`というキーで保管します。

<div style="text-align: center"><img src="/docs/user-guide/images/context_change.png" width="488px"></div>

様々なノードで直接コンテキストにアクセスすることができます。
例えば、Injectノードはコンテキスト値を注入するように設定することができ、
Switchノードはコンテキストに保管された値をもとにメッセージをルーティングすることができます。

複数のコンテキストストアを設定した場合、
UIは値を保管するストアを選択できるようにします。

<div style="text-align: center"><img src="/docs/user-guide/images/context_change_multiple_stores.png" width="471px"></div>


### Functionノードでコンテキストを利用する

[Functionノードの書き方ガイド](../writing-functions#storing-data)に、
Functionノードでのコンテキストの使い方が記述されています。

### カスタムノードでコンテキストを利用する

[ノードの開発ガイド](/docs/creating-nodes/context)にカスタムノードでのコンテキストの使い方が記述されています。

### ファイルストアからコンテキストを削除する

Changeノードに値の削除を設定することによってコンテキストを永久に削除することができます。

<div style="text-align: center"><img src="/docs/user-guide/images/context_delete.png" width="488px"></div>
