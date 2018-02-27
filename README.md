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
  

## 参照
+ [HubotをES2015で書いてHerokuにデプロイする](http://dackdive.hateblo.jp/entry/2016/07/13/210000)
+ [Hubot test helper](https://github.com/mtsmfm/hubot-test-helper)
+ [Hubotを使ってSlackへBotを投げる](https://qiita.com/shosho/items/057d7b67d1dd3a700554)
