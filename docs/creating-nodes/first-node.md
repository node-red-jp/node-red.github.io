---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: はじめてのノード開発
slug: はじめてのノード
---

フローがデプロイされた時にノードは有効となり、フローが動作している間ノードはメッセージを送受信します。
そして、次のフローがデプロイされる前に、ノードは無効になります。

ノードは、2つのファイルから構成されています:
 - ノードの処理を定義したJavaScriptファイル
 - ノードプロパティ、編集画面、ヘルプを定義したhtmlファイル

ノードをnpmモジュールとしてパッケージ化する時は、これらのファイルをまとめるために `package.json` ファイルを用います。

 - [簡単なノードを開発](#簡単なノードを開発)
   - [package.json](#package-json)
   - [lower-case.js](#lower-casejs)
   - [lower-case.html](#lower-casehtml)
 - [Node-REDでノードの動作確認](#node-redでノードの動作確認)

### 簡単なノードを開発

この例では、受け取ったメッセージの文字列を全て小文字に変換するノードの開発方法について、
説明します。

自分自身の開発環境にNode.jsの現在のLTS版がインストールされていることを確認します。
これを書いた時点では10.xです。

まず開発用のディレクトリを作成してください。そのディレクトリの中で以下の名前のファイルを作成してください。

 - `package.json`
 - `lower-case.js`
 - `lower-case.html`

<h4 id="package-json"><i class="fa fa-file-o"></i> package.json</h4>

この`package.json`ファイルは、Node.jsモジュールの内容を記述するために標準的に使われるファイルです。

`package.json`ファイルを作成するには、`npm init`コマンドを用います。
このコマンドは、モジュール作成を手助けする質問を表示します。
モジュール名を訊かれた際は、
`node-red-contrib-example-lower-case`を入力してください。

`package.json`ファイルを作成した後は、以下の様に`node-red`セクションを追加します。

```json
{
    "name" : "node-red-contrib-example-lower-case",
    ...
    "node-red" : {
        "nodes": {
            "lower-case": "lower-case.js"
        }
    }
}
```

このセクションにより、どのノードファイルにプログラムが書かれているかを指定します。

ノードの命名規則やノードを公開する前に設定すべき他の項目など、
バッケージ化の詳しい情報については、
[パッケージングガイド](packaging) を参照してください.

**注意**: このノードは例であるため、npmへ公開***しない***ようにしてください。

<h4 id="lower-casejs"><i class="fa fa-file-o"></i> lower-case.js</h4>

```javascript
module.exports = function(RED) {
    function LowerCaseNode(config) {
        RED.nodes.createNode(this,config);
        var node = this;
        node.on('input', function(msg) {
            msg.payload = msg.payload.toLowerCase();
            node.send(msg);
        });
    }
    RED.nodes.registerType("lower-case",LowerCaseNode);
}
```

ノードはモジュールとしてラップされます。
モジュールは、Node-REDランタイムが起動時にノードを読み込むときに呼び出す関数をエクスポートします。
この関数は引数`RED`を指定して呼び出され、この引数はモジュールがNode-REDのランタイムAPIにアクセスできるようにしています。

ノード自身は、`LowerCaseNode`という関数として定義されています。
この関数は、ノードの新しいインスタンスが作成されるたびに呼び出されます。
この関数には、フローエディタで登録されたノード固有のプロパティを含むオブジェクトが渡されます。

この関数は全てのノードで共有する機能を初期化するため、さらに`RED.nodes.createNode`関数を呼び出します。
その後、ノード固有のコードが有効になります。

このインスタンス内でノードは`input`イベントをリスナーに登録しており、
このイベントはノードにメッセージが届くたびに呼び出されます。
このリスナーの中でペイロードの文字列を小文字に変換し、
その後フローへメッセージを渡すために`send`関数を呼び出しています。

最後に、`lower-case`というノード名を指定して
`LowerCaseNode`関数をランタイムへ登録しています。

ノードが外部モジュールの依存関係を持つ場合、
`package.json`ファイルの`dependencies`セクションにその依存モジュールを記述してください。

ノードのランタイム部分についての詳しい情報は、[こちら](node-js)を参照してください。

<h4 id="lower-casehtml"><i class="fa fa-file-o"></i> lower-case.html</h4>


```html
<script type="text/javascript">
    RED.nodes.registerType('lower-case',{
        category: 'function',
        color: '#a6bbcf',
        defaults: {
            name: {value:""}
        },
        inputs:1,
        outputs:1,
        icon: "file.png",
        label: function() {
            return this.name||"lower-case";
        }
    });
</script>

<script type="text/html" data-template-name="lower-case">
    <div class="form-row">
        <label for="node-input-name"><i class="fa fa-tag"></i> Name</label>
        <input type="text" id="node-input-name" placeholder="Name">
    </div>
</script>

<script type="text/html" data-help-name="lower-case">
    <p>A simple node that converts the message payloads into all lower-case characters</p>
</script>
```

ノードのHTMLファイルは、以下を含んでいます。

 - エディタに登録するノードの説明
 - ノードの編集テンプレート
 - ヘルプ

この例では、ノードは編集可能なプロパティとして`name`を持っています。
必須ではありませんが、 1つのフロー内に複数存在するノードインスタンスを区別するのを助けるため、
このプロパティは慣例的に広く使われています。

ノードのエディタ部分についての詳しい情報は、[こちら](node-html)を参照してください。

### Node-REDでノードの動作確認

上述の基本的なノードモジュールを作成したら、自分のNode-REDの実行環境にインストールすることができます。

ローカルでノードモジュールの動作を確認するには、[`npm install <folder>`](https://docs.npmjs.com/cli/install)コマンドを利用します。
これはローカルディレクトリでのノードの開発および開発段階でのローカルのNode-REDとのリンクを作成します。

ユーザディレクトリのNode-RED、一般的には`~/.node-red`において、以下のように実行します。:

    npm install <location of node module>

例えば、Mac OSやLinuxにおいてノードが`~/dev/node-red-contrib-example-lower-case`に存在する場合、次を実行します:

    cd ~/.node-red
    npm install ~/dev/node-red-contrib-example-lower-case

Windowsでは、次を実行します:

    cd C:\Users\my_name\.node_red
    npm install C:\Users\my_name\Documents\GitHub\node-red-contrib-example-lower-case

これは`~/.node-red/node_modules`にノードモジュールプロジェクトのディレクトリへのシンボリックリンクを作成し、Node-REDは起動時にそのノードを発見します。ノードのファイルの変更は、Node-REDの再起動によって反映されます。また、Windowsではnpm 5.xまたはそれ以上のバージョンで以下のように実行します。:

<div class="doc-callout">
<em>Note</em> :  <code>npm</code>は自動的にユーザディレクトリ内の<code>package.json</code>ファイルにエントリを追加します。
これを実施したくない場合、<code>npm install</code>コマンドで<code>--no-save</code>オプションを利用してください。
</div>

### ユニットテスト

ユニットテストを支援するため、[`node-red-node-test-helper`](https://www.npmjs.com/package/node-red-node-test-helper)と呼ばれるnpmモジュールを利用することができます。
このテスト支援モジュールはNode-RED実行環境に基づいて作成されたフレームワークで、ノードのテストをより簡単にしています。

このフレームワークを使うことで、テストフローを作成することができ、さらにノードの設定値と出力結果が期待通りに動作していることを確認できます。例えば、lower-caseノードにユニットテストを追加するため、`_spec.js`ファイルを含んだ`test`フォルを、自身のノードモジュールパッケージに追加しましょう。

<h4 id="lower-casespecjs"><i class="fa fa-file-o"></i> test/lower-case_spec.js</h4>

```javascript
var helper = require("node-red-node-test-helper");
var lowerNode = require("../lower-case.js");

describe('lower-case Node', function () {

  afterEach(function () {
    helper.unload();
  });

  it('should be loaded', function (done) {
    var flow = [{ id: "n1", type: "lower-case", name: "test name" }];
    helper.load(lowerNode, flow, function () {
      var n1 = helper.getNode("n1");
      n1.should.have.property('name', 'test name');
      done();
    });
  });

  it('should make payload lower case', function (done) {
    var flow = [{ id: "n1", type: "lower-case", name: "test name",wires:[["n2"]] },
    { id: "n2", type: "helper" }];
    helper.load(lowerNode, flow, function () {
      var n2 = helper.getNode("n2");
      var n1 = helper.getNode("n1");
      n2.on("input", function (msg) {
        msg.should.have.property('payload', 'uppercase');
        done();
      });
      n1.receive({ payload: "UpperCase" });
    });
  });
});
```

これらのテストではノードが実行環境に正しくロードされていること、そしてノードがpayloadの値を期待通りに小文字に変換していることをチェックしています。

どちらのテストも、helper.loadを利用してテスト対象ノードを実行環境にロードし、テストの実施・テストフローへの配置をおこないます。最初のテストでは、実行時のノードの名前プロパティが正しいことを確認しています。2番目のテストでは、支援ノードを利用してテスト対象ノードからの出力が実際に小文字にされていることを確認しています。

支援モジュールはNode-REDのコアノードから選びだしたユニットテスト例が含まれています。支援モジュールについてさらに知りたければ、関連したREADMEを参照してください。
