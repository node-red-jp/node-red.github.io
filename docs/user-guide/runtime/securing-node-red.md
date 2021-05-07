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

Node-RED エディタへ、デフォルトのHTTPではなくHTTPSを介したアクセスを有効にするには、[設定ファイル](settings-file) 中の `https` 設定オプションを使います。

`https` オプションは、静的な設定オプションと、Node-RED 1.1.0以降ではオプションを返す関数のどちらかを使うことができます。

完全な設定オプションは [こちらに書かれています](https://nodejs.org/api/tls.html#tls_tls_createsecurecontext_options) 。

最低限、以下のオプションを含む必要があります:

 - `key` - `String` もしくは `Buffer` で指定したPEMフォーマットの秘密鍵
 - `cert` - `String` もしくは `Buffer` で指定したPEMフォーマットの証明書チェイン



<div class="doc-callout">
証明書の生成方法は、 <a href="https://it.knightnet.org.uk/kb/nr-qa/https-valid-certificates/">このガイド</a> を参照してください。
</div>

Node-REDの設定ファイルのデフォルトでは、 `https` セクションにはローカルのファイルから証明書を読み込む設定がコメントアウトされた状態で含まれています。

```
https: {
    key: require("fs").readFileSync('privkey.pem'),
    cert: require("fs").readFileSync('cert.pem')
},
```

*Node-RED 1.1.0以降*

`https` プロパティが関数の場合、関数は設定オブジェクトを返すために使用できます。
この関数は、オプションで、設定オブジェクトとして解決されるPromiseを返すことができ、非同期で完了することができます。

```
https: function() {
    return new Promise((resolve, reject) => {
        var key, cert;
        // 有効な証明書を取得するためのいくつかの作業
        // ...
        resolve({
            key: key
            cert: ccert
        })
    });
}
```

#### HTTPS 証明書の更新

*Node-RED 1.1.0以降*

Node-REDを再起動せずに、HTTPS証明書を定期的に更新するようにNode-REDを構成することができます。設定するためには: 

1. *必ず* Node.js 11かそれ以降でないといけません
2. `https` 設定は *必ず* 呼び出されたら更新された証明書を返す関数でないといけません
3. Node-REDが `https` 関数で更新された情報をどのくらい頻繁に(時指定)取得するかを、 `httpsRefreshInterval` で設定します

`https` 関数は、現在の証明書が次の `httpsRefreshInterval` 期間内に期限切れになるかどうかを判断し、新しい証明書のセットを生成する必要があります。
更新する必要がない場合、関数は `undefined`または` null`を返します。

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

Node-RED 1.1.0 かそれ以降を使っている場合、以下のコマンドを使うことができます:
```
node-red admin hash-pw
```

それより古いバージョンのNode-RED を使っている場合、以下のどちらかが使えます:

 - 独立した [`node-red-admin` コマンドラインツール](../node-red-admin) をインストールし、以下のコマンドを使う:

        node-red-admin hash-pw

 - もしくは、Node-REDがインストールされているディレクトリを指定して、以下のコマンドを使う:

        node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here

どのやり方を使う場合でも、ハッシュ化されたバージョンのパスワードが返りますので、それを設定ファイルに貼り付けます。


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
}
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

#### カスタム認証トークン

*Node-RED 1.1.0以降*

いくつかの状況では、Node-REDによって生成されたものではなく、独自の認証トークンを使用したい場合があります。例えば:

 - OAuthベースのユーザー認証を使用したいが、管理API(OAuthが必要とするインタラクティブな認証手順を実行できない)への自動アクセスも必要な場合
 - ユーザーがすでにログインしている既存のシステムにNode-REDが統合され、エディターにアクセスするときにユーザーが再度ログインする必要がないようにしたい

`adminAuth`設定には` tokens`関数を含めることができます。この関数は、管理APIへのリクエストに、Node-REDが独自の認証トークンとして認識する認証トークンが含まれていない場合に呼び出されます。
関数へは、リクエストで提供されたトークンが渡され、認証されたユーザーで解決されるPromiseを返すか、トークンが有効でない場合は「null」を返す必要があります。

```
adminAuth: {
    ...
    tokens: function(token) {
        return new Promise(function(resolve, reject) {
            // トークンが有効であることを確認するために必要な作業を行う
            if (valid) {
                // user オブジェクトを返します
                // 'username' と 'permissions' プロパティを含む必要があります
                var user = { username: 'admin', permissions: '*' };
                resolve(user);
            } else {
                // このユーザーは存在しないため、nullを返します
                resolve(null);
            }
        });
    },
    ...
}
```

デフォルトでは、 `Authorization` httpヘッダーを使用し、` Bearer`タイプのトークンを期待します-トークンの値だけを関数に渡します。
`Bearer`タイプのトークンでない場合は、` Authorization`ヘッダーの完全な値が関数に渡されます。これにはタイプと値の両方が含まれます。

別のHTTPヘッダーを使用するには、 `tokenHeader` 設定を使用して、使用するヘッダーを指定します:

```
adminAuth: {
    ...
    tokens: function(token) {
        ...
    },
    tokenHeader: "x-my-custom-token"
}
```

##### カスタムトークンを使ってエディタにアクセス

ログインプロンプトなしでカスタムトークンを使用してエディターにアクセスするには、URLに `?access_token = <ACCESS_TOKEN>` を追加します。
エディタはそのトークンをローカルに保存し、今後のすべてのリクエストに使用します。


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

### カスタムミドルウエア

`HTTP In` ノードにおいては全て、admin/エディタのルートにおいてはNode-RED 1.1.0以降から、前面にカスタムHTTPミドルウェアを追加できます。

##### http-in ノード向けのカスタムミドルウエア

`HTTP In` ノードに対しては、`httpNodeMiddleware` 設定でミドルウエアを提供できます。

以下の設定は、http-in ノードのHTTPアクセスレートを制限する例です。

```javascript
// 事前に `~/.node-red/` ディレクトリにて `npm install express-rate-limit` コマンドを実行します。
var rateLimit = require("express-rate-limit");
module.exports = {
    httpNodeMiddleware: rateLimit({
        windowMs: 1000, // ウィンドウ時間として、1000ミリ秒を設定します。
        max: 10 // アクセスレートを10リクエスト/秒に制限します。
    })
}
```

この設定を用いることで、Node-REDプロセスは、http-inノードで始まるフローが処理に時間がかかる場合でも、メモリが枯渇する問題を回避できます。
制限に達すると、本エンドポイントは 「Too many requests, please try again later.」というデフォルトのメッセージを返します。

##### Admin API向けのカスタムミドルウエア

admin/エディタのルートに対しては、`httpAdminMiddleware`設定でミドルウエアを提供できます。

例えば、以下のミドルウエアは、全てのadmin/エディタへのリクエストに対して、`X-Frame-Options` HTTPヘッダを設定するために使われます。
この方法を用いて、エディタを他のページに埋め込むことを制御できます。

```javascript
httpAdminMiddleware: function(req, res, next) {
    // エディタを埋め込む場所を制限するため、X-Frame-Optionsヘッダを設定します。
    res.set('X-Frame-Options', 'sameorigin');
    next();
},
```

その他の考えられるミドルウエアの利用方法は、セキュリティーのレイヤーを追加したり、ルートの検証要求などが挙げられます。
