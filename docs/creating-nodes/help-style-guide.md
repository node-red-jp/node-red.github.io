---
layout: docs-creating-nodes
toc: toc-creating-nodes.html
title: ノードヘルプのスタイルガイド
slug: ヘルプ
---

ノードが選択されると、ヘルプテキストが情報タブに表示されます。
このヘルプは、ユーザがノードを利用するために必要となるすべての情報を提供するようにすべきです。

以下に示すスタイルガイドは、
多くのノードが統一された外観となるようにヘルプを構成する方法について説明しています。

*Since 2.1.0* : The help text can be provided as markdown rather than HTML. In this
case the `type` attribute of the `<script>` tag must be `text/markdown`.<br>
When creating markdown help text be careful with indentation, markdown is whitespace sensitive so all lines should have no leading whitespace inside the `<script>` tags.

<hr/>

<link href="/css/node-help.css" rel="stylesheet">

<div class="grid" style="min-height:auto; padding:5px 0 5px; border-bottom: 1px solid #f0f0f0;">
    <div class="col-1-2">
        このセクションはノードの概要を提供します。
        このセクションは2から3個以内の<code>&lt;p&gt;</code>で構成してください。
        最初の<code>&lt;p&gt;</code>はノードパレットでマウスをホバーした際にツールチップとして表示されます。
    </div>
    <div class="col-1-2 node-help" style="padding-right: 5px; background: #f9f9f9;">
        <p>Connects to a MQTT broker and publishes messages.</p>
    </div>
</div>
<div class="grid" style="min-height:auto; padding:5px 0 5px; border-bottom: 1px solid #f0f0f0;">
    <div class="col-1-2">
        ノードが入力をもつ場合、
        入力（Inputs）セクションではノードが使用するメッセージのプロパティについて説明します。
        また、各プロパティが期待する型についても記載します。
        ここでの説明は短くすべきであり、より詳細な内容がある場合は詳細セクションに記述します。
    </div>
    <div class="col-1-2 node-help" style="padding-right: 5px; background: #f9f9f9;">
        <h3>Inputs</h3>
           <dl class="message-properties">
              <dt>payload
                  <span class="property-type">string | buffer</span>
              </dt>
              <dd> the payload of the message to publish. </dd>
              <dt class="optional">topic <span class="property-type">string</span></dt>
              <dd> the MQTT topic to publish to.</dd>
         </dl>
     </div>
 </div>
 <div class="grid" style="min-height:auto; padding:5px 0 5px; border-bottom: 1px solid #f0f0f0;">
     <div class="col-1-2">
         ノードが出力をもつ場合、入力セクションと同様にノードが送出するメッセージのプロパティについて記載します。
         複数の出力がある場合、
         その内容をリストとして列挙し、それぞれの内容について記述します。
     </div>
     <div class="col-1-2 node-help" style="padding-right: 5px; background: #f9f9f9;">
         <h3>Outputs</h3>
             <ol class="node-ports">
                 <li>Standard output
                     <dl class="message-properties">
                         <dt>payload <span class="property-type">string</span></dt>
                         <dd>the standard output of the command.</dd>
                     </dl>
                 </li>
                 <li>Standard error
                     <dl class="message-properties">
                         <dt>payload <span class="property-type">string</span></dt>
                         <dd>the standard error of the command.</dd>
                     </dl>
                 </li>
             </ol>
      </div>
  </div>
 <div class="grid" style="min-height:auto; padding:5px 0 5px; border-bottom: 1px solid #f0f0f0;">
     <div class="col-1-2">
        <p>詳細（Details）セクションは、より詳細なノードの内容について記載します。
        ノードがどのように使われるべきか、入出力併せて記述するべきです。</p>
        <p></p>
     </div>
     <div class="col-1-2 node-help" style="padding-right: 5px; background: #f9f9f9;">
        <h3>Details</h3>
         <p><code>msg.payload</code> is used as the payload of the published message.
        If it contains an Object it will be converted to a JSON string before being sent.
        If it contains a binary Buffer the message will be published as-is.</p>
         <p>The topic used can be configured in the node or, if left blank, can be set by <code>msg.topic</code>.</p>
         <p>Likewise the QoS and retain values can be configured in the node or, if left
        blank, set by <code>msg.qos</code> and <code>msg.retain</code> respectively.</p>
    </div>
