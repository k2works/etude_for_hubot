'use strict';

/* eslint-disable global-require,consistent-return */
// Description:
//   DOCOMOの雑談APIを利用した雑談
//

var getTimeDiffAsMinutes = function getTimeDiffAsMinutes(oldMsec) {
  var now = new Date();
  var old = new Date(oldMsec);
  var diffMsec = now.getTime() - old.getTime();
  var diffMinutes = parseInt(diffMsec / (60 * 1000), 10);
  return diffMinutes;
};

module.exports = function (robot) {
  return robot.respond(/(\S+)/i, function (msg) {
    var DOCOMO_API_KEY = process.env.DOCOMO_API_KEY;

    var message = msg.match[1];
    if (!DOCOMO_API_KEY || !message) {
      return;
    }

    // # ContextIDを読み込む
    var KEY_DOCOMO_CONTEXT = 'docomo-talk-context';
    var context = robot.brain.get(KEY_DOCOMO_CONTEXT || '');

    // # 前回会話してからの経過時間調べる
    var KEY_DOCOMO_CONTEXT_TTL = 'docomo-talk-context-ttl';
    var TTL_MINUTES = 20;
    var oldMsec = robot.brain.get(KEY_DOCOMO_CONTEXT_TTL);
    var diffMinutes = getTimeDiffAsMinutes(oldMsec);

    // # 前回会話してから一定時間経っていたらコンテキストを破棄
    if (diffMinutes > TTL_MINUTES) {
      context = '';
    }

    var url = 'https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=' + DOCOMO_API_KEY;
    var userName = msg.message.user.name;

    var request = require('request');
    return request.post({
      url: url,
      json: {
        utt: message,
        nickname: userName || undefined,
        context: context || undefined
      }
    }, function (err, response, body) {
      // # ContextIDの保存
      robot.brain.set(KEY_DOCOMO_CONTEXT, body.context);

      // # 会話発生時間の保存
      var nowMsec = new Date().getTime();
      robot.brain.set(KEY_DOCOMO_CONTEXT_TTL, nowMsec);

      return msg.send(body.utt);
    });
  });
};