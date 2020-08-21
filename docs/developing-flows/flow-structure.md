---
layout: docs-developing-flows
toc: toc-developing-flows.html
title: フローの構造
slug: フローの構造
---

Node-REDを初めて使う時は、おそらくエディタ内の同じタブに全てのノードを追加することから始めるでしょう。
他のユーザが共有したフローの例を読み込んだり、様々なものをテストするためにプロトタイプのフローを構築したりすることもあります。

時が経つにつれて、これがノードやワイヤーの混在を引き起こし、フローの特定部分を探すことが困難になります。

開発プロジェクトを始める時に、フローをどの様に構造化するかについて検討しておくと、フローが整理されている状態を維持することを助け、保守も容易になります。

Node-REDでフローを整理する主な方法は、エディタ内で複数のタブにフローを分けることです。
それを行うために用いることができるいくつかの異なる戦略があります。

もし、アプリケーションが分離された構成要素を特定できる場合は、これらを分離された各タブに配置することを検討してください。

ホームオートションのアプリケーションの場合は、物理スペースを反映するために、各部屋のフローロジックを分離されたタブに配置します。
もしくは、全ての照明に関するフローを一つのタブに配置し、暖房装置に関するフローを他のもう1つのタブに配置する様に、機能に基づいてフローを分離することもできます。

もし、HTTP APIのバックエンドを構築している場合は、各タブはAPIが接続する分離されたリソースのタイプを表すこともあります。

この目標は、個別のフローの初めから最後まで「読む」ことを容易にすることです。
単一のタブに配置することは、これを手助けします。

他に考慮すべきことは、同一のNode-REDアプリケーション上で、他の開発者と共同作業をしているかどうかです。
この場合は、開発者がそれぞれのタブを使用すると、変更のマージが容易となります。
異なる役割や専門分野がある開発者がいる場合は、それがフローの構成にどの様に影響するか検討してください。


### 再利用できるフローの作成

フローを作成する時に、複数の場所で再利用したいと思う共通部分を見つけることがあります。
フローをメンテナンスするすことが難しくなるため、これら共通部分のコピーがフロー内に複数作成させることは避ける様にしてください。
修正をする時に変更箇所が複数となり、見落とす可能性があります。

Node-REDでは、再利用できるフローを作成する2つの異なる方法を提供しています。それは、リンクノードとサブフローです。

<div style="width: 300px" class="figure align-right">
  <img src="images/link-nodes.png" alt="Link nodes">
  <p class="caption">Link nodes</p>
</div>

**リンクノード** によって、エディタのタブ間をジャンプできるフローを作成できます。
フローの終了点から別のフローの開始点までの仮想的なワイヤーを追加できます。

<div style="clear:both"></div>

<div style="width: 300px" class="figure align-right">
  <img src="images/subflow.png" alt="Subflows">
  <p class="caption">Subflows</p>
</div>

**サブフロー** によって、フローとして作成した内部実装を持つ新しいノードをパレットに作成できます。
作成後は、通常のノードと同じ場所にサブフローの新規インスタンスを追加できるようになります。



これら2つのアプローチの間には、いくつかの重要な違いがあります。
リンクノードは、メッセージがリンクを介して渡されるフローの中では使うことができません。
リンクノードは、フローの開始点と終了点のみ使うことができます。
また、リンクノードは1つ以上の他のリンクノードと接続することもできます。
これによって、メッセージを他の複数のフローへ渡したり、複数のフローが一つのフローにメッセージを渡したりできる様になります。
それらを単一タブで用いる
右から左へ向かうワイヤーが沢山存在することをなくし、ワークスペース上でフローがまとまることを助けます。

Subflows appear as regular nodes so can be used at any point in a flow. However each instance of the subflow is independent of the others. Any flow context inside the subflow will be scoped to the individual instances. If the subflow creates a connection to a remote system, each instance will create its own connection.

### Customising subflows

When creating subflows, you may want to be able to customise their behaviour in some way. For example, changing what MQTT topic it publishes to.

One pattern for doing that is by setting `msg.topic` on every message passed to the subflow. But that requires adding a Change node ange node in front of every subflow instance in order to set the desired value.

An easier way for doing this is by using Subflow properties. These are properties that can be set on the subflow instance and appear as environment variables inside the subflow.

In the MQTT example, you could first configure the node to publish to `${MY_TOPIC}`.

<div class="figure">
  <img src="images/mqtt-envvar.png" alt="MQTT topic set by environment variables">
  <p class="caption">MQTT topic set by environment variables</p>
</div>

<div style="width: 400px" class="figure align-right">
  <img src="images/subflow-envvar.png" alt="Adding a subflow property">
  <p class="caption">Adding a subflow property</p>
</div>

Then add `MY_TOPIC` as a subflow property.

<div style="clear:both"></div>

When a user edits an individual instance they can then provide a custom value for `MY_TOPIC` for that instance.


<div class="figure">
  <img src="images/subflow-instance-envvar.png" alt="Customising a subflow instance property">
  <p class="caption">Customising a subflow instance property</p>

</div>


This pattern can be applied to any node configuration field that lets you enter the value directly. It doesn’t currently work for fields that are exposed as checkboxes or other custom UI elements.

### Managing state information

Another consideration is how to manage any state information in your flows. For example, keeping a count of how many messages pass through a flow, or the current state of an external sensor.

Node-RED provides the Context system for managing state within the runtime. The context can be scoped to the same tab, subflow or made available globally.

If a piece of state information is only needed by nodes on a particular tab, you should use flow-scoped rather than global. You should also choose context variable names with care - make sure they are descriptive and easy to identify.

Another option is to manage the state outside of Node-RED - such as using retained MQTT messages, or a database of some sort. Those options do add an external dependency to manage and aren’t as conveniently integrated as Context, but they can also be used alongside context and not as a complete replacement. For example, where you want to share the state information across multiple Node-RED instances, or in the case of MQTT, be able to trigger a flow whenever a value changes.


### Customising flows for different platforms

Environment variables can be used more widely within Node-RED to create flows that can be customised for different platforms without having to make manual changes.

For example, you may have a flow that you plan to run on multiple devices, but each device should subscribe to its own unique MQTT topic.

As with the subflow example above, you could configure the MQTT node to publish to ${MY_TOPIC} and then set that as an environment variable before running Node-RED. That allows those device-specific customisations to be maintained separately to the flows that should be common to all devices.

The same approach can be used when the flows might run on different operating systems - where the path to a file used by the flows may be different depending on the OS.

The Inject and Change nodes are able to access environment variables using either the "env" option in their TypedInput. The Function node can use the `env.get()` function.

### Error handling

Node-RED provides the Catch and Status nodes as ways of building flows that can respond to errors. For more information about how they can be used, refer to the [user guide](/docs/user-guide/handling-errors).

As there is no direct visual association between a Catch node and the nodes it targets, you should consider how to position them in order to keep the flows readable.

Placing them close to the parts of the flow they correspond to can help, but you should take care not cause your flows to become overcrowded.

Another approach is to group all of the error handling flows below the main flow - making the 'good' path clearly distinct from the error paths.

Giving your Catch nodes a clear name is also very important to help easily identify the scenarios they are intended to handle.

Which ever approach you choose, try to be consistent across your different flows.

