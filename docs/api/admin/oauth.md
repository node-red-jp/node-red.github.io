---
layout: docs-api
title: 認証
title: 認証
slug:
  - url: "/docs/api/admin"
    label: "admin"
  - 認証

---
Node-REDのAdmin APIは`settings.js`ファイルの`adminAuth`プロパティによって保護できます。
[セキュリティ](/docs/user-guide/runtime/securing-node-red)では
このプロパティの設定方法について説明しています。

このプロパティが設定されていない場合、
Node-REDのAdmin APIは誰からでもネットーワークを介してアクセスできることになります。


### Step 0 - 認証方式の確認

`/auth/login`に対するHTTP GETメソッドで有効な認証方式が返されます。

<div class="doc-callout"><em>curlコマンドの例</em>:
<pre>curl http://localhost:1880/auth/login</pre>
</div>

現バージョンのこのAPIでは、2つの結果が想定されます。:

##### 有効な認証方式が存在しない場合

    {}

すべてのAPIリクエストが、
さらなる認証についての情報を提供していません。

##### 認証情報による認証がおこなわれた場合

{% highlight json %}
{
  "type": "credentials",
  "prompts": [
    {
      "id": "username",
      "type": "text",
      "label": "Username"
    },
    {
      "id": "password",
      "type": "password",
      "label": "Password"
    }
  ]
}
{% endhighlight %}

APIはアクセストークンによって保護されます。


### Step 1 - アクセストークンの取得

`/auth/token`に対するHTTP POSTメソッドはユーザの認証情報によって、
アクセストークンを取得するために利用されます。

以下のパラメータを提供しなくてはなりません。:

 - `client_id` - クライアントを特定します。現在は`node-red-admin`または`node-red-editor`を設定します。
 - `grant_type` - 必ず`password`にします。
 - `scope` - 必要な権限を空白区切りのリストにします。現在は`*`または`read`に設定しなくてはなりません。
 - `username` - 認証に用いるユーザ名
 - `password` - 認証に用いるパスワード

<div class="doc-callout"><em>curlコマンドの例</em>:
<pre>curl http://localhost:1880/auth/token --data 'client_id=node-red-admin&grant_type=password&scope=*&username=admin&password=password'</pre>
</div>

認証に成功した場合、レスポンスにはアクセストークンが含まれています。:

{% highlight json %}
{
  "access_token": "A_SECRET_TOKEN",
  "expires_in":604800,
  "token_type": "Bearer"
}
{% endhighlight %}

### Step 2 - アクセストークンの利用

その後のすべてのAPI呼び出しでは`Authorization`ヘッダに
取得したアクセストークン含めて提供します。

<div class="doc-callout"><em>curlコマンドの例</em>:
<pre>curl -H "Authorization: Bearer A_SECRET_TOKEN" http://localhost:1880/settings</pre>
</div>

### アクセストークンの削除

アクセストークンが不要になったときにトークンを削除するため、
HTTP POSTで`/auth/revoke`を送ります。:

<div class="doc-callout"><em>curlコマンドの例</em>:
<pre>curl --data 'token=A_SECRET_TOKEN' -H "Authorization: Bearer A_SECRET_TOKEN" http://localhost:1880/auth/revoke</pre>
</div>
