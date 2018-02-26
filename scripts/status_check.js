"use strict";

module.exports = function (robot) {
  return robot.respond(/check status$/i, function (msg) {
    return robot.emit('slack.attachment', {
      message: msg.message,
      content: {
        color: "good",
        text: "It's all good!"
      }
    });
  });
};