</div>
<div class="grid" style="min-height:auto; padding:5px 0 5px;">
    <div class="col-1-2">
       <p>参照（References）セクションは下記のような外部リンクなどを提供するために使用します。</p>
       <ul>
          <li>テンプレートノードがmustache記法へリンクする方法などのような
          何かしらの関連ドキュメント。</li>
          <li>ノードのgitリポジトリやnpmのページなどユーザが追加のヘルプを得られるようなもの。</li>
        </ul>

    </div>
    <div class="col-1-2 node-help" style="padding-right: 5px; background: #f9f9f9;">
       <h3>References</h3>
        <ul>
            <li><a>Twitter API docs</a> - full description of <code>msg.tweet</code> property</li>
            <li><a>GitHub</a> - the node's github repository</li>
        </ul>
   </div>
</div>


<hr/>

上記の例をHTMLで実装すると下記のようになります。

{:.code-tab-html}
```html
<script type="text/html" data-help-name="node-type">
<p>Connects to a MQTT broker and publishes messages.</p>

<h3>Inputs</h3>
    <dl class="message-properties">
        <dt>payload
            <span class="property-type">string | buffer</span>
        </dt>
        <dd> the payload of the message to publish. </dd>
        <dt class="optional">topic <span class="property-type">string</span></dt>
        <dd> the MQTT topic to publish to.</dd>
    </dl>

 <h3>Outputs</h3>
     <ol class="node-ports">
         <li>Standard output
             <dl class="message-properties">
                 <dt>payload <span class="property-type">string</span></dt>
                 <dd>the standard output of the command.</dd>
             </dl>
         </li>
         <li>Standard error
             <dl class="message-properties">
                 <dt>payload <span class="property-type">string</span></dt>
                 <dd>the standard error of the command.</dd>
             </dl>
         </li>
     </ol>

<h3>Details</h3>
    <p><code>msg.payload</code> is used as the payload of the published message.
    If it contains an Object it will be converted to a JSON string before being sent.
    If it contains a binary Buffer the message will be published as-is.</p>
    <p>The topic used can be configured in the node or, if left blank, can be set
    by <code>msg.topic</code>.</p>
    <p>Likewise the QoS and retain values can be configured in the node or, if left
    blank, set by <code>msg.qos</code> and <code>msg.retain</code> respectively.</p>

<h3>References</h3>
    <ul>
        <li><a>Twitter API docs</a> - full description of <code>msg.tweet</code> property</li>
        <li><a>GitHub</a> - the nodes github repository</li>
    </ul>
</script>
```

{:.code-tab-md}
```markdown
<script type="text/markdown" data-help-name="node-type">
Connects to a MQTT broker and publishes messages.

### Inputs

: payload (string | buffer) :  the payload of the message to publish.
: *topic* (string)          :  the MQTT topic to publish to.


### Outputs

1. Standard output
: payload (string) : the standard output of the command.

2. Standard error
: payload (string) : the standard error of the command.

### Details

`msg.payload` is used as the payload of the published message.
If it contains an Object it will be converted to a JSON string before being sent.
If it contains a binary Buffer the message will be published as-is.

The topic used can be configured in the node or, if left blank, can be set
`msg.topic`.

Likewise the QoS and retain values can be configured in the node or, if left
blank, set by `msg.qos` and `msg.retain` respectively.

### References

 - [Twitter API docs]() - full description of `msg.tweet` property
 - [GitHub]() - the nodes github repository
</script>
```

#### セクションヘッダ

各セクションは`<h3>`タグでマークアップします。
`Details`セクションにサブヘッダが必要な場合は、`<h4>`タグを使用します。

{:.code-tab-html}
```html
<h3>Inputs</h3>
...
<h3>Details</h3>
...
 <h4>A sub section</h4>
 ...
```

{:.code-tab-md}
```markdown
### Inputs
...
### Details
...
#### A sub section
...
```

#### メッセージのプロパティ

