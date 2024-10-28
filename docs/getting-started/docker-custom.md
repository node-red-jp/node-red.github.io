---
layout: docs-getting-started
title: Dockerへの前提条件の追加
toc: toc-user-guide.html
slug: docker-custom
redirect_from:
  - /docs/platforms/docker-custom
---

### 導入

このプロジェクトでは、以下の2つのカテゴリに分類される[Docker hub](https://hub.docker.com/r/nodered/node-red/)上の様々なバージョンのDockerコンテナを利用可能にします：

 - 実行環境であるNodeJSバージョンが異なる。新しいNodeJS LTSバージョンがリリースされると、対応したバージョンのコンテナが追加されます。
 - `-minimal`サフィックスでタグ付けされたイメージ。これらのコンテナはNode-REDとそのコアノードを実行するために必要なライブラリだけを含むようにデザインされています。

具体的には、`-minimal`コンテナはインストールによってトリガーされる一部のノードコンポーネントをビルドするために必要なネイティブビルドツールがありません。

これら一連のイメージはどちらも NodeJS Alpineコンテナをベースにしています。Alpineは可能な限り最小のインストールフットプリントを提供することを目的としたLinux ディストリビューションであり、多くの言語の実行環境コンテナ（NodeJSやPythonなど）のベースとして利用されています。サイズを削減するための多くの最適化の一環として、通常のglibc実装の代わりに[musl](https://www.musl-libc.org/intro.html) libcを利用しています。

muslはほとんどのアプリケーションで正常に動作しますが、場合によっては、例えば一部の[SAP](https://github.com/SAP/node-rfc/issues/148)ノードおよび低レベルのビデオコーデックなどで問題が発生する可能性があります。

提供されているDockerコンテナを拡張したい場合、Alpineのパッケージ管理ツール`apk`を利用して追加のライブラリまたはアプリケーションをインストールする必要があります。

        FROM nodered/node-red:latest
        USER root
        RUN apk add py3-pip py3-numpy py3-pandas py3-scikit-learn
        RUN pip install tensorflow
        USER node-red

### Debianベースのコンテナ

Alpineベースのコンテナーと同様に、Node-RED Docker gitプロジェクトにはDebian LinuxディストリビューションをベースとしたバージョンのNode-RED Dockerコンテナをビルドするためのスクリプトも含まれています。Debianはより主流のLinuxディストリビューションであり、多くのノードには前提条件のインストール方法に関する指示が含まれているため、便利です。

以下のコマンドを実行することでローカルでコンテナをビルドすることができます：

      $ git clone https://github.com/node-red/node-red-docker.git
      $ cd node-red-docker/docker-custom
      $ ./docker-debian.sh


`testing:node-red-build`と呼ばれるコンテナがビルドされ、以下のように実行することができます：

      $ docker run -d -p 1880:1880 -v node_red_data:/data --name myNRtest testing:node-red-build

このコンテナを拡張して、自身のプロジェクトに必要な前提条件を追加することができます。例えば、[node-red-contrib-machine-learning](https://flows.nodered.org/node/node-red-contrib-machine-learning)ノードに必要なライブラリを追加するためには、以下のDockerfileで既に構築されたコンテナを拡張します。

      FROM testing:node-red-build
      USER root
      RUN apt-get install -y python3-pip python3-numpy python3-pandas 
      RUN pip install scikit-learn tensorflow
      USER node-red

これは次のようにビルドできます

      docker build . -t custom-node-red

他の選択肢は、`Dockerfile.debian`を編集して依存関係を事前に組み込むことです。バッケージを`apt-get`の行に追加し、Debian向けに直接パッケージされていないネイティブPythonモジュールをインストールするため、`pip`を追加します。

      ...
      COPY --from=build /usr/src/node-red/prod_node_modules ./node_modules

      # Chown, install devtools & Clean up
      RUN chown -R node-red:root /usr/src/node-red && \
          apt-get update && apt-get install -y build-essential python-dev python3 \ 
          python3-pip python3-numpy python3-pandas && \
          pip install scikit-learn tensorflow && \
          rm -r /tmp/*

      USER node-red
      ...

この場合、`docker-debian.sh`スクリプトを再実行するだけで済みます。