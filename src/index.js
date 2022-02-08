require("dotenv").config()
const { telegramBot, yunExpress } = require("./utils/index")

telegramBot.fetchPackage()
telegramBot.help()
telegramBot.start()