メッセージのプロパティは`<dl>`を使用してリストにします。
リストには`message-properties`をclass属性として指定します。

リスト内の各アイテムは`<dt>`と`<dd>`タグのペアで構成されるようにします。

それぞれの`<dt>`にはプロパティ名を記載し、
さらに任意で`<span class="property-type">`内にプロパティが期待する型について記載します。
プロパティが任意の場合は`<dt>`のclass属性に`optional`を指定します。

それぞれの`<dd>`にはプロパティの要約を記述します。

{:.code-tab-html}
```html
<dl class="message-properties">
    <dt>payload
        <span class="property-type">string | buffer</span>
    </dt>
    <dd> the payload of the message to publish. </dd>
    <dt class="optional">topic
        <span class="property-type">string</span>
    </dt>
    <dd> the MQTT topic to publish to.</dd>
</dl>
```

{:.code-tab-md}
```markdown
: payload (string | buffer) :  the payload of the message to publish.
: *topic* (string)          :  the MQTT topic to publish to.
```

#### 複数出力

ノードに複数の出力がある場合、
上記のようにそれぞれの出力がメッセージのプロパティのリストを持つよう記述します。
これらのリストは`<ol>`でラップされ、class属性に`node-ports`を指定します。

リスト内の各アイテムの構成は、
出力内容の簡単な説明を`<dl>`によるメッセージのプロパティのリストで表現します。

<b>注意</b>: ノードの出力がひとつの場合は、
このようなリストのラップは行わず単純に`<dl>`を使用します。

{:.code-tab-html}
```html
<ol class="node-ports">
    <li>Standard output
        <dl class="message-properties">
            <dt>payload <span class="property-type">string</span></dt>
            <dd>the standard output of the command.</dd>
        </dl>
    </li>
    <li>Standard error
        <dl class="message-properties">
            <dt>payload <span class="property-type">string</span></dt>
            <dd>the standard error of the command.</dd>
        </dl>
    </li>
</ol>
```

{:.code-tab-md}
```markdown
1. Standard output
: payload (string) : the standard output of the command.

2. Standard error
: payload (string) : the standard error of the command.
```


#### 全般的なガイダンス

上記のメッセージのプロパティ一覧をメッセージプロパティの外部から参照する場合、
利用者にそれを明確に伝えるため`msg.`を接頭辞として付けます。
これらは`<code>`タグにラップされるべきです。

{:.code-tab-html}
```html
The interesting part is in <code>msg.payload</code>.
```

{:.code-tab-md}
```markdown
The interesting part is in `msg.payload`.
```

ヘルプテキスト内では`<b>`、`<i>`のような他のタグでマークアップしないようにします。

ノードのヘルプテキストは利用者が経験豊富であったり、ノードに精通していたりすることを前提としてはいけません。
何よりもヘルプは利用者にとって役立つ必要があります。

<style>

.format-button {
    padding: 2px 8px;
    border: 1px solid #666;
    margin-right: 8px;
    background: #bbb;
}
.format-button.active {
    background: white;
    pointer-events: none;

}
.code-example-switcher pre {
    margin-top: 0;
}
</style>

<script>
$(function() {
    $(".code-tab-html").each(function() {
        let htmlBlock = $(this);
        let mdBlock = $(this).next(".code-tab-md").hide();
        htmlBlock.wrap("<div></div>");
        let container = htmlBlock.parent();
        mdBlock.appendTo(container);

        container.wrap('<div class="code-example-switcher"></div>');
        let toplevel = container.parent();
        let toolbar = $('<div></div>').prependTo(toplevel);

        let htmlButton = $('<a href="#" class="active format-button">HTML</a>').appendTo(toolbar).on("click", function(evt) {
            evt.preventDefault();
            mdBlock.hide();
            htmlBlock.show();
            htmlButton.addClass('active');
            mdButton.removeClass('active')
        });
        let mdButton = $('<a href="#" class="format-button">Markdown</a>').appendTo(toolbar).on("click", function(evt) {
            evt.preventDefault();
            mdBlock.show();
            htmlBlock.hide();
            htmlButton.removeClass('active');
            mdButton.addClass('active')
        });
    })
})
</script>
