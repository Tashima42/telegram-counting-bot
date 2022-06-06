import TelegramBot from "node-telegram-bot-api"

export default function ({counterRepository}) {
  const token = process.env.TELEGRAM_BOT_TOKEN
  const bot = new TelegramBot(token, {polling: true})

  return Object.freeze({
    help,
    start,
    getCount,
    increaseCount,
    decreaseCount
  })
  async function increaseCount() {
    bot.onText(/\/increase/, async (msg) => {
      const userId = msg.from.id
      const chatId = msg.chat.id
      const name = msg.from.first_name
      const count = await _getCountOrCreate(userId)
      const newCount = count + 1
      await counterRepository.changeCount({userId, value: newCount})
      bot.sendMessage(chatId, `${name}, your new count is ${newCount}`)
    })
  }
  async function decreaseCount() {
    bot.onText(/\/decrease/, async (msg) => {
      const userId = msg.from.id
      const chatId = msg.chat.id
      const name = msg.from.first_name
      const count = await _getCountOrCreate(userId)
      if (count <= 0) {
        bot.sendMessage(chatId, `${name}, your count is already ${count}, I can't decrease it anymore`)
        return
      }
      const newCount = count - 1
      await counterRepository.changeCount({userId, value: newCount})
      bot.sendMessage(chatId, `${name}, your new count is ${newCount}`)
    })
  }
  async function getCount() {
    bot.onText(/\/count/, async (msg) => {
      const userId = msg.from.id
      const chatId = msg.chat.id
      const name = msg.from.first_name
      const count = await _getCountOrCreate(userId)
      bot.sendMessage(chatId, `${name}'s current count: ${count}`)
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
      bot.sendMessage(chatId, `Hi, ${name}.\nTry /getCount, /increase or /decrease`)
    })
  }
  async function _getCountOrCreate(userId) {
    try {
      const count = await counterRepository.getByUserId(userId)
      console.log({count})
      if (count === null) {
        await counterRepository.createCounter(userId)
        return 0
      }
      return count
    } catch (error) {
      console.log(error)
    }
  }
}
