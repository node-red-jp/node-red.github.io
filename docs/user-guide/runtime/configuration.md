---
layout: docs-user-guide
toc: toc-user-guide.html
title: 設定
slug: 設定
redirect_from:
  - /docs/configuration
  - /docs/user-guide/configuration
---
Node-REDを設定するために以下のプロパティが利用できます。

一般的なアプリケーションとして実行するとき、設定ファイルから設定をロードします。
設定ファイルについてのさらなる情報そしてそれがどこにあるのかについては、[このガイド](settings-file)を読んでください。

[組込みアプリケーション]として実行するとき、を設定オプションは`RED.init()`という呼び出し関数に渡されます。
しかしこの場合の実行時には、特定のプロパティは無視され、
組込みアプリケーションの実装に依存します。

### Node-RED実行時の設定

flowFile
: フロー設定をファイルに保存する場合のファイル名です。デフォルト: `flows_<hostname>.json`

userDir
: フロー設定、資格情報ファイルおよびすべてのライブラリデータなどすべてのユーザデータを保存するためのディレクトリのパスです。
  デフォルト: `$HOME/.node-red`

nodesDir
: 自作のノードなど、追加でイントールしたノードを探索するディレクトリのパス。Node-REDは*userDir*ディレクトリ以下の`nodes`ディレクトリを探索します。
  このプロパティはNode-REDのインストール機構以外からインストールされたノードなどのため、Node-REDが探索をおこなう追加のディレクトリを指定します。
  ここで指定したディレクトリ内にノードの`.js`と`.html`ファイルを配置するとNode-REDのパレットに表示されるようになります。Node-REDの外部のパスも指定できます。
  デフォルト: `$HOME/.node-red/nodes`

uiHost
: 接続を待機するホストインタフェースです。デフォルト: `0.0.0.0` -
  *全てのIPv4インタフェース*.

  *スタンドアローンのみ*.

uiPort
: エディタUIを提供するために利用するポート番号です。デフォルト: `1880`.

  *スタンドアローンのみ*.

httpAdminRoot
: エディタUIのためのルートURLです。`false`が設定されている場合、すべての管理エンドポイントが無効になります。
  これにはAPIエンドポイントとエディタUIの両方が含まれます。エディタUIのみを無効にするためには、以下の`disableEditor`プロパティを参照してください。デフォルト: `/`

httpAdminAuth
: *非推奨*: `adminAuth`を参照してください。

  エディタUIのHTTPベーシック認証を有効にします。:

      httpAdminAuth: {user:"nol", pass:"5f4dcc3b5aa765d61d8327deb882cf99"}

  `pass`プロパティは実際のパスワードのmd5ハッシュ値を指定します。上記の例では実際にBasic認証ダイアログへ入力するパスワードは`password`という文字列になります。以下のコマンドを実行することによってハッシュ値が得られます。:

      node -e "console.log(require('crypto').createHash('md5').update('YOUR PASSWORD HERE','utf8').digest('hex'))"

  *スタンドアローンのみ*.

