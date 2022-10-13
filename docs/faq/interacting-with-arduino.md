---
layout: docs-faq
toc: toc-user-guide.html
title: Arduinoと連携する
slug: arduino
redirect_from:
  - /docs/hardware/arduino
---

Node-REDを利用してArduinoと連携するにはいくつかの方法があります。
これらの方法はすべてArduinoがUSBシリアル接続を介して、
ホストコンピュータに接続されていると仮定しています。

*Note:* 競合が発生するため、Arduino IDEとArduinoノードの両方を同時に利用することはできません。
IDEからArduinoを再プログラムしたい場合、
Node-REDの実行を停止する必要があります。

### Arduino Cloud

[Arduino Cloud](https://cloud.arduino.cc) allows to interact with Arduino boards registered as Internet-Of-Things devices. 
Nodes are available to be installed in the palette to easily poll data from IoT devices, or receive real-time notifications (see https://flows.nodered.org/node/@arduino/node-red-contrib-arduino-iot-cloud for details and installation).


### シリアル

Arduinoはシリアルデバイスと認識されるため、
Serial in/outノードを利用して通信することができます。

IDEを利用してArduinoをプログラムすると、
シリアルポートを介して入力を送受信して作成物と通信できるため、一般的にはこれが当てはまります。
シリアルポートの速度（ボー・レート）が
両端で同じになるように設定してください。

### Firmata

[Firmata](http://firmata.org/)は、
Arduino（および他のマイクロコントローラ）とホストコンピュータの通信をおこなうためのプロトコルであり、
IOピンへの直接アクセスを可能にします。

#### インストール

まず、スタンダードArduinoソフトウェアダウンロードツールを利用して、
デフォルトのFirmataスケッチをArduinoにロードする必要があります。
通常の場合、これはArduino IDEの以下のメニューにあります。:

        Files - Examples - Firmata - Standard Firmata

そして、パレットにNode-REDのArduinoノードをインストールする必要があります。

<div class="doc-callout">`npm -v`が最低でもversion 2.xであることを確認してください。
そうでない場合、以下のようにアップデートをおこなってください。

        sudo npm i -g npm@latest
        hash -r
</div>

Node-REDのユーザディレクトリ、標準では`~/.node-red`にディレクトリ移動します。

        cd ~/.node-red

そして、Arduinoノードをインストールします。

        npm install node-red-node-arduino

最後にNode-REDを再起動し、ブラウザでエディタをリロードします。
パレットに2つの新しいArduinoノードがあるはずです。

#### 点滅

LED13を利用する「点滅」フローを実行するため、
以下のフローをコピーして読み込みノードダイアログに貼り付けます（ドロップダウンメニューの*読み込み - クリップボード*またはCtrl-i、Ctrl-v）。
読み込みをクリックしたあと、ワークスペース内をクリックして新しいノードを配置します。

    [{"id":"d7663aaf.47194","type":"arduino-board","device":""},{"id":"dae8234f.2517e","type":"inject","name":"0.5s tick","topic":"","payload":"","payloadType":"date","repeat":"0.5","crontab":"","once":false,"x":150,"y":100,"z":"359a4b52.ca65b4","wires":[["56a6f8f2.a95908"]]},{"id":"2db61802.d249e8","type":"arduino out","name":"","pin":"13","state":"OUTPUT","arduino":"d7663aaf.47194","x":570.5,"y":100,"z":"359a4b52.ca65b4","wires":[]},{"id":"56a6f8f2.a95908","type":"function","name":"Toggle output on input","func":"\n// If it does exist make it the inverse of what it was or else initialise it to false\n// (context variables persist between calls to the function)\ncontext.level = !context.level || false;\n\n// set the payload to the level and return\nmsg.payload = context.level;\nreturn msg;","outputs":1,"noerr":0,"x":358,"y":100,"z":"359a4b52.ca65b4","wires":[["2db61802.d249e8"]]}]

このフローはシリアルポート上の基板を自動的に検出しようとするように設定されています。
これを変更する必要がある場合、
`Pin 13`とラベルされたノード - Arduinoノードをダブルクリックします。
鉛筆アイコンをクリックし、必要なポート設定を変更します。

デプロイボタンをクリックし、フローを実行します。
LED13は1秒に1回オンとオフを切り替えます。

#### 機能

現在、Arduino outputノードは以下の3つの動作モードをサポートしています。:

 - デジタル - 0または1
 - アナログ - 0から255
 - サーボ - 0から180

パレットでは使用可能になっていますが、
この例では使用していないArduino inputノードはデジタルおよびアナログピンをサポートしています。
このinputノードは変更を検出する度にメッセージを送信します。
デジタル入力はかなり安定している傾向があるため、問題ないかもしれませんが、
アナログの測定値はしばしばフルサンプルレート（デフォルト：毎秒40回...）になってしまいます。
シリアルポート設定を変更して、管理しやすいレートに低下させることができます。

Node.js arduino-firmataライブラリの詳細は[こちら](https://www.npmjs.com/package/arduino-firmata)で確認できます。

***

### Johnny-Five

I2Cのような機能を追加するため、
人気のある[Johnny-Five](https://www.npmjs.com/package/johnny-five)ライブラリを使うこともできます。

これを利用する方法の1つは、
Luis Montesの[node-red-contrib-gpio](https://www.npmjs.com/package/node-red-contrib-gpio)ノードを利用することです。
このノードは、
Raspberry Pi、BeagleBone Black、Galileo/Edison、Blend Micro、LightBlue Bean、Electric ImpやSpark Coreなどのような他の様々な基板に対しても、
同じ手法でサポートを追加します。

もうひとつの方法は、functionノード内で利用できるようにすることです。
settings.jsのglobalContextSettingsセクションを以下のように編集することで達成できます。

    functionGlobalContext: {
       jfive:require("johnny-five"),                        // this is the reference to the library
       j5board:require("johnny-five").Board({repl:false})   // this actually starts the board link...
    },

ここで基板リンクを開始して、ワークスペース内で複数の機能を使用できるようにします。
ただし、各ピンに一度だけアクセスするように注意する必要があります。

最後に、Node-REDのホームディレクトリ内からnpm installをおこないます。

    cd ~/.node-red
    npm install johnny-five

そして、functionノード内からJohnny-Fiveの[richness](https://github.com/rwaldron/johnny-five/wiki)の
すべてにアクセスすることができます...

    var five = context.global.jfive;    // create a shorter alias
    var led = new five.Led(13);         // instantiate the led
    led.blink(500);                     // blink it every 500 ms

*Note:* これは単純ですが、functionノードが呼び出される度にLEDピンが生成されるため、不適切な例です。
つまり、デプロイして1回呼び出すだけでいいのです。

#### 点滅2

以下のフローは点灯しているLEDのオンとオフを切り替える、より高度な例であり、
LEDピンの状態と単一インスタンスを保持するためのコンテキストの使用方法を示しています。

これは`ctrl-c (copy) / ctrl-i (import) / ctrl-v (paste)`を利用することでワークスペースにインポートできます。

    [{"id":"62f58834.9d0a78","type":"inject","name":"","topic":"","payload":"1","payloadType":"string","repeat":"","crontab":"","once":false,"x":226,"y":326,"z":"359a4b52.ca65b4","wires":[["ae84ad08.517b5"]]},{"id":"ae84ad08.517b5","type":"function","name":"1 = start flash, 0 = stop","func":"var five = context.global.jfive;\ncontext.led = context.led || new five.Led(13);\ncontext.switch = context.switch || 0;\ncontext.switch = msg.payload;\nconsole.log(typeof(context.switch));\nif (context.switch == 1) {\n    context.led.blink(500);\n}\nif (context.switch == 0) {\n    context.led.stop().off();\n}\nreturn msg;","outputs":1,"noerr":0,"x":447,"y":349,"z":"359a4b52.ca65b4","wires":[["df638a80.209c78"]]},{"id":"df638a80.209c78","type":"debug","name":"","active":true,"console":"false","complete":"false","x":645,"y":349,"z":"359a4b52.ca65b4","wires":[]},{"id":"d79bc51d.286438","type":"inject","name":"","topic":"","payload":"0","payloadType":"string","repeat":"","crontab":"","once":false,"x":224.4000244140625,"y":364.60003662109375,"z":"359a4b52.ca65b4","wires":[["ae84ad08.517b5"]]}]
