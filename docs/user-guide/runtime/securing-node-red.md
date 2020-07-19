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
セキュリティは2つのパートに分けられます。

 - [エディタおよび管理APIのセキュリティ](#エディタおよび管理apiのセキュリティ)
 - [HTTPノード、Node-RED Dashboardのセキュリティ](#http-node-security)

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

##### パスワードのハッシュ値生成

適したパスワードのハッシュ値を生成するためには、`node-red-admin`ツールを利用することができます。
ツールのインストール手順は[こちら](../node-red-admin)で確認できます。

    node-red-admin hash-pw

ツールは、あなたが使いたいパスワードの入力を求め、ハッシュ値を出力します。
その値を設定ファイルにコピーしてください。

Node-REDインストールディレクトリ内で次のコマンドを実行することで
パスワードハッシュ値を生成することができます。

    node -e "console.log(require('bcryptjs').hashSync(process.argv[1], 8));" your-password-here

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
