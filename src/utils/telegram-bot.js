const TelegramBot = require("node-telegram-bot-api")

module.exports = function({ yunExpress }) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const bot = new TelegramBot(token, { polling: true })

  return Object.freeze({
    blessing2,
    help,
    start,
  })
  async function blessing2() {
    await fetchPackage({ match: /\/blessing2/, order: "YT2203821266034482" })
  }
  async function fetchPackage({ match, order}) {
    bot.onText(match, async (msg) => {
      const chatId = msg.chat.id
      bot.sendMessage(chatId, `Fetching package ${order}\nPlease wait...`)
      const packageLastStatus = await yunExpress.queryOrder({ order })
      bot.sendMessage(chatId, packageLastStatus)
    })
  }
  function help() {
    _helpMessage(/\/help/)
  }
  function start() {
    _helpMessage(/\/start/)
  }
  function _helpMessage(match) {
    bot.onText(match, (msg) => {
      console.log(msg)
      const chatId = msg.chat.id
      const name = msg.from.first_name
      bot.sendMessage(chatId, `Hi, ${name}.\nTry /help or /blessing2`)
    })
  }
}
