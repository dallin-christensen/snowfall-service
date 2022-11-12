require('dotenv').config();
const client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

const sendSms = ({ body = '', to = process.env.TWILIO_TO_NUMBER, from = process.env.TWILIO_FROM_NUMBER, onSuccess = () => {}, onError = () => {} }) => {
  client.messages.create({
    to,
    from,
    body: body.slice(0, 1600),
  })
  .then((message) => onSuccess(message))
  .catch((err) => onError(err))
}

exports.sendSms = sendSms