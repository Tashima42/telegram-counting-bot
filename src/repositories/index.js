import sqlite3 from "sqlite3"
import {open} from "sqlite"
import path from "path"
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));


const databaseFile = process.env.SQLITE_NAME || "database.dev.db"
const databasePath = path.join(__dirname, `../../${databaseFile}`)

export class SqliteDatabase {
  db;

  async open() {
    this.db = await open({
      filename: databasePath,
      driver: sqlite3.Database,
    })
    this.db.on('trace', (data) => console.log(data))
  }

  async migrate() {
    await this.createTableCounter()
  }
  async populate() {
  }
  async dropAll() {
    await this.dropTableCounter()
  }

  async createTableCounter() {
    await this.db.exec(`CREATE TABLE IF NOT EXISTS counter(
      id 'INTEGER' PRIMARY KEY,
      user_id 'TEXT' NOT NULL UNIQUE,
      count 'INTEGER' NOT NULL,
      previous_count 'INTEGER' NOT NULL
    )`)
  }
  async dropTableCounter() {
    await this.db.run(`DROP TABLE counter;`)
  }
}