httpAdminMiddleware
: an HTTP middleware function, or array of functions, that is added to all admin routes.
  The format of the middleware function is documented [here](http://expressjs.com/guide/using-middleware.html#middleware.application).

      httpAdminMiddleware: function(req,res,next) {
          // Perform any processing on the request.
          // Be sure to call next() if the request should be passed on
      }

httpNodeRoot
: HTTP InノードのHTTPエンドポイントのルートURLを指定できます。`false`が設定されている場合、すべてのノードのHTTPエンドポイントは無効になります。デフォルト: `/`

httpNodeAuth
: HTTP InノードのHTTPエンドポイントにBasic認証を設けます。書式は`httpAdminAuth`を参照してください。

httpRoot
: 管理およびノードのエンドポイントの両方のルートURLを設定します。`httpRoot`を指定すると`httpAdminRoot`と`httpNodeRoot`を同じパスで上書きします。

https
: [こちら](http://nodejs.org/api/https.html#https_https_createserver_options_requestlistener)で定義されている
  指定されたoptionsオブジェクトでHTTPSを有効にします。

  *スタンドアローンのみ*.

disableEditor
: `true`を指定するとフローエディタが無効になります。`httpAdminRoot`を`false`にした場合はUIもAPIも無効になりますが、こちらはUIのみ無効になります。デフォルト: `false`

httpStatic
: 静的ウェブコンテンツの提供元となるローカルディレクトリのパスです。
  コンテンツはトップレベルURL、つまり`/`から提供されます。例えば`/home/username/.node-red/`と指定した場合、`/home/username/.node-red/index.html`を作成すると`/`へアクセスすると作成した`index.html`が表示されます。
  `httpStatic`を指定する場合、`/`ではないパスでエディタUIを利用できるようにするため、`httpAdminRoot`は`/`より下層のパスにする必要があります。

  *スタンドアローンのみ*.

httpStaticAuth
: 静的コンテンツにBasic認証を設けます。書式は`httpAdminAuth`を参照してください。

httpNodeCors
: HTTP InノードのHTTPエンドポイントのCross-Origin Resource Sharing (CORS) を有効にします。
  詳細は[こちら](https://github.com/troygoode/node-cors#configuration-options)。

httpNodeMiddleware

: HTTP InノードのHTTPエンドポイントにHTTPミドルウェア機能、またはその機能の配列を追加できます。これにより、認証などノードに必要なカスタム処理がすべて可能になります。
  ミドルウェア機能の形式は[こちら](http://expressjs.com/guide/using-middleware.html#middleware.application)で文書化されています。
  HTTPエンドポイントでセッションとクッキーのハンドラを利用したい場合は以下のように設定します。

      httpNodeMiddleware: function(req,res,next) {
          // Perform any processing on the request.
          // Be sure to call next() if the request should be passed
          // to the relevant HTTP In node.
      }

logging
:  現在コンソールログのみがサポートされています。以下のオプションでロギングの様々なレベルを指定することができます。

 - **fatal** - アプリケーションが使用できなくなるような致命的エラーのみを記録
 - **error** - 特定のリクエストで致命的と判定されるエラー + fatalを記録
 - **warn** - 致命的でない問題の警告 + error + fatalを記録
 - **info** - アプリケーションの一般的な実行に関する情報 + warn + error + fatalを記録
 - **debug** - infoより詳細な情報 + info + warn + error + fatalを記録
 - **trace** - 非常に詳細な情報 + debug + info + warn + error + fatalを記録

デフォルトのレベルは `info` です。限られたフラッシュストレージの組込みデバイスではディスクへの書き込みを最小限にするために `fatal` を設定することもできます。

externalModules
: Configure how the runtime will handle external npm modules. This covers:
     - whether the editor will allow new node modules to be installed
     - whether nodes, such as the Function node are allowed to have their own dynamically configured dependencies.

  The allow/denyList options can be used to limit what modules the runtime
  will install/load. It can use `*` as a wildcard that matches anything.

      externalModules: {
         autoInstall: false,
         autoInstallRetry: 30,
         palette: {
            allowInstall: true,
            allowUpload: true,
            allowList: [],
            denyList: []
         },
         modules: {
            allowInstall: true,
            allowList: [],
            denyList: []
         }
      }

### フローエディタの設定

adminAuth
: エディタと管理APIにユーザレベルセキュリティを有効化することができます。
  詳細な情報は[Node-REDをセキュアにする](securing-node-red)を確認してください。

paletteCategories
: フローエディタのパレットのカテゴリの順序を設定します。
  カテゴリがリストにない場合はパレットの最後に追加されます。
  設定されていない場合、以下のデフォルトの順序が利用されます。

      ['subflows', 'common', 'function', 'network', 'sequence', 'parser', 'storage'],

   _Note_: サブフローを作成するまでサブフローカテゴリは空のままで、
   パレットには表示されません。

### エディタテーマ

エディタのテーマは次の設定オブジェクトを使用して変更することができます。すべての項目はオプションです。

    editorTheme: {
        page: {
            title: "Node-RED",
            favicon: "/absolute/path/to/theme/icon",
            css: "/absolute/path/to/custom/css/file",
            scripts: [ "/absolute/path/to/custom/script/file", "/another/script/file"]
        },
        header: {
            title: "Node-RED",
            image: "/absolute/path/to/header/image", // or null to remove image
            url: "http://nodered.org" // optional url to make the header text/image a link to this url
        },
        deployButton: {
            type:"simple",
            label:"Save",
            icon: "/absolute/path/to/deploy/button/image" // or null to remove image
        },
        menu: { // Hide unwanted menu items by id. see packages/node_modules/@node-red/editor-client/src/js/red.js:loadEditor for complete list
            "menu-item-import-library": false,
            "menu-item-export-library": false,
            "menu-item-keyboard-shortcuts": false,
            "menu-item-help": {
                label: "Alternative Help Link Text",
                url: "http://example.com"
            }
        },
        tours: false, // disable the Welcome Tour for new users
        userMenu: false, // Hide the user-menu even if adminAuth is enabled
        login: {
            image: "/absolute/path/to/login/page/big/image" // a 256x256 image
        },
        logout: {
            redirect: "http://example.com"
        },
        palette: {
            editable: true, // *Deprecated* - use externalModules.palette.allowInstall instead
            catalogues: [   // Alternative palette manager catalogues
                'https://catalogue.nodered.org/catalogue.json'
            ],
            theme: [ // Override node colours - rules test against category/type by RegExp.
                { category: ".*", type: ".*", color: "#f0f" }
            ]
        },
        projects: {
            enabled: false // Enable the projects feature
        },
        theme: "", // Select a color theme for the editor. See https://github.com/node-red-contrib-themes/theme-collection for a collection of themes to choose from
        codeEditor: {
            lib: "ace", // Select the text editor component used by the editor. Defaults to "ace", but can be set to "ace" or "monaco"
            options: {
                // The following only apply if the editor is set to "monaco"
                theme: "vs", // Select a color theme for the text editor component. Must match the file name of a theme in packages/node_modules/@node-red/editor-client/src/vendor/monaco/dist/theme
            }
        }
    },

### ダッシュボード

ui
: Node-RED-DashboardアドオンNodeのホームパスを指定できます。
これは**httpNodeRoot**の相対パスとなります。

    ui : { path: "mydashboard" },

### Nodeの設定

独自のNode Typeはファイルで提供される独自の設定を定義することができます。

functionGlobalContext
: Functionノード - グローバルファンクションコンテキストに加えるオブジェクトの一覧です。
  例えば、

      functionGlobalContext: { osModule:require('os') }

  Functionノード内で以下のようにアクセスすることができます:
  
      var myos = global.get('osModule');

 <div class="doc-callout"><em>Note</em> : Node-RED v0.13以前のドキュメントでは、
 グローバルコンテキストにアクセスする方法は<code>context</code>のサブプロパティを参照する方法でした。:
 <pre>context.global.foo = "bar";
 var osModule = context.global.osModule;</pre>
 この方法はまだサポートされていますが、非推奨であり、<code>global.get</code>/<code>global.set</code>
 でのアクセスが推奨されます。この方法で保存されたデータは再起動後には取得できず、サイドバーのコンテキストビューアには表示されません。
 </div>

functionExternalModules
: `true`にセットすると、Function ノードの設定タブで、関数として使うことができる追加モジュールを追加できるようになります。詳しくは、 [Functionノードの書き方](../writing-functions#functionexternalmodules-オプションを使う) を参照してください。デフォルト: `false`.

debugMaxLength
: DebugノードでサイドバーのDebugタブに表示される最大文字数を指定します。
  デフォルト: 1000

mqttReconnectTime
: MQTTノードの接続が切断された場合に再接続を試行するまでの待機時間（ミリ秒）。
  デフォルト: 5000

serialReconnectTime
: Serialノードの接続が切断された場合に再接続を試行するまでの待機時間（ミリ秒）。
  デフォルト: 5000

socketReconnectTime
: TCPノードの接続が切断された場合に再接続を試行するまでの待機時間（ミリ秒）。
  デフォルト: 10000

socketTimeout
: TCPノードのソケットのタイムアウト時間（ミリ秒）。
  デフォルト: 120000
