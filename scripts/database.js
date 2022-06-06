import {SqliteDatabase} from "../src/repositories/index.js"

run()

async function run() {
  let args = process.argv
  args = args.slice(2)
  console.log(args)

  const sqliteDatabase = new SqliteDatabase()
  await sqliteDatabase.open()
  if (args.includes('--drop-all')) await sqliteDatabase.dropAll()
  if (args.includes('--migrate')) await sqliteDatabase.migrate()
  if (args.includes('--populate')) await sqliteDatabase.populate()
}

