module.exports = robot =>
  robot.respond(/check status$/i, msg =>
    robot.emit('slack.attachment', {
      message: msg.message,
      content: {
        color: 'good',
        text: "It's all good!",
      },
    }))
