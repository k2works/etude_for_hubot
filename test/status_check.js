const Helper = require('hubot-test-helper')

const helper = new Helper('../scripts/status_check.js')

const expect = require('chai').expect

describe('status check', () => {
  beforeEach(function () {
    this.room = helper.createRoom({ httpd: false })
  })

  it('should send a slack event', function () {
    let response = null
    this.room.robot.on('slack.attachment', event => response = event.content)

    this.room.user.say('bob', '@hubot check status').then(() => {
      expect(response.text).to.eql("It's all good!")
    })
  })
})
