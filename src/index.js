import {SqliteDatabase} from "./repositories/index.js";
import {CounterRepository} from "./repositories/CounterRepository.js"
import telegramBotBuilder from "./utils/telegram-bot.js"

main()

async function main() {
  const sqliteDatabase = new SqliteDatabase();
  await sqliteDatabase.open();
  const counterRepository = new CounterRepository(sqliteDatabase);
  const telegramBot = telegramBotBuilder({counterRepository});

  for (const command of Object.keys(telegramBot)) {
    telegramBot[command]();
  }
}
