#!/bin/sh

set -e

yarn install
yarn prod:build
export PATH="node_modules/.bin:node_modules/hubot/node_modules/.bin:$PATH"

exec node_modules/.bin/hubot --name "etude-for-hubot" "$@"
