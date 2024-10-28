---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: パッケージング
slug: パッケージング
---

ノードはモジュールとしてパッケージ化し、npmリポジトリに公開することができます。
これにより、インストールするのに必要な依存関係と共にインストールが容易になります。

### 命名規則

**We [updated our naming requirements](/blog/2022/01/31/introducing-scorecard) on 31st January 2022. The following applies to modules first published after that date.**

Packages should use a [scoped name](https://docs.npmjs.com/cli/v8/using-npm/scope) - such as `@myScope/node-red-sample`. That can be under a user scope or an organisation scope.

Nodes published under a scoped name have no further requirements on their name.
They could use `@myScope/node-red-sample` or just `@myScope/sample` - although
having `node-red` in the name does help to associate the module with the project.

If you are forking an existing package to provide a fix, you can keep the same name but released under your own scope. But please keep in mind, forking should always be a last resort if the original maintainer is not responsive to your contributions.

### ディレクトリ構造

以下に、ノードパッケージの典型的なディレクトリ構造を示します:

```
├── LICENSE
├── README.md
├── package.json
└── sample
    ├── examples
    │   ├── example-1.json
    │   └── example-2.json
    ├── icons
    │   └── my-icon.svg
    ├── sample.html
    └── sample.js
```

パッケージ内で使用されるディレクトリ構造に厳密な要件はありません。
パッケージに複数のノードが含まれている場合、
それらすべてが同じディレクトリに存在させることもできますが、
それぞれを独自のサブディレクトリに配置することもできます。

### ノードモジュールをローカルでテストする

ノードモジュールをローカルでテストするには、[`npm install <folder>`](https://docs.npmjs.com/cli/install)コマンドを使うことができます。
これにより開発中において、ローカルディレクトリでノードを開発し、ローカルのNode-REDインストールにリンクさせることができます。

あなたのnode-redユーザディレクトリで、通常のように次のコマンドを実行します。

    npm install <ノードモジュールへのパス>

これにより、ディレクトリへ適切なシンボリックリンクが作成され、
Node-REDは起動時にノードを検出します。
Node-REDを再起動するだけで、ノードのファイルに対する変更を取得できます。

### package.json

`package.json`ファイルには通常のエントリと同様、
ランタイムにロードするノードを含む`.js`ファイルをリストアップした`node-red`エントリが含まれていなければなりません。

1つのファイルに複数のノードがある場合、ファイルを1回だけリストアップしなければなりません。

ノードが他のnpmモジュールの依存関係を持つ場合、
それらは`dependencies`プロパティに含まれていなければなりません。

npmリポジトリ内でノードを発見できるようにするため、
`keywords`プロパティに`node-red`を含める必要があります。
これにより、[キーワードで検索する](https://www.npmjs.org/browse/keyword/node-red)際にパッケージが確実に表示されます。

<div class="doc-callout"><em>Note</em>: ノードが安定して正しく動作し、
他の人がノードを利用できるように充分に文書化されるまで
`node-red`キーワードを追加しないでください。</div>

{% highlight json %}
{
    "name"         : "node-red-contrib-samplenode",
    "version"      : "0.0.1",
    "description"  : "A sample node for node-red",
    "dependencies": {
    },
    "keywords": [ "node-red" ],
    "node-red"     : {
        "nodes": {
            "sample": "sample/sample.js"
        }
    }
}
{% endhighlight %}

You should specify what versions of Node-RED your nodes support with a `version` entry. For example, the following means the node requires Node-RED 2.0 or later.

{% highlight json %}
"node-red"     : {
    "version": ">=2.0.0",
    "nodes": {
        "sample": "sample/sample.js"
    }
}
{% endhighlight %}


### README.md

README.mdファイルには、
ノードの機能およびそれを機能させるために必要な前提条件を列挙します。
ノードのhtmlファイルの*情報*タブ部分に含まれていない追加の指示や、
そのノードを使用している小さなサンプルフローを含めると
有意義かもしれません。

ファイルは、
[GitHub flavoured markdown](https://help.github.com/articles/markdown-basics/)を利用してマークアップすべきです。

### LICENSE

他の人が自分のコードで出来ることと出来ないことを知ることができるように、
ライセンスファイルを含めてください。

### npmに公開する

npmリポジトリにパッケージを公開するためのガイドが数多くあります。
[こちら](https://docs.npmjs.com/misc/developers)に基本的な概要があります。

### flows.nodered.orgに追加する

2020年4月時点で、[Node-REDフローライブラリ](https://flows.nodered.org)は
`node-red`というキーワード付きでnpmに公開されたノードを
自動的にインデックス化・更新することはもうできません。
代わりに、手動で送信リクエストを設定する必要があります。

このためには、パッケージング要件のすべてを満たしていることを確認してください。
新しいノードをライブラリに追加するためには、
[ライブラリページ](https://flows.nodered.org)の上部の`+`ボタンをクリックし、
「node」オプションを選択してください。
このボタンによって[ノード追加のページ](https://flows.nodered.org/add/node)へ移動します。
ここでは要件のリストが再度表示され、
ノードをライブラリに追加するステップが記述されています。

既存のノードを更新するには、
新規ノードを追加したときと同様に再度送信することも可能ですし、
フローライブラリ上のノードのページの「request refresh」リンクから更新することも可能です。
このリンクはログインしているユーザのみ表示されます。

表示されない場合、
[Node-REDフォーラム](https://discourse.nodered.org)または[slack](https://nodered.org/slack)で
助けを求めることができます。
