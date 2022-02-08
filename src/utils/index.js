const buildYunExpress = require("./yun-express")
const buildTelegramBot = require("./telegram-bot")

const yunExpress = buildYunExpress()
const telegramBot = buildTelegramBot({ yunExpress })

module.exports = Object.freeze({
  yunExpress,
  telegramBot
})

