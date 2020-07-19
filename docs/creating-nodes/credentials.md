---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: クレデンシャル
slug: クレデンシャル
---

ノードは、多数のプロパティを`credentials`として定義することができます。
これらは、メインフローファイルとは別に保存され、
フローがエディタからエクスポートされたときには含まれないプロパティです。

資格情報をノードに追加するには、次の手順を実行します:

1. 新しい`credentials`エントリをノードに定義します:

        credentials: {
            username: {type:"text"},
            password: {type:"password"}
        },

   エントリには１つのオプションがあります。
   `type`は`text`か`password`です。

2. ノードの編集テンプレートに適切なエントリを追加します

        <div class="form-row">
            <label for="node-input-username"><i class="icon-tag"></i> Username</label>
            <input type="text" id="node-input-username">
        </div>
        <div class="form-row">
            <label for="node-input-password"><i class="icon-tag"></i> Password</label>
            <input type="password" id="node-input-password">
        </div>

    テンプレートは、
    通常のノードのプロパティと同様の要素`id`規則に従うことに注意してください。

3. ノードの`.js`ファイルで、
   `RED.nodes.registerType`への呼び出しに資格情報を含むように変更しなければなりません:

        RED.nodes.registerType("my-node",MyNode,{
            credentials: {
                username: {type:"text"},
                password: {type:"password"}
            }
        });

### 資格情報へのアクセス

#### 実行環境での資格情報の利用

ランタイムの中で、
ノードは`credentials`プロパティを使ってその資格情報にアクセスできます:

{% highlight javascript %}
function MyNode(config) {
    RED.nodes.createNode(this,config);
    var username = this.credentials.username;
    var password = this.credentials.password;
}
{% endhighlight %}

#### エディタ内の資格情報

エディタ内で、ノードは資格情報へのアクセスを制限されています。
実行環境と同じように、`text`型の資格情報は`credentials`プロパティの下で利用することができます。
しかし、`password`型の資格情報は利用できません。
代わりに、資格情報に非blank値が割り当てられているかどうかを示すために、
`has_<property-name>`というbool値プロパティが存在します。

{% highlight javascript %}
oneditprepare: function() {
    // this.credentials.username is set to the appropriate value
    // this.credentials.password is not set
    // this.credentials.has_password indicates if the property is present in the runtime
    ...
}
{% endhighlight %}

### 高度な資格情報の利用

ここまでで概説した資格情報システムでほとんどの場合十分ですが、
状況によってはユーザが提供する値だけではなく、
さらに多くの資格情報の値を格納する必要があります。

例えば、ノードがOAuthワークフローをサポートするためには、
ユーザが見ることのないサーバ割当のトークンを保持しなければなりません。
Twitterノードは、これをどのように達成できるかという良い例となります。
