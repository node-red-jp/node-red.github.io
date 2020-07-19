---
layout: docs-faq
toc: toc-user-guide.html
title: Raspberry Piサービスをカスタマイズする
slug: systemdサービス
---

Raspberry Piやその他DebianベースのLinuxシステムで実行するとき、
私たちの[インストールスクリプト](/docs/hardware/raspberrypi)は起動時にNode-REDを自動起動するように
systemdサービスを設定するために利用することができます。

このガイドはいくつかのよくある事例のためにサービスをカスタマイズする方法を紹介しています。



### ユーザを変更する

サービスは`pi`ユーザのために設定されています。
実行するときのユーザを変更するには、サービス定義`/lib/systemd/system/nodered.service`を編集し、
`User`、`Group`および`WorkingDirectory`の行を適した形に変更します:

```yaml
[Service]
Type=simple
# Run as normal pi user - change to the user name you wish to run Node-RED as
User=<your_user>
Group=<your_user>
WorkingDirectory=/home/<your_user>
Nice=5
Environment="PI_NODE_OPTIONS=--max_old_space_size=256"
...
```

ファイルを編集したあと、以下のコマンドを実行して
systemdデーモンをリロードし、そしてNode-REDサービスを再起動します。

```
sudo systemctl daemon-reload
node-red-stop
node-red-start
```


### HTTPプロキシを設定する

Node-REDフロー内のHTTPリクエストのためにプロキシを利用する必要がある場合、
環境変数`HTTP_PROXY`を設定しなくてはなりません。

サービス定義`/lib/systemd/system/nodered.service`を編集し、
新たに`Environment=...`の行を追加します。例:

```yaml
...
Nice=5
Environment="NODE_OPTIONS=--max-old-space-size=128"
Environment="HTTP_PROXY=my-proxy-server-address"
...
```

ファイルを編集したあと、以下のコマンドを実行して
systemdデーモンをリロードし、そしてNode-REDサービスを再起動します。

```
sudo systemctl daemon-reload
node-red-stop
node-red-start
```
