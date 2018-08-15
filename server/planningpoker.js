"use latest";
const uuid = require('uuid@3.1.0')
const Pusher = require('pusher@1.2.1')
const pusher = new Pusher({
  appId: '438538',
  key: 'fbb4e18183b4d8833d8a',
  secret: '166861206c3b26d7b49b',
  cluster: 'eu',
  encrypted: true
})

module.exports = function (context, done) {
  if (!context.hasOwnProperty('body')) {
    return done(403)
  }
  const body = context.body
  const headers = context.headers

  const socketId = body.socket_id
  const channel = body.channel_name
  const userName = headers['x-pokername']
  const spectate = headers['x-spectate']

  if (!userName || userName.length < 2) {
    const error = `Username not supplied or invalid: ${userName}`
    console.error(error)
    return done({
      code: 403,
      error
    })
  }

  console.log(`Auth request for user '${userName}' socket '${socketId}', channel '${channel}'`)
  const presenceData = {
    user_id: uuid(),
    user_info: {
      name: userName,
      isSpectator: spectate === 'true'
    }
  }
  console.log('Authenticating user:', presenceData)
  const auth = pusher.authenticate(socketId, channel, presenceData);
  done(null, auth)
}
