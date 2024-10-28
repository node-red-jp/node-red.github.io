---
layout: docs-user-guide
toc: toc-user-guide.html
title: 環境変数を利用する
slug: 環境変数
---

### ノードのプロパティとして設定する

`${ENV_VAR}`という形式の文字列を値として設定することで、ノードのプロパティに環境変数を設定することができます。
ランタイムがフローを読み込んだとき、
ノードに文字列が渡される前に環境変数の値が代わりに使われます。

これはプロパティがまるごと置換できる場合のみ動作します - 値の一部だけに代入することはできません。
例えば、`CLIENT-${HOST}`を使うことは*できません*。

ノードはそれぞれの編集ダイアログを提供しているため、
全てのプロパティが環境変数の文字列を入力できるようなテキスト入力欄を提供しているわけではありません。
この場合、プロパティを設定するためにフローファイルを直に編集することを考えることができるかもしれません。


### TypedInputウィジェットとして利用する

<div style="width: 222px" class="figure align-right">
  <img src="editor/images/editor-typedInput-envvar-expanded.png" alt="TypedInput Environment Variable">
  <p class="caption">TypedInput環境変数型</p>
</div>


エディタ内で、TypedInputウィジェットは型として「環境変数」を提供することができます。
この型が選択されたとき、この値は以下のように評価されます。

 - `${}`が存在しない場合、値全体を環境変数名として利用します。
   例えば、
   `"FOO"`は`process.env.FOO`の値に置換されます。


 - `${}`が存在する場合、評価結果には対応する環境変数が代用されます:
   例えば、
   `"Hello ${FOO}"`という値で環境変数`FOO`に`World`が設定されている場合、
   この結果は`"Hello World"`という値になります。



### JSONata式

ChangeノードのようなノードからJSONana式の中で`$env`関数を利用することによって、
環境変数にアクセスすることができます。

```javascript
$env('ENV_VAR')
```

### Functionノード

Functionノード内で、
環境変数は`env.get`関数を利用することによってアクセスすることができます:

```javascript
let foo = env.get("FOO");
```

### Templateノード

*[Node-RED 3.0](https://nodered.org/blog/2022/07/14/version-3-0-released#environment-variables-in-the-template-node)以降*

`template`ノードは以下のシンタックスを利用することで環境変数にアクセスすることができます:
```
{% raw %}My favourite colour is {{env.COLOUR}}.{% endraw %}
```

### サブフローインスタンスプロパティ

0.20版以降、サブフローはインスタンスプロパティを設定できます。
これらは環境変数としてサブフロー内に表示され、
サブフローの個々のインスタンスにあわせてカスタマイズすることができます。

例えば、異なる種類のレコードへのアクセスを提供するREST APIがあり、
環境変数を利用してアクセスする必要があるレコードの種類を識別し、
サブフローはそのAPIにアクセスしてレスポンスを処理するように作成することができます。
そして、サブフローの個々のインスタンスをそれらの特定の種類にあわせてカスタマイズすることができます。



### フロー/グループレベルの環境変数

*[Node-RED 2.1](https://nodered.org/blog/2021/10/21/version-2-1-released#flowgroup-level-environment-variables)以降*

フローまたはグループレベルの環境変数を設定することができます。フローまたはグループの編集ダイアログの適切なタブで実行できます。

### Global environment variables

*Since [Node-RED 3.1](/blog/2023/09/06/version-3-1-released#global-environment-variables)*

Environment variables can be set at a global level within the editor. This is done in the User Settings dialog.


### ネストされた環境変数にアクセスする

サブフローで環境変数にアクセスするとき、
Node-REDはサブフローのプロパティを検索してから
サブフローが属しているフロー（サブフロー自体であることもあります）を検索します。

場合によっては、「ローカル」の値を参照せず、
「親」レベルの環境変数にアクセスするほうが有用なことがあります。
変数名の前に`$parent.`をつけることで実現できます。


### サービスとして実行する

提供されている[スクリプト](https://nodered.org/docs/getting-started/raspberrypi)を理いようシてインストールされ、Node-REDをサービスとして実行されているとき、呼び出しプロセスだけに定義されている環境変数にアクセスすることはできません。この場合、環境変数は設定ファイルに以下のように追加することで定義できます: 

```
process.env.FOO='World';
```

`module.exports`のセクションの外側に配置してください。もしくは、変数を`systemd`サービスの一部として以下のような形式の宣言として、

```
ENV_VAR='foobar'
```
Node-REDユーザディレクトリ`~/.node-red`内の`environment`という名称のファイル内に配置することで定義できます。


### ビルトイン環境変数

*Node-RED 2.2以降*

Node-REDはノード、フロー、グループに関する情報を公開するために環境変数を定義しています。

この情報は、[ワークスペース](/docs/user-guide/editor/workspace)内のノードの「配置」を助けます。ワークスペース内のノードは[フロー](/docs/user-guide/editor/workspace/flows)の一部として存在しています。同じようにノードは（ない場合もあります）[グループ](/docs/user-guide/editor/workspace/groups)の一部かもしれません。ノード、フロー、グループは、Node-REDが生成したそれぞれ一意となるIDが与えられています。

ノード、フロー、グループはすべて`name`プロパティをサポートしており、これは[プロパティを編集する](/docs/user-guide/editor/workspace/nodes#editing-node-properties)ときに変更することができます。

以下の環境変数は指定されたノードの情報にアクセスするために利用することができます:

- `NR_NODE_ID` - ノードのID
- `NR_NODE_NAME` - ノードの名前
- `NR_NODE_PATH` - ノードのパス。これはフローでのノードの位置を示します。`/`はフロー、サブフロー、ノードのIDを区切ります。
- `NR_GROUP_ID` - 所属しているグループのID
- `NR_GROUP_NAME` - 所属しているグループの名前
- `NR_FLOW_ID` - ノードが存在するフローのID
- `NR_FLOW_NAME` - ノードが存在するフローの名前
- `NR_SUBFLOW_NAME` - the Name of the containing subflow instance node (*since Node-RED 3.1*)
- `NR_SUBFLOW_ID` - the ID of the containing subflow instance node (*since Node-RED 3.1*)
- `NR_SUBFLOW_PATH` - the Path of the containing subflow instance node (*since Node-RED 3.1*)


Node-REDによって生成されたIDは一意であることが保証されていますが、名前はそうではないことに注意してください。ノード、フロー、グループが与えられた名前を持っていない場合、対応する環境変数は空の文字列となります。ノードがグループの一部ではない場合、そのグループID環境変数も空文字列となります。


