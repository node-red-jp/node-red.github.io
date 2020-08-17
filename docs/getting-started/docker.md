---
layout: docs-getting-started
title: Dockerで実行する
toc: toc-user-guide.html
slug: docker
redirect_from:
  - /docs/platforms/docker
---

このガイドはDockerおよび[Dockerコマンドライン](https://docs.docker.com/engine/reference/commandline/cli/)に対していくらか基本的な知識を持っていることを前提としています。
ここにはDockerでNode-REDを実行する多くの方法が記述されており、複数のアーキテクチャ(amd64、arm32v6、arm32v7、arm64v8およびs390x)をサポートしています。

[Docker Hub](https://hub.docker.com/r/nodered/node-red/)に存在する現在のNode-RED 1.0のリポジトリは、
`nodered/node-red`にリネームされています。

0.20.x以前のバージョンはhttps://hub.docker.com/r/nodered/node-red-dockerから入手可能です。

### クイックスタート

最も簡単な方法によってDockerで実行するには、次のようにします:

    docker run -it -p 1880:1880 --name mynodered nodered/node-red

このコマンドを詳細に見てみましょう:

    docker run              - run this container... initially building locally if necessary
    -it                     - attach a terminal session so we can see what is going on
    -p 1880:1880            - connect local port 1880 to the exposed internal port 1880
    --name mynodered        - give this machine a friendly local name
    nodered/node-red        - the image to base it on


コマンドを実行するとNode-REDのインスタンスを実行するターミナルウィンドウが開かれます。

        Welcome to Node-RED
        ===================

        30 Jun 12:57:10 - [info] Node-RED version: v1.1.0
        30 Jun 12:57:10 - [info] Node.js  version: v10.21.0
        30 Jun 12:57:10 - [info] Linux 4.9.184-linuxkit x64 LE
        30 Jun 12:57:11 - [info] Loading palette nodes
        30 Jun 12:57:16 - [info] Settings file  : /data/settings.js
        30 Jun 12:57:16 - [info] Context store  : 'default' [module=memory]
        30 Jun 12:57:16 - [info] User directory : /data
        30 Jun 12:57:16 - [warn] Projects disabled : editorTheme.projects.enabled=false
        30 Jun 12:57:16 - [info] Flows file     : /data/flows.json
        30 Jun 12:57:16 - [info] Creating new flow file
        30 Jun 12:57:17 - [warn]

        ---------------------------------------------------------------------
        Your flow credentials file is encrypted using a system-generated key.

        If the system-generated key is lost for any reason, your credentials
        file will not be recoverable, you will have to delete it and re-enter
        your credentials.

        You should set your own key using the 'credentialSecret' option in
        your settings file. Node-RED will then re-encrypt your credentials
        file using your chosen key the next time you deploy a change.
        ---------------------------------------------------------------------

        30 Jun 12:57:17 - [info] Starting flows
        30 Jun 12:57:17 - [info] Started flows
        30 Jun 12:57:17 - [info] Server now running at http://127.0.0.1:1880/

        [...]

ブラウザで`http://{host-ip}:1880`を開くと、馴染みのNode-REDのデスクトップを確認できます。

これをおこなう利点は命名する(mynodered)ことでより簡単に操作することができ、
ホストポートを修正することで慣れ親しんでいる画面にたどり着くことができます。
もちろんこれは同時に1つのインスタンスしか実行できないことを意味します...しかし、一度に1ステップずつ実行できます。

現在実行しているものに満足した場合、`Ctrl-p` `Ctrl-q`によってターミナルを切り離すことができます -
コンテナはバックグラウンドで実行させ続けます。

ターミナルに再接続する(ログを確認する)ためには、以下を実行します:

    docker attach mynodered

コンテナを再起動する必要がある場合(例 Dockerデーモンのリブート再起動):

    docker start mynodered

そして必要なときに再び停止します:

    docker stop mynodered

### イメージのバリエーション

Node-REDイメージは、可能な限り小さく保つために[official Node JS Alpine Linux](https://hub.docker.com/_/node/)イメージに基づいています。
Alpine Linuxを使用するとビルドされるイメージのサイズを小さくすることができますが、ネイティブモジュールのコンパイルに必要な一般的な依存関係は除去されています。これらの依存関係を加えたい場合、実行しているコンテナで除外したパッケージでNode-REDイメージを拡張するか、[docker-custom](https://github.com/node-red/node-red-docker/tree/master/docker-custom)を参考に新たなイメージをビルドします。

詳細なイメージ、タグ、マニフェスト情報については[Github project README](https://github.com/node-red/node-red-docker/blob/master/README.md)を参照してください。

例えば: アーキテクチャとして`arm32v7`を持つRaspberry PI 3Bで実行するとしましょう。そして、以下のコマンドでイメージ(`1.1.0-10-arm32v7`とタグ付けされた)をプルし、コンテナを起動します。
```
docker run -it -p 1880:1880 --name mynodered nodered/node-red:latest
```

同じコマンドはamd64システムで実行している場合でも利用することができますが、これはDockerがamd64ホストで実行されていることを検出し、一致するタグ(`1.1.0-10-amd64`)のイメージをプルするからです。

これは自身が実行しているアーキテクチャを知る/指定する必要がないという利点を有しており、docker runコマンドとDockerコンポーズファイルをより柔軟に、システム間の互換を可能にします。

**Note**: 現在Dockerのアーキテクチャ検出に、`arm32v6` - 例えばRaspberry Pi Zeroまたは1について失敗するというバグがあります。現状、以下のようにこれらのデバイスではフルイメージタグを指定する必要があります。:
```
docker run -it -p 1880:1880 --name mynodered nodered/node-red:1.1.0-10-arm32v6
```

### ユーザデータを管理する

DockerでNode-REDを実行する場合、
コンテナが壊れた場合に追加したノードやフローが消失しないことを保証する必要があります。
コンテナ外部のボリュームに対してデータディレクトリをマウンティングすることで、このユーザデータを永続化することができます。
バインドしたマウントまたは命名したデータボリュームを使うことでおこなうこともできます。

Node-REDはコンテナ内の`/data`ディレクトリを使うことでユーザ設定データを保存できます。

#### 永続化のためにホストディレクトリを利用する(マウントをバインドする)

コンテナ内部のNode-REDのユーザディレクトリを、コンテナ外部のホストディレクトリに保存することで、以下のコマンドを使うことができます。
このホストディレクトリにアクセスを許可すると、
コンテナ内のnode-redユーザ(デフォルトではuid=1000)はホストディレクトリのオーナーとして同じuidを持っているはずです。
```
docker run -it -p 1880:1880 -v /home/pi/.node-red:/data --name mynodered nodered/node-red
```

この例ではホストの`/home/pi/.node-red`ディレクトリをコンテナの`/data`ディレクトリにバインドします。

**Note**: バージョン0.20から1.0に移行したユーザは存在している`/data`ディレクトリが正しいオーナー権限を持っていることを確認する必要がある。
1.0では、`1000:1000`となる必要があります。
コマンド`sudo chown -R 1000:1000 path/to/your/node-red/data`によって強制的に変更することができます。

権限に関する詳細な情報については、
[wiki](https://github.com/node-red/node-red-docker/wiki/Permissions-and-Persistence)を参照してください。

#### 命名されたデータボリュームを利用する

Dockerも命名された[データボリューム](https://docs.docker.com/engine/tutorials/dockervolumes/)を使うことがサポートされており、
コンテナ外部で永続化または共有するデータを保存することができます。

ユーザデータを永続化するために新たに命名されたデータボリュームを作成し、
このボリュームを使って新たなコンテナを実行します。
```
$ docker volume create --name node_red_user_data
$ docker volume ls
DRIVER              VOLUME NAME
local               node_red_user_data
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered nodered/node-red
```

マウントしたボリュームからデータのバックアップを取る必要がある場合、コンテナを実行中にアクセスします。
```
$ docker cp  mynodered:/data  /your/backup/directory
```

いくつかのサンプルフローを作成してデプロイするためにNode-REDを使ったあと、
コンテナを壊してユーザデータを喪失することなく新しいインスタンスを起動します。
```
$ docker stop mynodered
$ docker rm mynodered
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered nodered/node-red
```

### 更新する

/dataは現在コンテナの外部に保存されているため、
ベースのコンテナイメージを更新することはシンプルです。
```
$ docker pull nodered/node-red
$ docker stop mynodered
$ docker rm mynodered
$ docker run -it -p 1880:1880 -v node_red_user_data:/data --name mynodered nodered/node-red
```

### Dockerスタック / Dockerコンポーズ

以下のDockerコンポーズファイルの例は`docker stack`または`docker-compose`によって実行できます。
[Docker stack](https://docs.docker.com/engine/reference/commandline/stack/)および[Docker compose](https://docs.docker.com/compose/)に関する更なる情報は公式Dockerページを参照してください。
```
################################################################################
# Node-RED Stack or Compose
################################################################################
# docker stack deploy node-red --compose-file docker-compose-node-red.yml
# docker-compose -f docker-compose-node-red.yml -p myNoderedProject up
################################################################################
version: "3.7"

services:
  node-red:
    image: nodered/node-red:latest
    environment:
      - TZ=Europe/Amsterdam
    ports:
      - "1880:1880"
    networks:
      - node-red-net
    volumes:
      - node-red-data

volumes:
  node-red-data:

networks:
  node-red-net:
```

上述のコンポーズファイルは以下のことをおこないます:
- node-redサービスを作成
- 最新版node-redイメージをプル
- ヨーロッパ/アムステルダムにタイムゾーンを設定
- コンテナポート1880をホストポート1880に設定
- node-red-netネットワークを作成、このネットワークにコンテナを接続
- コンテナ内の`/data`ディレクトリをDockerの`node-red-data`ボリュームに永続化


### ローカルリソースにDockerファイルをコピーする

ローカルディレクトリからファイルをNode-REDのDockerイメージに移すことはしばしば有効です（例えば、gitリポジトリにプロジェクト全体を保存したい場合）。これを実施するには、ローカルディレクトリを以下のような構成にするはずです:

```
Dockerfile
README.md
package.json     # 自身のフローが必要とする追加ノードをpackage.jsonに追加します
flows.json       # 一般的にNode-REDがフローを保存するファイル
flows_cred.json  # フローに必要になるかもしれない資格情報
settings.js      # 自分の設定ファイル
```

**NOTE**: 外部の/dataボリュームにマウントしたい場合、この方法は不適切です。永続化のために外部のボリュームを使う必要がある場合、代わりに設定ファイルとフローファイルをそのボリュームにコピーします。

以下のDockerファイルをベースとなるNode-RED Dockerイメージ上でビルドし、加えてそのイメージに自身が利用しているファイルを移動させます:

```
FROM nodered/node-red

# Copy package.json to the WORKDIR so npm builds all
# of your added nodes modules for Node-RED
COPY package.json .
RUN npm install --unsafe-perm --no-update-notifier --no-fund --only=production

# Copy _your_ Node-RED project files into place
# NOTE: This will only work if you DO NOT later mount /data as an external volume.
#       If you need to use an external volume for persistence then
#       copy your settings and flows files to that volume instead.
COPY settings.js /data/settings.js
COPY flows_cred.json /data/flows_cred.json
COPY flows.json /data/flows.json

# You should add extra nodes via your package.json file but you can also add them here:
#WORKDIR /usr/src/node-red
#RUN npm install node-red-node-smooth
```

#### Dockerファイルの順序とビルド速度

必要ない限り、`COPY package... npm install...`ステップを早い段階でおこなうことが推奨されます。なぜならば、Node-REDを使う際に頻繁に`flows.json`を変更しますが、`package.json`はプロジェクトに含まれるモジュールを変更したときのみ変更するためです。また、`package.json`を変更したときに必要となる`npm install`ステップはしばしば時間を要するため、時間がかかり、一般的に変更のないステップをDockerファイル内の早い段階でおこない、ビルドイメージを再利用できるようにして、以降の全体のビルドを高速化することは推奨されます。

#### 資格情報、シークレットおよび環境変数

当然ですが、資格情報をどこかにハードコードすることは望まないため、Node-REDプロジェクトに資格情報が必要な場合、上述のDockerファイルを利用して`settings.js`内に以下の項目を持たせてください。

```
module.exports = {
  credentialSecret: process.env.NODE_RED_CREDENTIAL_SECRET // 正確にこれを書き足してください
}
```

...そして、実行しているDocker内で、`run`コマンドに環境変数を追加してください...

`docker run -e "NODE_RED_CREDENTIAL_SECRET=your_secret_goes_here"`

#### ビルドおよび実行

通常通りDockerファイルを_ビルド_します:

```sh
docker build -t your-image-name:your-tag .
```

作業しているローカルディレクトリでの変更だけをすぐに開発目的でローカルで _実行_ するためには、`cd`を使ってプロジェクトのディレクトリに移動し、以下のように実行します:

```bash
docker run --rm -e "NODE_RED_CREDENTIAL_SECRET=your_secret_goes_here" -p 1880:1880 -v `pwd`:/data --name a-container-name your-image-name
```

### 起動

環境変数はNode-RED実行環境を設定するコンテナに引き渡すことが可能です。

フロー設定ファイルは、
デフォルトでは*'flows.json'*となっている環境変数(**FLOWS**)を使うことで設定します。
以下のコマンドラインフラグによって実行時に変更することができます。
```
docker run -it -p 1880:1880 -e FLOWS=my_flows.json nodered/node-red
```

**Note**: `-e FLOWS=""`を指定した場合、
`settings.js`ファイル内の*flowFile*プロパティを経由してフローファイルに設定されます。

その他有用な環境変数は以下のとおりです

 - `-e NODE_RED_ENABLE_SAFE_MODE=false` # trueに設定することでセーフ(実行されない)モードでNode-REDを起動します
 - `-e NODE_RED_ENABLE_PROJECTS=false`  # trueに設定することでプロジェクト機能を有効にしてNode-REDを起動します

Node.jsの実行時引数は環境変数(**NODE_OPTIONS**)を使うことでコンテナに引き渡すことができます。
例えば、Node.jsガーベージコレクタを使うことでヒープサイズの修正をおこなうためには
以下のコマンドを使用します。
```
docker run -it -p 1880:1880 -e NODE_OPTIONS="--max_old_space_size=128" nodered/node-red
```

### ヘッドレスで実行する

ヘッドレス（つまりバックグラウンド）で実行するには、前述のほとんどのコマンドで`-d`を`-it`に置換するだけであり、
以下の例のようになります:
```
docker run -d -p 1880:1880 --name mynodered nodered/node-red
```

### コンテナシェル

ヘッドレスで実行した場合、コンテナにアクセスし直すためには以下のコマンドを利用します。
```
$ docker exec -it mynodered /bin/bash
bash-4.4$
```

コンテナ内のコマンドラインを表示します - 実行したいnpm installコマンドを実行できます
- 例
```
bash-4.4$ npm install node-red-dashboard
bash-4.4$ exit
$ docker stop mynodered
$ docker start mynodered
```

そして、ブラウザページを更新することでパレットに新しく追加したノードが現れるはずです。

### Multiple Instances

以下のように実行すると、
```
docker run -d -p 1880 nodered/node-red
```
マシンのローカルインスタンスを作成できます。注意: 特定の命名はしていません。

このコンテナはID番号を持ち、ランダムなポート番号で実行されます... どのポートなのかを知るには、`docker ps`を実行します
```
$ docker ps
CONTAINER ID  IMAGE             COMMAND                 CREATED         STATUS        PORTS                    NAMES
860258cab092  nodered/node-red  "npm start -- --user…"  10 seconds ago  Up 9 seconds  0.0.0.0:32768->1880/tcp  dazzling_euler
```

ここで判明したTCPポートでホストマシンをブラウザで指定することができ、
つまり上述の例では`http://{host ip}:32768`でブラウジングします。

### コンテナのリンク

--linkオプションを使用することでDocker実行環境の「内部に」コンテナをリンクすることができます。

例えば、次のように利用できるシンプルなMQTTブローカーコンテナがあります。

    docker run -it --name mybroker eclipse-mosquitto

(望まない限り、ポート1883をグローバルに公開する必要はありません。後で魔法をかけます。)

そしてnode-red dockerを実行します - しかし今回はlinkパラメータ(name:alias)を使います

    docker run -it -p 1880:1880 --name mynodered --link mybroker:broker nodered/node-red

ここでの魔法は、外部のmybrokerインスタンスにリンクしている*ブローカー*と呼ばれるnode-redインスタンスのホストファイルに、
`--link`でエントリを追加することです。
しかし、ポート1880で公開しており、node-redの編集のために外部のブラウザを使うことができます。

そして、以下のようなシンプルなフローは動作するはずです - つい先程設定したエイリアス*ブローカー*を使います

        [{"id":"190c0df7.e6f3f2","type":"mqtt-broker","broker":"broker","port":"1883","clientid":""},{"id":"37963300.c869cc","type":"mqtt in","name":"","topic":"test","broker":"190c0df7.e6f3f2","x":226,"y":244,"z":"f34f9922.0cb068","wires":[["802d92f9.7fd27"]]},{"id":"edad4162.1252c","type":"mqtt out","name":"","topic":"test","qos":"","retain":"","broker":"190c0df7.e6f3f2","x":453,"y":135,"z":"f34f9922.0cb068","wires":[]},{"id":"13d1cf31.ec2e31","type":"inject","name":"","topic":"","payload":"","payloadType":"date","repeat":"","crontab":"","once":false,"x":226,"y":157,"z":"f34f9922.0cb068","wires":[["edad4162.1252c"]]},{"id":"802d92f9.7fd27","type":"debug","name":"","active":true,"console":"false","complete":"false","x":441,"y":261,"z":"f34f9922.0cb068","wires":[]}]

この方法は内部ブローカーをDockerホスト外に公開しません - 
もちろん公開したいのであれば、`-p 1883:1883`などをブローカーに追加してコマンドを実行することができます。

### Raspberry PI - ネイティブGPIOサポート

| v1.0 - 緊急: Raspberry PIのネイティブGPIOサポートは廃止されました |
| --- |
ネイティブGPIOの代替は[node-red-node-pi-gpiod](https://github.com/node-red/node-red-nodes/tree/master/hardware/pigpiod)です。

ネイティブGPIOサポートの欠点は以下のとおりです:
- Dockerコンテナは、gpioをコントロールしたい同じDockerノード/ホストにデプロイする必要があります
- Dockerノード/ホストの`/dev/mem`にアクセスします
- privileged=trueは`docker stack`コマンドではサポートされていません

`node-red-node-pi-gpiod`はこれらの全ての欠点を解消します。`node-red-node-pi-gpiod`は単一のNode-REDコンテナから複数のRaspberry Piのgpioと情報交換すること、そして複数のコンテナが同じRaspberry Piの異なるgpioにアクセスすることが可能にします。

#### `node-red-node-pi-gpiod`へのクイック移行手順

  1. Node-REDパレットを通して`node-red-node-pi-gpiod`をインストールします
  2. ホストのPaspberry Piに`PiGPIOd daemon`をインストールして実行します
  3. `pi gpiod`ノードによって全てのネイティブGPIOノードを置換します
  4. `PiGPIOd daemon`に接続するように`pi gpio`ノードを設定します。ほとんどのホストマシンはIPアドレス172.17.0.1 ポート番号8888がありますが、常ではありません。確認には`docker exec -it mynodered ip route show default | awk '/default/ {print $3}'`を利用できます。

**Note**: 必要な場合、ホスト上ではなくそれ自身のコンテナでgpiodを実行する[gpiod project](https://github.com/corbosman/node-red-gpiod)が存在します。

### シリアルポート - ダイアルアウト - グループへの追加

ホストシリアルポートへアクセスするためには、`dialout`グループにコンテナを追加する必要があります。起動コマンドに`--group-add dialout`を追加することで有効できます。例は以下の通りです。
```
docker run -it -p 1880:1880 --group-add dialout --name mynodered nodered/node-red
```

---

### よくある問題とヒント

ここではユーザが報告した一般的な問題と解決策の一覧を示します。

#### ユーザ権限のエラー

権限に関する詳細な情報については
[wiki](https://github.com/node-red/node-red-docker/wiki/Permissions-and-Persistence)を参照してください。

*権限拒否*エラーを確認した場合、ファイルを開くかホストデバイスにアクセスし、ルートユーザとしてコンテナを起動してみてください。

```
docker run -it -p 1880:1880 --name mynodered -u node-red:dialout nodered/node-red
```

リファレンス:

https://github.com/node-red/node-red-docker/issues/15

https://github.com/node-red/node-red-docker/issues/8

#### ホストデバイスにアクセスする

コンテナ内のホストからデバイスにアクセスしたい、例えばシリアルポートの場合、以下のコマンドラインフラグを使ってアクセスします。

```
docker run -it -p 1880:1880 --name mynodered --device=/dev/ttyACM0 nodered/node-red
```
リファレンス:
https://github.com/node-red/node-red/issues/15

#### タイムゾーンを設定する

デフォルトのタイムゾーンを変更したい場合、[相対タイムゾーン](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones)を用いたTZ環境変数を使用します。
```
docker run -it -p 1880:1880 --name mynodered -e TZ=Europe/London nodered/node-red
```

リファレンス:
https://groups.google.com/forum/#!topic/node-red/ieo5IVFAo2o
