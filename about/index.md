---
layout: about-single
title: 概要
---

Node-REDはフローベースドプログラミング(flow-based programming)ツールであり、元は[IBM Emerging Technology Services](https://emerging-technology.co.uk)チームによって開発され、[JS Foundation](https://js.foundation)配下のプロジェクトを経て、2019年3月よりNode.js FoundationとJS Foundationが合併して設立された[OpenJS Foundation](https://openjsf.org/)にホストされています。

### フローベースドプログラミング

1970年代にJ. Paul Morrisonによって考案された[flow-based programming](https://en.wikipedia.org/wiki/Flow-based_programming)はアプリケーションの動作をブラックボックス、
すなわちNode-REDでは「ノード」、のネットワークによって表す手法です。
各ノードは何らかのデータを与えられ、そのデータで何かを実行し、
そのデータを渡すといった明確に定義された目的を持ちます。
ネットワークはノード間のデータの流れを示します。

これは視覚的な表現との相性が非常に良く、
より幅広い範囲のユーザにとってより利用しやすいモデルです。
誰かが問題を別々のステップに分解することができれば、フローを見ることでそれが何をしているかがわかります、
つまり各ノードの個々のコードについて理解する必要はありません。

### 実行環境/エディタ

Node-REDは、フローエディタにアクセスするためにウェブブラウザで指定するNode.js上の実行環境に構築されています。
ブラウザではパレットからワークスペースへとノードをドラッグし、
自分のアプリケーションを作成します。
そしてシングルクリックで、アプリケーションを実行状態にある実行環境へとデプロイします。

ノードのパレットは、コミュニティによって開発された新しいノードをインストールすることで容易に拡張することができ、
作成したフローはJSONファイルによって簡単に共有することができます。


### 歴史

Node-REDは、2013年初頭にIBMのEmerging Technology ServicesグループのNick O'LearyとDave Conway-Jonesによる
サイドプロジェクトとして誕生しました。

MQTTトピック間のマッピングを視覚化および操作するための概念実証として始まったものは、
すぐにあらゆる面へ簡単に拡張可能な
はるかに汎用的なツールとなりました。

2013年9月にオープンソース化されて以来オープンで開発され、
2016年10月にJS Foundationの創設プロジェクトの1つとなったことで
最高潮に達しました。
2018年には1,000,000インストールを記録しました。

<div class="doc-callout">
<b>なぜ、Node-REDと呼ばれるのでしょうか?</b> この名称は「Code Red」に似た語感の気軽な言葉遊びです。
これは魅力的で、
最初の数日のうちに呼ばれた全てよりも非常に優れたものでした。

「Node」の部分はフロー/ノードプログラミングモデルと基盤となるNode.JSランタイムの両方を表しています。
私たちは未だに「RED」が何を表すのかについて結論を出していません。
「Rapid Event Developer」は1つの案ですが、
何かを公式化しなければならないと感じたことは一度もありません。

私たちは「Node-RED」を使い続けます。
</div>

歴史といくつかのハイライト:

- [JS Foundationへの移行](http://nodered.org/blog/2016/10/17/js-foundation)についての
記事を読む
- Nickの[Monki Gras 2016](https://www.youtube.com/watch?v=Bbg1017amZs)の講演を見る :

<div style="text-align: center">
    <iframe width="560" height="315" src="https://www.youtube.com/embed/Bbg1017amZs" frameborder="0" allowfullscreen></iframe>
</div>
