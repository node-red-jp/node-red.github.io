---
layout: docs-user-guide
toc: toc-user-guide.html
title: セキュリティ
slug: セキュリティ
redirect_from:
  - /docs/security
---

デフォルトのNode-REDエディタはセキュアではありません。
実行環境のIPアドレスとポートにアクセス可能な誰もがエディタにアクセスしてフローを変更することができます。

この方法は信頼できるネットワーク上で実行されている場合のみ適しています。

このセクションでは、Node-REDをセキュアにする方法を記載しています。
セキュリティは3つのパートに分けられます:

 - [HTTPSアクセスの有効化](#httpsアクセスの有効化)
 - [エディタおよび管理APIのセキュリティ](#エディタおよび管理apiのセキュリティ)
 - [HTTPノード、Node-RED Dashboardのセキュリティ](#http-node-security)

### HTTPSアクセスの有効化

To enable access to the Node-RED Editor over HTTPS, rather than the default HTTP,
you can use the `https` configuration option in your [settings file](settings-file).

The `https` option can be either a static set of configuration options, or, since
Node-RED 1.1.0, a function that returns the options.

The full set of options are [documented here](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options).

As a minimum, the options should include:

 - `key` - Private key in PEM format, provided as a `String` or `Buffer`
 - `cert` - Cert chain in PEM format, provided as a `String` or `Buffer`



<div class="doc-callout">
For a guide on how to generate certificates, you can follow <a href="https://it.knightnet.org.uk/kb/nr-qa/https-valid-certificates/">this guide</a>.
</div>

The default Node-RED settings file includes a commented out `https` section that
can be used to load the certificates from local files.

```
https: {
    key: require("fs").readFileSync('privkey.pem'),
    cert: require("fs").readFileSync('cert.pem')
},
```

*Since Node-RED 1.1.0*

If the `https` property is a function, it can be used to return the options object.
The function can optionally return a Promise that will resolve to the options object,
allowing it to complete asynchronously.

```
https: function() {
    return new Promise((resolve, reject) => {
        var key, cert;
        // Do some work to obtain valid certificates
        // ...
        resolve({
            key: key
            cert: ccert
        })
    });
}
```

#### Refreshing HTTPS certificates

*Since Node-RED 1.1.0*

It is possible to configure Node-RED to periodically refresh its HTTPS certificates
without having to restart Node-RED. To do this:

1. You *must* be using Node.js 11 or later
2. The `https` setting *must* be a Function that can be called to get the updated certificates
3. Set the `httpsRefreshInterval` to how often (in hours) Node-RED should call the `https` function
   to get updated details.

The `https` function should determine if the current certificates will expire within the next
`httpsRefreshInterval` period, and if so, generate a new set of certificates. If no update
is required, the function can return `undefined` or `null`.


### エディタおよび管理APIのセキュリティ

エディタおよび管理APIは以下の2種類の認証をサポートしています。:

 - 認証に基づくユーザ名/パスワード資格情報
 - TwitterやGitHubのようなOAuth/OpenIDプロバイダによる認証

#### ユーザ名/パスワードによる認証

エディタおよび管理APIでのユーザ認証を有効化するためには、
[設定ファイル](settings-file)の`adminAuth`プロパティのコメントアウトを解除します。

```javascript
adminAuth: {
    type: "credentials",
    users: [
        {
            username: "admin",
            password: "$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN.",
            permissions: "*"
        },
        {
            username: "george",
            password: "$2b$08$wuAqPiKJlVN27eF5qJp.RuQYuy6ZYONW7a/UWYxDTtwKFCdB8F19y",
            permissions: "read"
        }
    ]
}
```

`users`プロパティはユーザオブジェクトの配列です。
これを使うと複数のユーザーが異なるアクセス許可を持つような設定が可能です。

上述の設定例は2人のユーザを定義しています。
`admin`というユーザはエディタ内のすべてを実施できる権限を持ち、`password`というパスワードを持っています。
`george`というユーザは読み込み権限のみを与えられています。

パスワードは安全性を高めるためにbcryptアルゴリズムを使用してハッシュ化されていることに注意してください。

<div class="doc-callout">
<em>Note</em> : Node-REDの以前のリリースでは、
設定で <code>httpAdminAuth</code> を有効にするとエディタにHTTPベーシック認証を使用することができました。
この設定は非推奨であり、使用ですべきではありません。
</div>

#### パスワードのハッシュ値生成

If you are using Node-RED 1.1.0 or later, you can use the command:
```
node-red admin hash-pw
```

For older versions of Node-RED, you can either:

 - Install the separate [`node-red-admin` command-line tool](../node-red-admin) and use the command:

        node-red-admin hash-pw

 - Or, locate the directory Node-RED has been installed to and use the command:

        node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here


In all cases, you will get back the hashed version of your password which you can then
paste into your settings file.


#### OAuth/OpenIDによる認証

外部の認証機構を利用するため、Node-REDは[Passport](http://passportjs.org/)によって
提供される幅広い認証機構を利用することができます。

Node-REDの認証モジュールは、[Twitter](https://www.npmjs.com/package/node-red-auth-twitter)および
[GitHub](https://www.npmjs.com/package/node-red-auth-github)の両方を利用することができます。
両者は、簡単に利用できるように、認証機構に応じた細部がラップされています。
しかしながら、これらは同様の機構による認証の雛形としても利用することができます。

以下の例は、Node-REDが提供した認証モジュールを利用_せず_に
Twitterを利用した認証機能を設定する方法を示しています。

```javascript
adminAuth: {
    type:"strategy",
    strategy: {
        name: "twitter",
        label: 'Sign in with Twitter',
        icon:"fa-twitter",
        strategy: require("passport-twitter").Strategy,
        options: {
            consumerKey: TWITTER_APP_CONSUMER_KEY,
            consumerSecret: TWITTER_APP_CONSUMER_SECRET,
            callbackURL: "http://example.com/auth/strategy/callback",
            verify: function(token, tokenSecret, profile, done) {
                done(null, profile);
            }
        },
    },
    users: [
       { username: "knolleary",permissions: ["*"]}
    ]
};
```

`strategy`プロパティは以下の項目を設定します。:

 - `name` - Passportで利用されている認証方法の名称
 - `strategy` - Passportの認証モジュール
 - `label`/`icon` - ログインページで利用されます。`icon`はFontAwesomeのアイコン名です。
 - `options` - Passportのstrategyが生成されてたときに引き渡されるoptionsオブジェクトです。
   必要なものはstrategy自体のドキュメントを参照してください。
   `callbackURL`については以下を参照してください。
 - `verify` - この認証方法によって利用される検証処理を指定します。
   ユーザが正当な場合、ユーザプロフィールを第2引数として`done`を呼び出す必要があります。
   ユーザプロパティは、アクセスを許可されているユーザの一覧での確認に利用される`username`プロパティを保持させてください。
   Passportはユーザプロフィールオブジェクトを標準化しようとしており、
   そのためほとんどの認証方法でこのプロパティが提供されます。

strategyによって利用される`callbackURL`は、認証プロバイダが認証を試行したあとのリダイレクト先です。
これは`/auth/strategy/callback`を付け足したNode-REDのエディタのURLにしなくてはなりません。
例えば、エディタに`http://localhost:1880`というURLでアクセスする場合、
`http://localhost:1880/auth/strategy/callback`という値を設定します。


#### デフォルトユーザの設定

上記の設定例では
ログインしない限りエディタにアクセスできません。

しかし、ユーザがログインしなくても任意のアクセスレベルを提供したい場合もあります。
例えばエディタへの読み取り専用アクセス権の付与などです。
これを行うには、デフォルトユーザを設定するため、
`adminAuth`設定に`default`プロパティを以下のように追加します。

```javascript
adminAuth: {
    type: "credentials",
    users: [ /* list of users */ ],
    default: {
        permissions: "read"
    }
}
```

#### ユーザ権限

Node-RED 0.14以前では、ユーザーは以下の2つの権限のうち、いずれかを持つことができました。

 - `*` - フルアクセス
 - `read` - 読み取り専用

NodeRED 0.14以降は権限がより細かくなり、それをサポートするために
以前と同様に単一の文字列または複数の権限を含んだ配列をプロパティに指定することができます。

[Admin API](/docs/api/admin)の各メソッドは、アクセスするために必要な権限レベルが定義されています。
権限モデルはリソースに依存します。
例えば、現在のFlow設定を取得するためにはユーザは`flow.read`権限が必要になります。
しかし、フローを更新するためには`flows.write`権限が必要になります。



#### トークン有効期限

デフォルトでは、アクセストークンのデフォルトの有効期限は7日間です。
この期間を延長するためのトークンの更新は現在サポートされていません。

有効期限は設定ファイルの `adminAuth` の `sessionExpiryTime` プロパティを変更することでカスタマイズすることができます。
トークンの有効期間は秒単位で定義します。
例えば1日後にトークンの有効期限が切れるようにするには以下のように設定します。

```javascript
adminAuth: {
    sessionExpiryTime: 86400,
    ...
}
```

#### Admin APIへのアクセス

`adminAuth`プロパティの設定によるAdmin APIへのアクセスは、
[Admin APIドキュメント](/docs/api/admin/oauth)で説明しています。

### カスタムユーザ認証

設定ファイルにユーザ情報をハードコーディングせずにユーザー認証をおこなうことも可能です。
これを利用すれば、
既存の認証システムと統合することができます。

次の例ではカスタム認証コードを提供する外部モジュールを使用する方法を
示しています。


 - `<node-red>/user-authentication.js` を以下のように作成します。
 
```javascript
module.exports = {
   type: "credentials",
   users: function(username) {
       return new Promise(function(resolve) {
           // ここでユーザ名が許可されたユーザかどうかを
           // チェックする処理を行う
           if (valid) {
               // ユーザ名が存在すればユーザオブジェクトを返す。
               // 'username' と 'permissions' プロパティは必須です。
               var user = { username: "admin", permissions: "*" };
               resolve(user);
           } else {
               // ユーザ名が存在しない場合はnullを返す。
               resolve(null);
           }
       });
   },
   authenticate: function(username,password) {
       return new Promise(function(resolve) {
           // ここでユーザー名/パスワードの組み合わせを
           // チェックする処理を行う
           if (valid) {
               // ユーザー名/パスワードの組み合わせが有効な場合はユーザオブジェクトを返す。
               // users(username);を呼び出すのと同様です。
               var user = { username: "admin", permissions: "*" };
               resolve(user);
           } else {
               // ユーザー名/パスワードの組み合わせが無効な場合は
               // nullを返す。
               resolve(null);
           }
       });
   },
   default: function() {
       return new Promise(function(resolve) {
           // デフォルトユーザのユーザオブジェクトを返す。
           // デフォルトユーザが存在しない場合、nullを返す。
           resolve({anonymous: true, permissions:"read"});
       });
   }
}
```

 -  このモジュールをロードするため、setting.jsファイルの`adminAuth`プロパティを以下のように設定します。:

```javascript
adminAuth: require("./user-authentication")
```

#### Custom authentication tokens

*Since Node-RED 1.1.0*

In some circumstances you may need to use your own authentication tokens and not use
those generated by Node-RED. For example:

 - You want to use OAuth based user authentication, but you also require automated access
   to the admin API which cannot perform the interactive authentication steps OAuth requires
 - You want to integrate Node-RED into an existing system where the users will already be
   logged in and you don't want them to have to log in again when accessing the editor

The `adminAuth` setting can include a `tokens` function. This function will be called
if a request to the admin api does not contain an authentication token that Node-RED
recognises as one of its own. It is passed the token provided in the request and should
return a Promise that resolves with either the authenticated user, or `null` if the
token is not valid.

```
adminAuth: {
    ...
    tokens: function(token) {
        return new Promise(function(resolve, reject) {
            // Do whatever work is needed to check token is valid
            if (valid) {
                // Resolve with the user object. It must contain
                // properties 'username' and 'permissions'
                var user = { username: 'admin', permissions: '*' };
                resolve(user);
            } else {
                // Resolve with null as this user does not exist
                resolve(null);
            }
        });
    },
    ...
}
```

By default, it will use the `Authorization` http header and expect a `Bearer` type
token - passing in just the value of the token to the function. If it is not a
`Bearer` type token, then the full value of the `Authorization` header will be
passed to the function, containing both type and value.

To use a different HTTP header, the `tokenHeader` setting can be used to identify
which header to use:

```
adminAuth: {
    ...
    tokens: function(token) {
        ...
    },
    tokenHeader: "x-my-custom-token"
}
```

##### Accessing the editor with a custom token

To access the editor using a custom token without the login prompt, add `?access_token=<ACCESS_TOKEN>`
to the URL. The editor will store that token locally and use it for all future requests.


### HTTPノードのセキュリティ

HTTPノードによって公開されるルートはBasic認証を利用することで保護することができます。

`settings.js`ファイルの`httpNodeAuth`プロパティによって、
ルートへアクセスできる単一のユーザ名およびパスワードを設定することができます。

```javascript
httpNodeAuth: {user:"user",pass:"$2a$08$zZWtXTja0fB1pzD4sHCMyOCMYz2Z6dNbM6tl8sJogENOMcxWV9DN."},
```

`pass`プロパティは、`adminAuth`と同様の書式で利用することができます。詳細な情報は[パスワードのハッシュ値生成](#generating-the-password-hash)を参照してください。

`httpStatic`プロパティによって設定された静的コンテンツへのアクセスは、
`httpStaticAuth`プロパティを同様の書式で利用することにより保護できます。

<div class="doc-callout">
<em>Note</em> : 以前のNode-REDでは、<code>pass</code>プロパティは
MD5によるハッシュ値が利用されました。これは暗号論的に安全ではないため、
<code>adminAuth</code>で利用されているような、bcryptに変更されています。
後方互換性を確保するため、MD5ハッシュもサポートされていますが、推奨できません。
</div>

### Custom Middleware

It is possible to provide custom HTTP middleware that will be added in front of
all `HTTP In` nodes and, since Node-RED 1.1.0, in front of all admin/editor routes.

For the `HTTP In` nodes, the middleware is provided as the `httpNodeMiddleware` setting.

For the admin/editor routes, the middleware is provided as the `httpAdminMiddleware` setting.

For example, the following middleware could be used to set the `X-Frame-Options` http header
on all admin/editor requests. This can be used to control how the editor is embedded on
other pages.

```
httpAdminMiddleware: function(req, res, next) {
    // Set the X-Frame-Options header to limit where the editor
    // can be embedded
    res.set('X-Frame-Options', 'sameorigin');
    next();
},
```

Other possible uses would be to add additional layers of security or request verification
to the routes.
