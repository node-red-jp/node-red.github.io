---
layout: docs-api
toc: toc-api-context.html
title: Context Store API
slug: コンテキスト
---

**バージョン0.19の新機能**

コンテキストストアAPIは、
コンテキストデータをどこに格納するか設定する方法を提供します。

デフォルトでは、Node-REDは [Memoryストア](store/memory) のAPIを使用します。
また、[Fileストア](store/localfilesystem) も提供しています。

コンテキストストアをカスタマイズするには、[ストアモジュールAPI](#ストアモジュールAPI) を実装するモジュールを作成しなければなりません。

### 設定

settings.js内の `contextStorage` プロパティは、コンテキストストレージの設定に使用されます。

これはオブジェクトであり、1つ以上の名前を持ったコンテキストストア設定です。

{% highlight javascript %}
contextStorage: {
   default: {
       module:"memory",
       config: {
           customOption: 'value'
       }
   }
}
{% endhighlight %}

それぞれのコンテキストストア設定は、
`module` プロパティと `config` プロパティの2つで構成されます。

`module` プロパティは、使用するコンテキストストアプラグインを特定します。
これは、ビルトインモジュールの名前(現時点では `memory` または `localfilesystem` )であるか、または
`require` でロードされたモジュールであるべきです。

{% highlight javascript %}
contextStorage: {
   default: {
       module:"memory",
   },
   custom: {
       module:require("my-custom-store")
   }
}
{% endhighlight %}

`config` プロパティはオブジェクトであり、
カスタムオプションを提供するためのモジュールに渡されます。

### ストアモジュールAPI

カスタムプラグインのモジュールは、単一のコンストラクタ関数をexportしなければなりません。
この関数はプラグインの新しいインスタンスがrequiredされた時に呼び出されます。
そして、関数にはそのインスタンスの `config` プロパティの値が渡されます。
これは、ランタイムが同じストアプラグインの複数のインスタンスを保持することを許容することになり、それぞれに自身の設定を保持します。

{% highlight javascript %}

var ContextStore = function(config) {
    this.config = config;
}

ContextStore.prototype.open = function() { ... }


module.exports = function(config){
    return new ContextStore(config);
};

{% endhighlight %}


コンストラクタにより返されるオブジェクトは、
[こちら](methods/) に記載されているすべての関数を実装しなければなりません。
