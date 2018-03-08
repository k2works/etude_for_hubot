/* eslint-disable global-require,consistent-return */
// Description:
//   DOCOMOの雑談APIを利用した雑談
//

const getTimeDiffAsMinutes = function (oldMsec) {
  const now = new Date()
  const old = new Date(oldMsec)
  const diffMsec = now.getTime() - old.getTime()
  const diffMinutes = parseInt(diffMsec / (60 * 1000), 10)
  return diffMinutes
}

module.exports = robot =>
  robot.respond(/(\S+)/i, (msg) => {
    const { DOCOMO_API_KEY } = process.env
    const message = msg.match[1]
    if (!DOCOMO_API_KEY || !message) { return }

    // # ContextIDを読み込む
    const KEY_DOCOMO_CONTEXT = 'docomo-talk-context'
    let context = robot.brain.get(KEY_DOCOMO_CONTEXT || '')

    // # 前回会話してからの経過時間調べる
    const KEY_DOCOMO_CONTEXT_TTL = 'docomo-talk-context-ttl'
    const TTL_MINUTES = 20
    const oldMsec = robot.brain.get(KEY_DOCOMO_CONTEXT_TTL)
    const diffMinutes = getTimeDiffAsMinutes(oldMsec)

    // # 前回会話してから一定時間経っていたらコンテキストを破棄
    if (diffMinutes > TTL_MINUTES) {
      context = ''
    }

    const url = `https://api.apigw.smt.docomo.ne.jp/dialogue/v1/dialogue?APIKEY=${DOCOMO_API_KEY}`
    const userName = msg.message.user.name

    const request = require('request')
    return request.post(
      {
        url,
        json: {
          utt: message,
          nickname: userName || undefined,
          context: (context || undefined),
        },
      }
      , (err, response, body) => {
        // # ContextIDの保存
        robot.brain.set(KEY_DOCOMO_CONTEXT, body.context)

        // # 会話発生時間の保存
        const nowMsec = new Date().getTime()
        robot.brain.set(KEY_DOCOMO_CONTEXT_TTL, nowMsec)

        return msg.send(body.utt)
      },
    )
  })

