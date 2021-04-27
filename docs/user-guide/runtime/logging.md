---
layout: docs-user-guide
toc: toc-user-guide.html
title: ログ
slug: ログ
redirect_from:
  - /docs/user-guide/logging
---

Node-REDはコンソールに出力するロガーを利用しています。
また、他への出力を可能にするカスタムロガーモジュールの利用もサポートしています。

<div class="doc-callout">
<em>Note</em> : 私たちの<a href="/docs/hardware/raspberrypi">install script</a>を利用して、
Raspberry Piにサービスとして実行ししている場合、
<code>node-red-log</code>コマンドを利用することでサービスログを確認することができます。
</div>

### コンソールロガー

コンソールロガーは
[settings file](settings-file)内の`logging`プロパティで設定することができます。


~~~~js
// Configure the logging output
logging: {
    // Console logging
    console: {
        level: "info",
        metrics: false,
        audit: false
    }
}
~~~~

ロガーの挙動の設定に使える3つのプロパティがあります。:

#### `level`

記録するログレベルです。選択肢は以下のとおりです。:

- `fatal` - アプリケーションが利用不可能になるようなエラーのみ記録します
- `error` - 特定のリクエストに対して致命的とみなされるエラーを記録します
- `warn` - 致命的ではない問題を記録します
- `info` - アプリケーションの一般的な実行についての情報を記録します
- `debug` - infoよりも詳細な情報を記録します
- `trace` - 非常に詳細なログを記録します
- `off` - ログメッセージをすべて記録しません

`off`を除き、各レベルはより高いレベルのメッセージを含みます。-
例えば`warn`レベルは`error`および`fatal`レベルのメッセージを含みます。

#### `metrics`

`true`を設定した場合、
Node-REDランタイムはフロー実行とメモリ使用情報を出力します。

各ノードの送受信イベントはログに出力されます。
例えば、InjectノードおよびDebugノードを持つフローからは以下のようなログが出力されます。

    9 Mar 13:57:53 - [metric] {"level":99,"nodeid":"8bd04b10.813f58","event":"node.inject.receive","msgid":"86c8212c.4ef45","timestamp":1489067873391}
    9 Mar 13:57:53 - [metric] {"level":99,"nodeid":"8bd04b10.813f58","event":"node.inject.send","msgid":"86c8212c.4ef45","timestamp":1489067873392}
    9 Mar 13:57:53 - [metric] {"level":99,"nodeid":"4146d01.5707f3","event":"node.debug.receive","msgid":"86c8212c.4ef45","timestamp":1489067873393}

メモリ使用情報は15秒おきにログ出力されます。

    9 Mar 13:56:24 - [metric] {"level":99,"event":"runtime.memory.rss","value":97517568,"timestamp":1489067784815}
    9 Mar 13:56:24 - [metric] {"level":99,"event":"runtime.memory.heapTotal","value":81846272,"timestamp":1489067784817}
    9 Mar 13:56:24 - [metric] {"level":99,"event":"runtime.memory.heapUsed","value":59267432,"timestamp":1489067784817}

#### `audit`

`true`を設定した場合、Admin HTTP APIアクセスイベントがログ出力されます。
このイベント情報には、アクセスされているエンドポイント、IPアドレスおよびタイムスタンプといった追加情報が含まれます。

`adminAuth`が有効化されている場合、このイベント情報には要求しているユーザについての情報が含まれます。

    9 Mar 13:49:42 - [audit] {"event":"library.get.all","type":"flow","level":98,"path":"/library/flows","ip":"127.0.0.1","timestamp":1489067382686}
    9 Mar 14:34:22 - [audit] {"event":"flows.set","type":"full","version":"v2","level":98,"user":{"username":"admin","permissions":"write"},"path":"/flows","ip":"127.0.0.1","timestamp":1489070062519}

### カスタムロギングモジュール

カスタムロギングモジュールも利用することができます。
例えば、`metrics`出力をシステム性能の監視のために別のシステムに送信します。

カスタムロガーを利用するため、
[settings file](settings-file)を編集してloggingセクションに新しいブロックを追加します。


~~~~js
// Configure the logging output
logging: {
    // Console logging
    console: {
        level: "info",
        metrics: false,
        audit: false
    },
    // Custom logger
    myCustomLogger: {
        level: 'debug',
        metrics: true,
        handler: function(settings) {
            // Called when the logger is initialised

            // Return the logging function
            return function(msg) {
                console.log(msg.timestamp, msg.event);
            }
        }
    }
}
~~~~

`level`、`metrics`および`audit`プロパティはコンソールロガーと同様です。

`handler`プロパティはカスタムロギングハンドラを定義しています。
これは、起動時に1回呼び出され、ロガーの設定を受け渡す関数です。
ログメッセージとともに呼び出される関数を返さなければなりません。

複数のカスタムロガーを設定することができます。 - 唯一の予約語は`console`です。

#### ロガーの例

以下の例では、
メトリクスイベントをTCP接続を介して[Logstash](https://www.elastic.co/products/logstash)インスタンスに送るカスタムロガーを追加しています。

これは非常に簡易的で、単純な例です。 - エラー処理や再接続ロジックはありません。

~~~~~js
logging: {
    console: {
        level: "info",
        metrics: false,
        audit: false
    },
    logstash: {
        level:'off',
        metrics:true,
        handler: function(conf) {
            var net = require('net');
            var logHost = '192.168.99.100',logPort = 9563;
            var conn = new net.Socket();
            conn.connect(logPort,logHost)
                .on('connect',function() {
                    console.log("Logger connected")
                })
                .on('error', function(err) {
                    // Should attempt to reconnect in a real env
                    // This example just exits...
                    process.exit(1);
                });
            // Return the function that will do the actual logging
            return function(msg) {
                var message = {
                    '@tags': ['node-red', 'test'],
                    '@fields': msg,
                    '@timestamp': (new Date(msg.timestamp)).toISOString()
                }
                try {
                    conn.write(JSON.stringify(message)+"\n");
                }catch(err) { console.log(err);}
            }
        }
    }
}
~~~~~
