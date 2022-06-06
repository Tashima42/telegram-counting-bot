export class CounterRepository {
  sqliteDatabase
  constructor(sqliteDatabase) {
    this.sqliteDatabase = sqliteDatabase
  }
  async changeCount({userId, value}) {
    const count = await this.getByUserId(userId)
    await this.sqliteDatabase.db.run(`UPDATE counter SET count = ?, previous_count = ? WHERE user_id = ?`,
      value,
      count,
      userId,
    )
  }
  async getByUserId(userId) {
    const found = await this.sqliteDatabase.db.get(`SELECT count FROM counter WHERE user_id = ?;`, userId)
    return found ? found.count : null
  }
  async createCounter(userId) {
    await this.sqliteDatabase.db.run(`INSERT INTO counter (user_id, count, previous_count) VALUES (?, ?, ?);`, userId, 0, 0)
  }
}
