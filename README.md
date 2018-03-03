[![CircleCI](https://img.shields.io/circleci/project/github/k2works/etude_for_hubot.svg)](https://circleci.com/gh/k2works/etude_for_hubot)
[![Coverage Status](https://coveralls.io/repos/github/k2works/etude_for_hubot/badge.svg?branch=master)](https://coveralls.io/github/k2works/etude_for_hubot?branch=master)

# Etude for Hubot
  
---
# 目的
  
Hubotアプリケーションのための練習プログラム集
  
# 前提
  
| ソフトウェア   | バージョン   | 備考        |
|:---------------|:-------------|:------------|
| node           |8.6.0    |             |
| npm            |5.3.0  |             |
| yarn           |1.2.1   |             |
  
  
# 構成
  
1. [構築](#構築 )
1. [配置](#配置 )
1. [運用](#運用 )
1. [開発](#開発 )
  
## 構築

```bash
docker-compose up -d
docker-compose exec app bash
yarn install
yarn runt test
```
  
### 01 - Node, Yarn, and package.json
  
#### Node
  
>   Node.jsはJavaScriptランタタイム環境。バックエンドの開発だけでなく、一般的なスクリプティングにも使われている。フロンエンド開発においては、リント、テストそしてファイルのアセンブリングなどのタスクに使われている。
  
#### Node Version Management Tools
  
Nodeのインストールは[Node Version Manager](https://github.com/creationix/nvm )を使用する。
```bash
curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.5/install.sh | bash
nvm install 8.6.0
nvm use 8.6.0
```
  
#### NPM
  
NPMはNodeのデフォルトパッケージマネージャー。Node一緒に自動的にインストールされる。以下では他のパッケージマネージャーであるYarnを使う。
  
#### Yarn
  
> YarnはNPMより高速なNode.jsパッケージマネージャー、オフラインサポートと正確な依存管理ができる。
  
Yarnのインストール。
```bash
curl -o- -L https://yarnpkg.com/install.sh | bash
```
  
#### package.json
  
> package.jsonはJavaScriptプロジェクトの記述と設定に使われるファイル。一般な情報（プロジェクト名、バージョン、貢献者、ライセンス等）、使用するツールの設定オプションそして実行するタスクが含まれる。
  
package.jsonのセットアップ
````bash
cd /vagrant
yarn init
````
  
#### Two kinds of dependencies
  
+ Dependenciesはアプリケーションで必要なライブラリ (React, Redux, Lodash, jQuery, etc)。`yarn add [package].`でインストールする。
+ Dev Dependenciesは開発中またはアプリケーションのビルド(Webpack, SASS, linters, testing frameworks, etc)。`yarn add --dev [package]`でインストールする。
  
### 02 - Hubot
  
```bash
npm install -g yo generator-hubot
yo hubot
```
  
### 03 - Babel, ES6, ESLint, Flow, Jest, and Husky
  
#### Babel
  
> BableはES6のコードをES6のコードに変換するコンパイラ。モジュール性が高く異なる様々な環境で使われている。ReactコミュニティではES5コンパイラとして好まれている。
  
Bableのセットアップ
```bash
yarn add --dev babel-cli
yarn add --dev babel-preset-env
```
  
#### ES6
  
> ES6:JavaScript言語の最も重要な進化。
  
#### ESLint
  
> ESLintはES6用のリンター。リンターは一貫性のあるコードフォーマットに関する推奨を通知し、そしてチームで共有する。ESLintが見つけるJavaScriptに関する間違いを学ぶことは優れて方法だ。
  
```bash
npm info eslint-config-airbnb@latest peerDependencies --json | command sed 's/[\{\},]//g ; s/: /@/g' | xargs yarn add --dev eslint-config-airbnb@latest
yarn add --dev eslint
yarn add --dev eslint-plugin-compat
```
  
#### Flow
  
> Flow:Facebookによる静的型チェッカー。コード内の型不一致を検知する。要するに、数値型を使うところで文字型を使うとエラーを通知する。
  
```bash
yarn add --dev flow-bin babel-preset-flow babel-eslint eslint-plugin-flowtype
```
  
#### Mocha
    
```bash
yarn add --dev mocha chai hubot-test-helper co
```
  
#### Git Hooks with Husky
  
> Git Hooks: コミットやプッシュなどの決まったアクションが発生した時に実行されるスクリプト
  
```bash
yarn add --dev husky
```
  
#### PM2
  
> PM2はNode用プロセスマネージャ。プロダクション環境でプロセスを維持する、そしてプロセスのモニタリングと管理機能を提供する。
  
```bash
yarn add --dev pm2 rimraf cross-env
```

## 配置
### Heroku
  
```bash
 heroku create etude-for-hubot
 heroku config:set HUBOT_SLACK_TOKEN=xoxb-YOUR-TOKEN-HERE --app "etude-for-hubot" 
```

### CircleCI
  
```bash
mkdir .circleci
touch .circleci/config.ym
```
  
### Coveralls
  
```bash
yarn add --dev mocha-lcov-reporter coveralls istanbul
```
  
### Bages
  
[shields.io](http://shields.io/ )
  
```text
[![CircleCI](https://img.shields.io/circleci/project/github/k2works/etude_for_hubot.svg)](https://circleci.com/gh/k2works/etude_for_hubot)
[![Coverage Status](https://img.shields.io/coveralls/k2works/etude_for_hubot.svg?style=flat-square)](https://coveralls.io/github/k2works/etude_for_hubot?branch=master)
```

## 運用

### Zabbix
```bash
yarn add hubot-zabbix-notifier
```  

### AWS
+ HUBOT_AWS_ACCESS_KEY_ID="xxxx" ※AWSのアクセスキー
+ HUBOT_AWS_SECRET_ACCESS_KEY="xxxx" ※AWSのシークレットアクセスキー

```bash 
yarn add underscore moment aws2js
```

### Jenkins

+ HUBOT_JENKINS_URL="https://jenkins.your.domain" ※利用するJenkinsサイト
+ HUBOT_JENKINS_AUTH="hirotaka:xxx" ※”ログインユーザ:パスワード"のフォーマット

### Jira
+ HUBOT_JIRA_URL="https://hoge.atlassian.net/" ※利用するJIRAサイトのドメイン名
+ HUBOT_JIRA_USER="foo" ※JIRAユーザのログイン名。
+ HUBOT_JIRA_PASSWORD="xxx" ※JIRAユーザのパスワード。環境変数が見える環境の場合、hubot用に別ユーザを作ろう。

### DocomApi
+ DOCOMO_API_KEY="xxxxx"

```bash
yarn add https://github.com/bouzuya/hubot-docomo-dialogue/archive/master.tar.gz
```

## 参照
+ [HubotをES2015で書いてHerokuにデプロイする](http://dackdive.hateblo.jp/entry/2016/07/13/210000)
+ [Hubot test helper](https://github.com/mtsmfm/hubot-test-helper)
+ [Hubotを使ってSlackへBotを投げる](https://qiita.com/shosho/items/057d7b67d1dd3a700554)
+ [Hubotをpm2でデーモン化@slack](https://qiita.com/ushio_s/items/cfc676dec1cedfe89f96)
+ [HubotとZabbixを連携すればワンオペ監視でも寂しくない ](http://www.atmarkit.co.jp/ait/articles/1412/19/news037.html)
+ [hubot-scriptsを使おう！](https://gist.github.com/koudaiii/5a53dd77e8f717171b63)
+ [hubot-matteruser](https://github.com/loafoe/hubot-matteruser)
