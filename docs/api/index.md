---
layout: docs-api
title: APIリファレンス
---

#### Runtime APIs

 - [Admin HTTP API](admin)

    Admin HTTP APIによってリモートで実行環境を管理することができます。
    Node-REDエディタおよびコマンドラインAdminツールから利用することができます。


 - [Hooks](hooks)

    The Hooks API provides a way to insert custom code into certain key points of
    the runtime operation.

 - [Storage](storage)

    このAPIはNode-REDランタイムがデータを保存する場所を設定するための
    着脱可能な方法を提供します。

 - [Logging](/docs/user-guide/runtime/logging)

    A custom logger can be used to send log events to alternative locations, such as
    a database.

 - [Context Store](context)

    このAPIはランタイム外にコンテキストデータを保管する着脱可能な方法を提供します。

 - [Library Store](library)

    This API provides a pluggable way to add additional libraries to the Node-RED
    Import/Export dialog.

#### [Editor APIs](ui)

The APIs available in the editor for nodes and plugins to use. This includes a set
set of standard UI widgets that can be used within a node's edit template.

#### [Module APIs](modules)

このAPIはNode-REDがビルドされているnpmモジュールから提供されます。
これらは既存のNode.jsアプリケーションにNode-REDを組み込むために利用できます。
