const TelegramBot = require("node-telegram-bot-api")

module.exports = function({ yunExpress }) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const bot = new TelegramBot(token, { polling: true })

  return Object.freeze({
    fetchPackage,
    help,
    start,
  })
  async function fetchPackage() {
    bot.onText(/\/fetch/, async (msg, match) => {
      const chatId = msg.chat.id
      bot.sendMessage(chatId, `Fetching package YT2203821266034482\nPlease wait...`)
      const packageLastStatus = await yunExpress.queryOrders(['YT2203821266034482'])
      bot.sendMessage(chatId, treatResult(packageLastStatus))
    })
  }
  function help() {
    bot.onText(/\/help/, (msg, match) => {
      console.log(msg)
      const chatId = msg.chat.id
      const name = msg.from.first_name
      bot.sendMessage(chatId, `Hi, ${name}.\nTry /fetch`)
    })
  }
  function start() {
    bot.onText(/\/start/, (msg, match) => {
      console.log(msg)
      const chatId = msg.chat.id
      const name = msg.from.first_name
      bot.sendMessage(chatId, `Hi, ${name}.\nTry /fetch`)
    })
  }
  function treatResult(result) {
    const lastEvent = result.ResultList[0].TrackInfo.LastTrackEvent
    const msg = `Status: ${lastEvent.ProcessContent}\nLocation: ${lastEvent.ProcessLocation}\nDate: ${lastEvent.ProcessDate}`
    return msg
  }
}
