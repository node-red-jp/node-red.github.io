---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: 設定ノード
slug: 設定ノード
---

いくつかのノードは構成情報を共有する必要があります。
たとえばMQTT InおよびMQTT Outノードは、MQTTブローカーの構成を共有し、接続をプールすることができます。
設定ノードはデフォルトでグローバルにスコープされます。
つまり、フロー間で状態が共有されます。

### 設定ノードの定義

設定ノードは、他のノードと同じ方法で定義されます。
2つの重要な違いがあります:

1. `category`プロパティを`config`にセットします。
2. 編集テンプレート`<input>`要素は`node-config-input-<propertyname>`というID属性を持っています。

#### remote-server.html

{% highlight html %}
<script type="text/javascript">
    RED.nodes.registerType('remote-server',{
        category: 'config',
        defaults: {
            host: {value:"localhost",required:true},
            port: {value:1234,required:true,validate:RED.validators.number()},
        },
        label: function() {
            return this.host+":"+this.port;
        }
    });
</script>

<script type="text/html" data-template-name="remote-server">
    <div class="form-row">
        <label for="node-config-input-host"><i class="icon-bookmark"></i> Host</label>
        <input type="text" id="node-config-input-host">
    </div>
    <div class="form-row">
        <label for="node-config-input-port"><i class="icon-bookmark"></i> Port</label>
        <input type="text" id="node-config-input-port">
    </div>
</script>
{% endhighlight %}

#### remote-server.js

{% highlight javascript %}
module.exports = function(RED) {
    function RemoteServerNode(n) {
        RED.nodes.createNode(this,n);
        this.host = n.host;
        this.port = n.port;
    }
    RED.nodes.registerType("remote-server",RemoteServerNode);
}
{% endhighlight %}

この例では、ノードは構成の単純なコンテナとして機能します。
実際の実行動作はありません。

設定ノードの一般的な使い方は、リモートシステムへの共有接続を表すことです。
その場合、設定ノードは接続を作成し、
設定ノードを使用するノードが接続を利用できるようにすることもできます。
このような場合、設定ノードは、
ノードが停止したときに切断するという[`close`イベント](node-js#ノードを閉じる)も処理する必要があります。

### 設定ノードの使用

ノードは自身が利用する設定ノードを登録するには、
設定ノードのタイプを`type`属性に設定したプロパティを`defaults`配列に追加します。

{% highlight javascript %}
defaults: {
   server: {value:"", type:"remote-server"},
},
{% endhighlight %}

他のプロパティと同様に、
エディタは`node-input-<propertyname>`というID属性を持つ編集テンプレート内の`<input>`を探します。
他のプロパティとは異なり、エディタはこの`<input>`要素を`<select>`要素で置き換えます。
この要素には、設定ノードの利用可能なインスタンスが設定されており、
また設定ノードの編集ダイアログを開くためのボタンが存在します。

<div style="text-align: center">
    <img title="node config select" src="images/node_config_dialog.png" width="500px"/>
</div>


ノードはこのプロパティを使用して、ランタイム内の設定ノードにアクセスできます。

{% highlight javascript %}
module.exports = function(RED) {
    function MyNode(config) {
        RED.nodes.createNode(this,config);

        // Retrieve the config node
        this.server = RED.nodes.getNode(config.server);

        if (this.server) {
            // Do something with:
            //  this.server.host
            //  this.server.post
        } else {
            // No config node configured
        }
    }
    RED.nodes.registerType("my-node",MyNode);
}
{% endhighlight %}
