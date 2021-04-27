---
layout: docs-faq
toc: toc-user-guide.html
slug: gpio
title: Raspberry Pi GPIOと連携する
---

Raspberry PiのGPIOピンと連携するためにいくつかのノードモジュールを利用できます。

### node-red-node-pi-gpio

このモジュールは、私たちのインストールスクリプトを利用したときにNode-REDとともにプリインストールされます。
これはGPIOピンの監視と制御をする簡単な方法を提供します。

<div class="doc-callout">
Raspbianはこのノードが動作するように事前に設定されます。
Ubuntuなど異なるディストリビューションを利用している場合、いくつか追加のインストール手順が必要なはずです。
このノードのREADMEに<a href="https://github.com/node-red/node-red-nodes/tree/master/hardware/PiGpio#install">詳細</a>が記述されています。
</div>

### node-red-node-pi-gpiod

このモジュールは、
デフォルトのノードにさらなる機能を提供する[PiGPIOd](http://abyz.me.uk/rpi/pigpio/pigpiod.html)デーモンを利用します。
例えば、PWMアウトプットやServo実行のためのノードの設定を簡単にできるようになります。

このモジュールは[こちら](https://flows.nodered.org/node/node-red-node-pi-gpiod)で取得できます。


### node-red-contrib-gpio

このモジュールは[Johnny-Five](https://github.com/rwaldron/johnny-five)ライブラリを利用し、
幅広い種類のデバイスでGPIOをサポートしています。

このモジュールは[こちら](https://flows.nodered.org/node/node-red-contrib-gpio)で手に入れられます。
